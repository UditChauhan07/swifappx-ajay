import React from 'react';
import { Card, ListGroup } from 'react-bootstrap';

const WorkOrderSummary = ({ completedOrder }) => {
  if (!completedOrder) return null;

  const total = completedOrder.workItems.reduce(
    (sum, item) => sum + Number(item.price),
    0
  );

  return (
    <Card>
      <Card.Body>
        <Card.Title>Work Order Summary</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          {new Date(completedOrder.date).toLocaleDateString()}
        </Card.Subtitle>
        
        <h6>Customer Information</h6>
        <p>
          {completedOrder.customerName}<br />
          {completedOrder.customerContact}<br />
          {completedOrder.address}
        </p>

        <h6>Work Items</h6>
        <ListGroup variant="flush">
          {completedOrder.workItems.map((item, index) => (
            <ListGroup.Item key={index}>
              <div className="d-flex justify-content-between">
                <span>{item.name}</span>
                <span>${item.price}</span>
              </div>
              <small className="text-muted">{item.description}</small>
            </ListGroup.Item>
          ))}
        </ListGroup>
        
        <div className="mt-3 text-end">
          <strong>Total: ${total.toFixed(2)}</strong>
        </div>
      </Card.Body>
    </Card>
  );
};

export default WorkOrderSummary;