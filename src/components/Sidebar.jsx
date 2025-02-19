// import React from 'react';
// import { Nav } from 'react-bootstrap';

// const Sidebar = ({ activeFilter, setActiveFilter, dateFilter, setDateFilter }) => {
//   return (
//     <div className="sidebar">
//       <div className="sidebar-header">

//         <h3>Work Order's </h3>
//       </div>
//       <Nav className="flex-column">
//         <Nav.Link
//           className={activeFilter === 'all' ? 'active' : ''}
//           onClick={() => setActiveFilter('all')}
//         >
//           All Orders
//         </Nav.Link>
//         <Nav.Link
//           className={activeFilter === 'urgent' ? 'active' : ''}
//           onClick={() => setActiveFilter('urgent')}
//         >
//           Urgent Orders
//         </Nav.Link>
//         <Nav.Link
//           className={activeFilter === 'pending' ? 'active' : ''}
//           onClick={() => setActiveFilter('pending')}
//         >
//           Pending Orders
//         </Nav.Link>
//         <Nav.Link
//           className={activeFilter === 'completed' ? 'active' : ''}
//           onClick={() => setActiveFilter('completed')}
//         >
//           Completed Orders
//         </Nav.Link>

//         <div className="sidebar-header mt-4">
//           <h5>Time Filters</h5>
//         </div>
//         <Nav.Link
//           className={dateFilter === 'all' ? 'active' : ''}
//           onClick={() => setDateFilter('all')}
//         >
//           All Time
//         </Nav.Link>
//         <Nav.Link
//           className={dateFilter === 'weekly' ? 'active' : ''}
//           onClick={() => setDateFilter('weekly')}
//         >
//           This Week
//         </Nav.Link>
//         <Nav.Link
//           className={dateFilter === 'monthly' ? 'active' : ''}
//           onClick={() => setDateFilter('monthly')}
//         >
//           This Month
//         </Nav.Link>
//       </Nav>
//     </div>
//   );
// };

// export default Sidebar;
import React, { useState, useEffect, useRef } from "react";
import { Nav, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import {
  FaBars,
  FaTimes,
  FaClipboardList,
  FaExclamationCircle,
  FaClock,
  FaCheckCircle,
  FaSpinner,
} from "react-icons/fa";
import { CgSandClock } from "react-icons/cg";
import { MdCancel } from "react-icons/md";


const Sidebar = ({
  activeFilter,
  setActiveFilter,
  dateFilter,
  setDateFilter,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef(null); // Reference for sidebar

  const { t } = useTranslation(); // Translation hook
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <>
      <Button
        variant="dark"
        className="sidebar-toggle d-lg-none"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </Button>

      {/* <div className={`sidebar ${isOpen ? 'open' : ''}`}> */}
      <div ref={sidebarRef} className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h3>
            <FaClipboardList className="me-2" />
            {t("workOrders")}
          </h3>
        </div>

        <Nav className="flex-column">
          <Nav.Link
            className={activeFilter === "all" ? "active" : ""}
            onClick={() => {
              setActiveFilter("all");
              setIsOpen(false);
            }}
          >
            <FaClipboardList className="me-2" />
            {t("allOrders")}
          </Nav.Link>
          {/* <Nav.Link 
          className={activeFilter === 'urgent' ? 'active' : ''} 
          onClick={() => setActiveFilter('urgent')}
        >
          {t('urgentOrders')}
        </Nav.Link> */}
          <Nav.Link
            className={activeFilter === "In Progress" ? "active" : ""}
            onClick={() => {
              setActiveFilter("In Progress");
              setIsOpen(false);
            }}
          >
            <CgSandClock className="me-2" size={20}/>
            {t("inProgressOrders")}
          </Nav.Link>
          <Nav.Link
            className={activeFilter === "Pending" ? "active" : ""}
            onClick={() => {
              setActiveFilter("Pending");
              setIsOpen(false);
            }}
          >
            <FaClock className="me-2" />
            {t("pendingOrders")}
          </Nav.Link>
          <Nav.Link
            className={activeFilter === "Completed" ? "active" : ""}
            onClick={() => {
              setActiveFilter("Completed");
              setIsOpen(false);
            }}
          >
            {" "}
            <FaCheckCircle className="me-2" />
            {t("completedOrders")}
          </Nav.Link>

          <Nav.Link
          className={activeFilter === "Assignment Canceled" ? "active" : ""}
          onClick={() => {
            setActiveFilter("Assignment Canceled");
            setIsOpen(false);
          }}
        >
          <MdCancel  className="me-2" size={20}/> 
          {t("canceledOrders")}
        </Nav.Link>

          {/* <div className="sidebar-header mt-4">
          <h5>{t('timeFilters')}</h5>
        </div>
        <Nav.Link 
          className={dateFilter === 'all' ? 'active' : ''} 
          onClick={() => setDateFilter('all')}
        >
          {t('allTime')}
        </Nav.Link>
        <Nav.Link 
          className={dateFilter === 'weekly' ? 'active' : ''} 
          onClick={() => setDateFilter('weekly')}
        >
          {t('thisWeek')}
        </Nav.Link>
        <Nav.Link 
          className={dateFilter === 'monthly' ? 'active' : ''} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('thisMonth')}
        </Nav.Link> */}

          {/* 
      <Nav.Link 
          // className={} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('Create Workorder')}
      </Nav.Link>
      <Nav.Link 
          className={dateFilter === 'monthly' ? 'active' : ''} 
          onClick={() => setDateFilter('monthly')}
        >
          {t('Create customer')}
        </Nav.Link> */}
        </Nav>
      </div>
    </>
  );
};

export default Sidebar;
