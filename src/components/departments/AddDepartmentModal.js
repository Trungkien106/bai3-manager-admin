import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { DepartmentContext } from "../../contexts/DepartmentContext";
import { useContext, useState } from "react";

function AddDepartmentModal() {
  // Contexts
  const {
    getDepartments,
    showAddDepartmentModal,
    setShowAddDepartmentModal,
    addDepartment,
  } = useContext(DepartmentContext);

  // State
  const [newDepartment, setNewDepartment] = useState({
    nameDepartment: "",
    officePhone: "+84",
  });

  const { nameDepartment, officePhone } = newDepartment;

  const onchangeNewDepartmentForm = (event) =>
    setNewDepartment({
      ...newDepartment,
      [event.target.name]: event.target.value,
    });

  const closeModal = () => {
    resetDepartmentsData();
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    await addDepartment(newDepartment);
    getDepartments();
    resetDepartmentsData();
  };

  // Reset Department
  const resetDepartmentsData = () => {
    setNewDepartment({
      nameDepartment: "",
      officePhone: "+84",
    });
    setShowAddDepartmentModal(false);
  };

  return (
    <Modal show={showAddDepartmentModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Department</Modal.Title>
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
              onChange={onchangeNewDepartmentForm}
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
              onChange={onchangeNewDepartmentForm}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={closeModal}>
            Cancel
          </Button>
          <Button variant="success" type="submit">
            Add
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddDepartmentModal;
