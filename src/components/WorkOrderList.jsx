import { useState } from "react";
import { Card, Badge, Collapse } from "react-bootstrap";
import WorkOrderDetails from "./WorkOrderDetails";
import CompletionForm from "./CompletionForm";
import moment from "moment";
import { useTranslation } from 'react-i18next';


const WorkOrderList = ({ workOrders,getWorkOrders }) => {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const { t } = useTranslation(); // Translation hook

  const toggleExpand = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const getStatusBadge = (status) => (
    <Badge className={`status-badge ${status}`}>
      {/* {t(status.charAt(0).toUpperCase() + status.slice(1))} */}
      {t(status)}
    </Badge>
  );
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
                    {new Date(order?.basicWorkorderDetails?.startDate).toLocaleDateString()}
                  </p>
                </div>
                {getStatusBadge(order.status)}
              </div>
              <p className="mb-2">{order?.workorderDetails[0]?.workDescription}</p>
              <div className="d-flex justify-content-between text-muted">
                {/* <small>Assigned to: {order.assignedTo}</small> */}
                {/* <small>{order.estimatedDuration}</small> */}
                {
                moment(order.basicWorkorderDetails.expectedTime, "HH:mm").diff(
                  moment(order.basicWorkorderDetails.startTime, "HH:mm"),
                  "minutes"
                )
              } minutes
              </div>
            </Card.Body>
          </Card>

          {/* Expandable Work Order Details (Displayed Below Clicked Item) */}
          <Collapse in={expandedOrderId === order.id}>
            <div className="p-3 border-start border-primary">
              <WorkOrderDetails workOrder={order} />
              <CompletionForm workOrder={order} getWorkOrders={getWorkOrders} onSubmit={() => setExpandedOrderId(null)} />
            </div>
          </Collapse>
        </div>
      ))}
    </div>
  );
};

export default WorkOrderList;
