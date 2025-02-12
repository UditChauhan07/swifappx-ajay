import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

// Define the cancel reasons array
const cancelReasons = [
  "Customer not available",
  "Equipment malfunction",
  "Insufficient information",
  "Weather conditions",
  "Other",
];

// Define the modal component
const WorkOrderCancelModal = ({ show, onHide, onSubmit, workOrderId }) => {
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    onSubmit({ workOrderId, description });
    setDescription("");
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide} dialogClassName="custom-modal">
      <Modal.Header closeButton className="bg-danger text-white">
        <Modal.Title>Cancel Work Order</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {/* Reason for cancellation */}
          {/* <Form.Group className="mb-3">
            <Form.Label>Reason for Cancellation</Form.Label>
            <Form.Select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
            >
              <option value="">Select a reason</option>
              {cancelReasons.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </Form.Select>
          </Form.Group> */}

          {/* Description */}
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Please provide more details..."
              required
            />
          </Form.Group>

          {/* Submit and close buttons */}
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={onHide} className="me-2">
              Close
            </Button>
            <Button variant="danger" type="submit">
              Cancel Work Order
            </Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default WorkOrderCancelModal;
