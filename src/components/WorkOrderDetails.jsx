import React, { useState } from "react";
import { Card, Row, Col, Badge, ListGroup, Button } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import moment from "moment";
import WorkOrderCancelModal from "./modals/WorkOrderCancelModal";
import Swal from "sweetalert2";
import { startWorkOrder, updateWorkOrderStatus } from "../lib/store";
import { formatDate } from "../utils/formateDate";
const WorkOrderDetails = ({ workOrder, getWorkOrders,workInProgress,setWorkInProgress }) => {
  const [modalShow, setModalShow] = useState(false);
  const token = localStorage.getItem("UserToken");
  const { t } = useTranslation(); // Translation hook
  if (!workOrder) return null;

  //cancel work order
  const handleCancelWorkOrder = async ({
    workOrderId,
    reason,
    description,
  }) => {
    // Handle work order cancellation here (e.g., make API request)
    console.log("Work Order Cancelled:", { workOrderId, description });
    const payload = {
      status: "Assignment Canceled",
      customerEmail: workOrder?.customerDetailSection?.CustomerEmail,
      Reason: description,
      extraWorkDetails: [],
    };
    try {
      const result = await Swal.fire({
        title: t("confirmation"),
        text: t("confirmWorkOrderCancelation"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("yesCancel"),
        cancelButtonText: t("noGoBack"),
        position: "top",
      });

      if (!result.isConfirmed) {
        return;
      }

      // Show loading alert while API is executing
      Swal.fire({
        title: t("canceling"),
        text: t("workOrderCanceling"),
        allowOutsideClick: false,
        position: "top",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await updateWorkOrderStatus(workOrderId, payload, token);
      console.log(payload, response);
      Swal.close(); // Close loading only after API call

      if (response?.success) {
        await Swal.fire({
          title: t("success"),
          text: t("workOrderCancelledSuccess"),
          icon: "success",
          confirmButtonText: t("ok"),
          position: "top",
        });

        getWorkOrders();
      } else {
        await Swal.fire({
          title: t("error"),
          text: response?.message || t("genericCancelError"),
          icon: "error",
          confirmButtonText: t("tryAgain"),
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.close();

      await Swal.fire({
        title: t("apiError"),
        text: t("genericApiError"),
        icon: "error",
        confirmButtonText: t("ok"),
      });
    }

    setModalShow(false);
  };
//start work 
  const startWork = async () => {
    const payload = {
      startTime: await moment().format("DD MMM YYYY hh:mm A"),
    };
    try {
      const result = await Swal.fire({
        title: t("confirmation"),
        text: t("confirmWorkOrderStart"),
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: t("yesStart"),
        cancelButtonText: t("noGoBack"),
        position: "top",
      });

      if (!result.isConfirmed) {
        return;
      }

      // Show loading alert while API is executing
      Swal.fire({
        title: t("starting"),
        text: t("workOrderStarting"),
        allowOutsideClick: false,
        position: "top",
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const response = await startWorkOrder(workOrder.id, payload, token);
      console.log(payload, response);
      Swal.close(); // Close loading only after API call

      if (response?.success) {
        await Swal.fire({
          title: t("success"),
          text: t("workOrderStartedSuccess"),
          icon: "success",
          confirmButtonText: t("ok"),
          position: "top",
        });

        getWorkOrders();
      } else {
        await Swal.fire({
          title: t("error"),
          text: response?.message || t("genericStartError"),
          icon: "error",
          confirmButtonText: t("tryAgain"),
        });
      }
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.close();
      await Swal.fire({
        title: t("apiError"),
        text: t("genericApiError"),
        icon: "error",
        confirmButtonText: t("ok"),
      });
    }
  };


  const transalteText = (text) => {
    return t(`status.${text}`);
  };

  const getStatusBadge = (status) => {
    // Normalize status class name (lowercase + remove spaces)%
    const statusClass = `status-btn-${status
      .replace(/\s+/g, "")
      .toLowerCase()}`;
      if(status === 'Assignment Canceled'){
        return (
          <Badge className={'status-btn-cancelled'}>
        {t(`status.${status}`)}     
        </Badge>
        );
      }

    return <Badge className={statusClass}>{t(`status.${status}`)}</Badge>;
  };

  return (
    <>
      <Card className="mb-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-start mb-4">
            <div>
              <h4 className="mb-1">
                {workOrder?.customerDetailSection?.CustomerName}
              </h4>
              <p className="text-muted mb-0">
                {t("orderDate")}:{" "}
                {/* {new Date(
                  workOrder?.basicWorkorderDetails?.startDate
                ).toLocaleDateString()} */}
                {formatDate(workOrder?.basicWorkorderDetails?.startDate)}
              </p>
            </div>
            <div className="d-inline justify-content-between align-items-start mb-4">
            {workOrder?.status != "Pending" && (
              <div className="mb-2">
                {getStatusBadge(workOrder.status)}
              </div>
            )}
              <div className="mb-2">
                {workOrder?.status == "Pending" && (
                  <Badge className={`btn btn primary`} onClick={startWork}>
                    {transalteText('Start')}
                  </Badge>
                )}
              </div>
              {workOrder?.status == "Pending" && (
                <Badge
                  className={`status-btn-cancelled`}
                  onClick={() => setModalShow(true)}
                >
                 { transalteText('Cancel')}
                </Badge>
              )}
            </div>
          </div>

          <Row>
            <Col md={6}>
              <h6 className="mb-3">{t("customerInfo")}</h6>
              <p className="mb-2">
                <strong>{t("email")}:</strong>{" "}
                {workOrder?.customerDetailSection?.CustomerEmail}
              </p>
              <p className="mb-2">
                <strong>{t("address")}:</strong>{" "}
                {workOrder?.customerDetailSection?.CustomerAddress}
              </p>
            </Col>
            <Col md={6}>
              <h6 className="mb-3">{t("workOrderDetails")}</h6>
              {/* <p className="mb-2">
              <strong>{t('assignedTo')}:</strong> {workOrder.assignedTo}
            </p> */}
              <p className="mb-2">
                <strong>{t("estimatedDuration")}: </strong>
                {
                  /* {
                              moment(workOrder.basicWorkorderDetails.expectedTime, "HH:mm").diff(
                                moment(workOrder.basicWorkorderDetails.startTime, "HH:mm"),
                                "minutes"
                              )
                            } minutes */
                  workOrder?.basicWorkorderDetails?.expectedTime
                }
              </p>
              <p className="mb-2">
                <strong>{t("description")}:</strong>{" "}
                {workOrder?.workorderDetails[0]?.workDescription}
              </p>
            </Col>
          </Row>

          {workOrder?.workorderDetails &&
            workOrder?.workorderDetails?.length > 0 && (
              <div className="mt-4">
                <h6 className="mb-3">{t("requiredWorkItems")}</h6>
                <ListGroup>
                  {workOrder?.workorderDetails?.map((item, index) => (
                    <ListGroup.Item key={index}>
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong>{item.workItem}</strong>
                        </span>
                        {/* <span>${item.price}</span> */}
                      </div>
                      <small className="text-muted">
                        {item.workDescription}
                      </small>
                    </ListGroup.Item>
                  ))}
                </ListGroup>
              </div>
            )}
        </Card.Body>
      </Card>
      <WorkOrderCancelModal
        show={modalShow}
        onHide={() => setModalShow(false)} // Hide modal when close button or cancel button is clicked
        onSubmit={handleCancelWorkOrder} // Handle the submit for cancellation
        workOrderId={workOrder.id} // Pass workOrderId to the modal
      />
    </>
  );
};

export default WorkOrderDetails;
