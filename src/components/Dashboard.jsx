// import { useEffect, useState } from 'react';
// import { Container, Row, Col } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useTranslation } from 'react-i18next';
// import WorkOrderList from './WorkOrderList';
// import WorkOrderDetails from './WorkOrderDetails';
// import CompletionForm from './CompletionForm';
// import WorkOrderSummary from './WorkOrderSummary';
// import Sidebar from './Sidebar';
// import FilterBar from './FilterBar';
// import { useNavigate } from 'react-router-dom';

// const Dashboard = ({ workOrders, setIsLoggedIn }) => {
//   const [selectedWorkOrder, setSelectedWorkOrder] = useState(null);
//   const [completedOrder, setCompletedOrder] = useState(null);
//   const [activeFilter, setActiveFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState('all');
//   const [language, setLanguage] = useState('en');

//   const { t, i18n } = useTranslation();
//   const navigate = useNavigate();

//   useEffect(() => {
//     i18n.changeLanguage(language);
//   }, [language]);

//   const handleWorkOrderComplete = (completedWorkOrder) => {
//     setCompletedOrder(completedWorkOrder);
//   };

//   const handleLogout = () => {
//     setIsLoggedIn(false);
//     navigate('/'); // Redirect to login
//   };

//   const changeLanguage = (lang) => {
//     setLanguage(lang);
//   };

//   const filteredWorkOrders = workOrders.filter((order) => {
//     if (activeFilter !== 'all' && order.status !== activeFilter) return false;

//     if (dateFilter === 'weekly') {
//       const orderDate = new Date(order.date);
//       const weekAgo = new Date();
//       weekAgo.setDate(weekAgo.getDate() - 7);
//       return orderDate >= weekAgo;
//     }

//     if (dateFilter === 'monthly') {
//       const orderDate = new Date(order.date);
//       const monthAgo = new Date();
//       monthAgo.setMonth(monthAgo.getMonth() - 1);
//       return orderDate >= monthAgo;
//     }

//     return true;
//   });

//   return (
//     <div className="d-flex">
//       <Sidebar
//         activeFilter={activeFilter}
//         setActiveFilter={setActiveFilter}
//         dateFilter={dateFilter}
//         setDateFilter={setDateFilter}
//       />

//       <div className="main-content flex-grow-1">
//         <Container fluid className="py-4">
//           <Row className="mb-4">
//             <Col className="d-flex justify-content-between align-items-center">
//               <h1 className="mb-3">{t('workOrders')}</h1>

//               <div className="d-flex align-items-center gap-3">
//                 <select
//                   onChange={(e) => changeLanguage(e.target.value)}
//                   className="form-select"
//                   aria-label={t('selectLanguage')}
//                 >
//                   <option value="en">English</option>
//                   <option value="es">Español</option>
//                 </select>

//                 <button className="btn btn-danger" onClick={handleLogout}>
//                   {t('logout')}
//                 </button>
//               </div>
//             </Col>
//           </Row>

//           <Row>
//             <FilterBar
//               activeFilter={activeFilter}
//               setActiveFilter={setActiveFilter}
//               dateFilter={dateFilter}
//               setDateFilter={setDateFilter}
//             />
//           </Row>

//           <Row>
//             <Col xs={12} lg={4}>
//               <WorkOrderList
//                 workOrders={filteredWorkOrders}
//                 onSelectWorkOrder={setSelectedWorkOrder}
//                 selectedWorkOrder={selectedWorkOrder}
//               />
//             </Col>
//             <Col xs={12} lg={8}>
//               {selectedWorkOrder && !completedOrder && (
//                 <div className="mt-3 mt-lg-0">
//                   <WorkOrderDetails workOrder={selectedWorkOrder} />
//                   <CompletionForm
//                     workOrder={selectedWorkOrder}
//                     onSubmit={handleWorkOrderComplete}
//                   />
//                 </div>
//               )}
//               {completedOrder && <WorkOrderSummary completedOrder={completedOrder} />}
//             </Col>
//           </Row>
//         </Container>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import WorkOrderList from "./WorkOrderList";
import Sidebar from "./Sidebar";
import FilterBar from "./FilterBar";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { getWorkerOrderList } from "../lib/store";

const Dashboard = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("today");
  const [language, setLanguage] = useState("en");
  const [workInProgress, setWorkInProgress] = useState(false);
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const [workOrders, setWorkOrders] = useState([]);
  const token = localStorage.getItem("UserToken");
  const userId = localStorage.getItem("userId");
  // console.log('sss',token)

  const getWorkOrders = () => {
    console.log("workorder hit");
    const response = getWorkerOrderList(userId, token).then((response) => {
      console.log("response", response.data);
      const sortedWorkOrders = response.data.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      setWorkOrders(sortedWorkOrders);
    });
  };

  useEffect(() => {
    // console.log('token', token);
    getWorkOrders();
  }, [token]);

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  //   if (workOrders?.length <= 0) {
  //     Swal.fire({
  //         icon: "warning",
  //         title: t("no_work_order_assigned"), // Translatable key
  //         text: t("no_work_order_message"),
  //     });
  // }
  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  const changeLanguage = (lang) => {
    setLanguage(lang);
  };

  // Filter Work Orders
  const filteredWorkOrders = workOrders?.filter((order) => {
    if (activeFilter !== "all" && order.status !== activeFilter) return false;
    const orderDate = new Date(order.basicWorkorderDetails.startDate);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (dateFilter === "today") {
      return orderDate.toDateString() === today.toDateString();
    }
    if (dateFilter === "weekly") {
      const orderDate = new Date(order.basicWorkorderDetails.startDate);
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      return orderDate >= weekAgo;
    }

    if (dateFilter === "monthly") {
      const orderDate = new Date(order.basicWorkorderDetails.startDate);
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      return orderDate >= monthAgo;
    }

    return true;
  });
  const translatedActiveFilter = t(`filters.${activeFilter}`);
  const translatedDateFilter = t(`filters.${dateFilter}`);
  return (
    <div className="d-flex">
      {/* Sidebar for Filters */}
      <Sidebar
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        dateFilter={dateFilter}
        setDateFilter={setDateFilter}
      />

      {/* Main Content */}
      <div className="main-content flex-grow-1">
        <Container fluid className="py-2">
          <Row className="mb-4">
            <Col className="d-flex justify-content-between align-items-center">
              {/* <h1 className="mb-3">{t("workOrders")}</h1> */}
              <h6></h6>

              <div className="d-flex align-items-center gap-3">
                <select
                  onChange={(e) => changeLanguage(e.target.value)}
                  className="form-select"
                  aria-label={t("selectLanguage")}
                >
                  <option value="en">English</option>
                  <option value="es">Spanish</option>
                  {/* <option value="es">Español</option> */}
                </select>

                <button className="btn btn-danger" onClick={handleLogout}>
                  {t("logout")}
                </button>
              </div>
            </Col>
          </Row>

          {/* Filters */}
          <Row>
            <FilterBar
              activeFilter={activeFilter}
              setActiveFilter={setActiveFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </Row>

          {/* Work Orders & Details (All in One Column) */}
          <Row>
            <Col xs={12}>
              {/* <h5 className="text-capitalize">{`${activeFilter} Work Orders`}</h5> */}
              <h5 className="text-capitalize">
                {t(`workOrderss.${activeFilter}`, {
                  defaultValue: `${activeFilter} Work Orders`,
                })}
              </h5>

              {filteredWorkOrders?.length == 0 && (
                // <div className="text-danger">{`No ${activeFilter} Work order ${dateFilter}`}</div>
                <div className="text-danger">
                  {t("no_work_order", {
                    activeFilter: translatedActiveFilter,
                    dateFilter: translatedDateFilter,
                  })}
                </div>
              )}
              <WorkOrderList
                workOrders={filteredWorkOrders}
                getWorkOrders={getWorkOrders}
                workInProgress={workInProgress}
                setWorkInProgress={setWorkInProgress}
              />
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Dashboard;
