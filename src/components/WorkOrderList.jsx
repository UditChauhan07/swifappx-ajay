import { useState } from "react";
import { Card, Badge, Collapse, Button } from "react-bootstrap";
import WorkOrderDetails from "./WorkOrderDetails";
import CompletionForm from "./CompletionForm";
import moment from "moment";
import { useTranslation } from 'react-i18next';
import { convertToAMPM, formatDate } from "../utils/formateDate";


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
  
  const getExpctedtime = (time) => {
      return (
        `${time} ${t('Hours')}`
      )
  } 


  // console.log(workOrders);

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
                    {formatDate(order?.basicWorkorderDetails?.startDate)} {convertToAMPM(order?.basicWorkorderDetails?.startTime)}
                  </p>
                </div>
             
                {getStatusBadge(order.status)}
              </div>
              {/* description  */}
              {/* <p className="mb-2">{order?.workorderDetails[0]?.workDescription}</p> */}
              <p className="mb-2">
                {(() => {
                  const text = order?.workorderDetails[0]?.workDescription || "";
                  const words = text.split(" ");
                  return words.length > 50 
                    ? words.slice(0, 50).join(" ") + "..."
                    : text;
                })()}
              </p>

              <div className="d-flex justify-content-between text-muted">
              {/* expected time */}
                {getExpctedtime(order?.basicWorkorderDetails?.expectedTime)}  
              </div>
            </Card.Body>
          </Card>

          {/* Expandable Work Order Details (Displayed Below Clicked Item) */}
          <Collapse in={expandedOrderId === order.id}>
            <div className="p-3 border-start border-primary">
              <WorkOrderDetails workOrder={order} getWorkOrders={getWorkOrders} setExpandedOrderId={setExpandedOrderId}/>
              <CompletionForm workOrder={order} getWorkOrders={getWorkOrders} onSubmit={() => setExpandedOrderId(null)} />
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderList;
