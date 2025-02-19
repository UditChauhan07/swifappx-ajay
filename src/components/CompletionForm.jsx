import React, { useState } from "react";
import { Form, Button, Row, Col, ListGroup } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { updateWorkOrderStatus } from "../lib/store";
import moment from "moment";
const CompletionForm = ({ workOrder, getWorkOrders, onSubmit }) => {
  const { t } = useTranslation(); // Translation hook
  const token = localStorage.getItem("UserToken");

  const [workItems, setWorkItems] = useState(workOrder.workorderDetails || []);
  const [newWorkItems, setNewWorkItems] = useState([]);
  const [newItem, setNewItem] = useState({
    workItem: "",
    workDescription: "",
  });
// console.log('newItem', newItem)
  const handleAddItem = () => {
    if (newItem.workItem && newItem.workDescription) {
      setWorkItems([...workItems, { ...newItem }]);
      setNewWorkItems([...newWorkItems, { ...newItem }]);
      resetForm();
      
    }
  };
// console.log('newItem', newItem)
  const handleRemoveItem = (index) => {
    // const updatedItems = workItems.filter((_, i) => i !== index);
    const updatedItems = newWorkItems.filter((_, i) => i !== index);
    setNewWorkItems(updatedItems);
    // setWorkItems(updatedItems);
  };

  const handleItemChange = (field, value) => {
    // console.log(field, value);
    setNewItem({ ...newItem, [field]: value });
  };

  const resetForm = () => {
    setNewItem({
      workItem: "", 
      workDescription: "",
    });
    document.getElementById("workItemInput").value = "";
    document.getElementById("workDescriptionInput").value = "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await Swal.fire({
        title: t("Confirmation"),
        text: t("Confirm work order completion?"),
        icon: t("warning"),
        showCancelButton: true,
        confirmButtonText: t("Yes, completed it!"),
        cancelButtonText: t("No, cancel"),
      });

      if (!result.isConfirmed) {
        return;
      }

      // Show loading alert while API is executing
      Swal.fire({
        title: t("updating"),
        text: t("updatingWorkOrderStatus"),
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });

      const payload = {
        status: "Completed",
        punchOut:await moment().format("DD MMM YYYY hh:mm A"),
        customerEmail: workOrder?.customerDetailSection?.CustomerEmail,
      };
      if (newWorkItems.length > 0) {
        payload.extraWorkDetails = newWorkItems;
      } else {
        payload.extraWorkDetails = [];
      }
      //
      // ✅ Send as JSON (No FormData needed)
      const response = await updateWorkOrderStatus(
        workOrder.id,
        payload,
        token
      );
      // console.log("response", response,payload);
      Swal.close();
      if (response.success) {
        Swal.fire({
          title: t("success"),
          text: t("workOrderCompletedSuccessfully"),
          icon: "success",
          confirmButtonText: t("ok"),
        }).then(() => {
          getWorkOrders();
          onSubmit({ ...workOrder, workItems });
        });
      } else {
        Swal.fire({
          title: "Error!",
          text:
            response.message ||
            "There was an error while completing workorder.",
          icon: "error",
          confirmButtonText: "Try Again",
        });
      }
      // console.log("Response:", response);
    } catch (error) {
      console.error("Error submitting data:", error);
      Swal.close();
      Swal.fire({
        title: "API Error!",
        text: "Something went wrong. Please try again later.",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
    // onSubmit({ ...workOrder, workItems });
  };
  // console.log('workOrder:', workOrder)

  return (
    <Form className="mt-3" >
      

{/* New Items Work Items List */}
     {workOrder?.status == "In Progress" &&
        <ListGroup className="mb-3">
        <h5>{t("workItems")}</h5>
          {newWorkItems?.length > 0 && 
          <>
           { newWorkItems.map((item, index) => (
              <ListGroup.Item
                key={index}
                className="d-flex justify-content-between align-items-center"
              >
                <div>
                  <strong>{item.workItem}</strong> 
                  <br />
                  <small className="text-muted">{item?.workDescription}</small>
                </div>
  
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemoveItem(index)}
                >
                  {t("remove")}
                </Button>
              </ListGroup.Item>
            ))}
            </>
          }
        </ListGroup>
     } 

{/* Extra works */}
      {workOrder?.status == "Completed" &&
        workOrder?.extraWorkDetails?.length>0 &&
        <>
        <h5>{t("workItems")}</h5>
        {
        workOrder?.extraWorkDetails.length > 0 && (
          <table className="table">
            <tbody>
              <tr>
                <th>
                  <strong>{t("itemName")}</strong>
                </th>
                <th>
                  <strong>{t("description")}</strong>
                </th>
              </tr>

              {workOrder?.extraWorkDetails?.map((item, index) => (
                <tr key={index}>
                  <td>{item.workItem}</td>
                  <td className="text-start text-muted">
                    <small>{item.workDescription}</small>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        </>
      }
{/* add new items */}
      {workOrder?.status == "In Progress"   && (
        <>
          <Row className="mb-3">
            {/* <Col xs={12} md={4}>
              <Form.Control
                type="text"
                placeholder={t("itemName")}
                id="workItemInput"
                value={newItem.work}
                onChange={(e) => handleItemChange("workItem", e.target.value)}
              />
            </Col> */}
              <Col xs={12} md={4}>
              <Form.Group controlId="workItemInput">
                <Form.Label>{t("itemName")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("itemName")}
                  value={newItem.work}
                  onChange={(e) => handleItemChange("workItem", e.target.value)}
                />
              </Form.Group>
            </Col>
            {/* <Col xs={12} md={3}>
          <Form.Control
            type="number"
            placeholder={t('price')}
            value={newItem.price}
            onChange={(e) => handleItemChange('price', e.target.value)}
          />
        </Col> */}


            {/* <Col xs={12} md={5}>
              <Form.Control
                type="text"
                placeholder={t("description")}
                id="workDescriptionInput"
                // value={newItem.description}
                onChange={(e) =>{handleItemChange("workDescription", e.target.value);}
                  
                }
              />
            </Col> */}

        <Col xs={12} md={5}>
            <Form.Group controlId="workDescriptionInput">
              <Form.Label>{t("description")}</Form.Label>
              <Form.Control
                type="text"
                placeholder={t("description")}
                onChange={(e) => handleItemChange("workDescription", e.target.value)}
              />
            </Form.Group>
          </Col>
          </Row>

          {workOrder.status !== "Completed" && (
            <>
              <div className="mb-3">
                <Button variant="secondary" onClick={handleAddItem}>
                  {t("addItem")}
                </Button>
              </div>

              <div>
                <Button type="submit" variant="primary" onClick={handleSubmit}>
                  {t("markAsCompleted")}
                </Button>
              </div>
            </>
          )}
        </>
      )}

{workOrder?.status === "Assignment Canceled" && workOrder?.work_order_cancel_Reason && (
  <div className="alert alert-danger d-flex align-items-center p-3 rounded shadow-sm mt-4" role="alert">
    <i className="bi bi-exclamation-triangle-fill me-2" style={{ fontSize: "1.5rem" }}></i>
    <div>
      <h5 className="fw-bold mb-1">{t("canceledAssignmentTitle")}</h5>
      <p className="mb-0">{workOrder.work_order_cancel_Reason}</p>
    </div>
  </div>
)}


    </Form>
  );
};

export default CompletionForm;
// 