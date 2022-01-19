import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DepartmentContext } from "../../contexts/DepartmentContext";
import { useContext, useEffect, useState } from "react";

function UpdateDepartmentModal() {
  // Contexts
  const {
    departmentState: { departmentEdit },
    getDepartments,
    showUpdateDepartmentModal,
    setShowUpdateDepartmentModal,
    updateDepartment,
  } = useContext(DepartmentContext);

  // State
  const [updatedDepartment, setUpdatedDepartment] = useState(departmentEdit);

  useEffect(() => setUpdatedDepartment(departmentEdit), [departmentEdit]);

  const { nameDepartment, officePhone } = updatedDepartment;

  const onchangeUpdatedDepartmentForm = (event) =>
    setUpdatedDepartment({
      ...updatedDepartment,
      [event.target.name]: event.target.value,
    });

  const closeModal = () => {
    setUpdatedDepartment(departmentEdit);
    setShowUpdateDepartmentModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await updateDepartment(updatedDepartment);
    getDepartments();
    setShowUpdateDepartmentModal(false);
  };

  return (
    <Modal
      show={showUpdateDepartmentModal}
      onHide={closeModal}
      animation={false}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Name Department"
              name="nameDepartment"
              required
              value={nameDepartment}
              onChange={onchangeUpdatedDepartmentForm}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Text>Office Phone</Form.Text>
            <Form.Control
              maxLength={13}
              type="text"
              placeholder="Office Phone"
              name="officePhone"
              required
              value={officePhone}
              onChange={onchangeUpdatedDepartmentForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default UpdateDepartmentModal;
