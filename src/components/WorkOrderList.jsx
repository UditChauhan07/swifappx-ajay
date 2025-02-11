import { useState } from "react";
import { Card, Badge, Collapse, Button } from "react-bootstrap";
import WorkOrderDetails from "./WorkOrderDetails";
import CompletionForm from "./CompletionForm";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import { formatDate } from "../utils/formateDate";


const WorkOrderList = ({ workOrders,getWorkOrders, workInProgress,setWorkInProgress}) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { t } = useTranslation(); // Translation hook

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // const getStatusBadge = (status) => (
  //   <Badge className={`status-btn-${status}`}>
  //     {t(status)}
  //     </Badge>
  // );
  const getStatusBadge = (status) => {   

    // Normalize status class name (lowercase + remove spaces)%
    const statusClass = `status-btn-${status.replace(/\s+/g, '').toLowerCase()}`;
  if(status === 'Assignment Canceled'){
    return (
      <Badge className={'status-btn-cancelled'}>
    {t(`status.${status}`)}     
    </Badge>
    );
  }
    return (
      <Badge className={statusClass}>
    {t(`status.${status}`)}     
    </Badge>
    );
  };
  
  console.log(workOrders);

  return (
    <div className="work-order-list">
      {workOrders?.map((order) => (
        <div key={order.id}>
          {/* Work Order Card */}
          <Card
            className={`mb-3 work-order-card ${order.status} ${
              expandedOrderId === order.id ? "border-primary" : ""
            }`}
            onClick={() => toggleExpand(order.id)}
            style={{ cursor: "pointer" }}
          >
            <Card.Body>
              <div className="d-flex justify-content-between align-items-start">
                <div>
                  <h5 className="mb-1">{order.customerName}</h5>
                  <p className="text-muted mb-2">
                    {/* {new Date(order?.basicWorkorderDetails?.startDate).toLocaleDateString()} */}
                    {formatDate(order?.basicWorkorderDetails?.startDate)}
                  </p>
                </div>
             
                {getStatusBadge(order.status)}
              </div>
              <p className="mb-2">{order?.workorderDetails[0]?.workDescription}</p>
              <div className="d-flex justify-content-between text-muted">
                {/* <small>Assigned to: {order.assignedTo}</small> */}
                {/* <small>{order.estimatedDuration}</small> */}
                {
                  `${order.basicWorkorderDetails.expectedTime} `
                // moment(order.basicWorkorderDetails.expectedTime, "HH:mm").diff(
                //   moment(order.basicWorkorderDetails.startTime, "HH:mm"),
                //   "minutes"
                // )
              } 
              </div>
            </Card.Body>
          </Card>

          {/* Expandable Work Order Details (Displayed Below Clicked Item) */}
          <Collapse in={expandedOrderId === order.id}>
            <div className="p-3 border-start border-primary">
              <WorkOrderDetails workOrder={order} getWorkOrders={getWorkOrders}
               workInProgress={workInProgress} setWorkInProgress={setWorkInProgress}/>

              <CompletionForm workOrder={order} getWorkOrders={getWorkOrders} onSubmit={() => setExpandedOrderId(null)} />
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderList;
