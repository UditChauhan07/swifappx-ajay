import React from 'react';
import { Card, Row, Col, Badge, ListGroup } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
const WorkOrderDetails = ({ workOrder }) => {
  const { t } = useTranslation(); // Translation hook

  if (!workOrder) return null;
  return (
    <Card className="mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-4">
          <div>
            <h4 className="mb-1">{workOrder.customerDetailSection.CustomerName}</h4>
            <p className="text-muted mb-0">
              {t('orderDate')}: {new Date(workOrder.basicWorkorderDetails.startDate).toLocaleDateString()}
            </p>
          </div>
          <Badge className={`status-badge ${workOrder.status}`}>
            {t(workOrder.status)}
          </Badge>
        </div>

        <Row>
          <Col md={6}>
            <h6 className="mb-3">{t('customerInfo')}</h6>
            <p className="mb-2">
              <strong>{t('Email')}:</strong> {workOrder.customerDetailSection.CustomerEmail}
            </p>
            <p className="mb-2">
              <strong>{t('address')}:</strong> {workOrder.customerDetailSection.CustomerAddress}
            </p>
          </Col>
          <Col md={6}>
            <h6 className="mb-3">{t('workOrderDetails')}</h6>
            {/* <p className="mb-2">
              <strong>{t('assignedTo')}:</strong> {workOrder.assignedTo}
            </p> */}
            <p className="mb-2">
               <strong>{t('estimatedDuration')}: </strong> 
               {/* {
                              moment(workOrder.basicWorkorderDetails.expectedTime, "HH:mm").diff(
                                moment(workOrder.basicWorkorderDetails.startTime, "HH:mm"),
                                "minutes"
                              )
                            } minutes */
                            workOrder.basicWorkorderDetails.expectedTime
                            }
            </p>
            <p className="mb-2">
              <strong>{t('description')}:</strong> {workOrder.workorderDetails[0]?.workDescription}
            </p>
          </Col>
        </Row>

        {workOrder.workorderDetails && workOrder.workorderDetails.length > 0 && (
          <div className="mt-4">
            <h6 className="mb-3">{t('requiredWorkItems')}</h6>
            <ListGroup>
              {workOrder.workorderDetails.map((item, index) => (
                <ListGroup.Item key={index}>
                  <div className="d-flex justify-content-between">
                    <span><strong>{item.workItem}</strong></span>
                    {/* <span>${item.price}</span> */}
                  </div>
                  <small className="text-muted">{item.workDescription}</small>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default WorkOrderDetails;
