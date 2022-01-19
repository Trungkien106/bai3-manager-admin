import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

function AddEmployeeModal() {
  // Context
  const {
    getEmployees,
    showAddEmployeeModal,
    setShowAddEmployeeModal,
    addEmployee,
  } = useContext(EmployeeContext);

  //State
  const [newEmployee, setNewEmployee] = useState({
    nameEmployee: "",
    photo: "",
    jobTitle: "",
    cellPhone: "+84",
    email: "",
    managerId: "",
  });

  const { nameEmployee, photo, jobTitle, cellPhone, email, managerId } =
    newEmployee;

  const onchangeNewEmployeeForm = (event) => {
    setNewEmployee({
      ...newEmployee,
      [event.target.name]: event.target.value,
    });
  };

  const onchangeNewEmployeePhoto = (event) => {
    setNewEmployee({
      ...newEmployee,
      photo: event.target.files[0],
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nameEmployee", nameEmployee);
    formData.append("photo", photo);
    formData.append("jobTitle", jobTitle);
    formData.append("cellPhone", cellPhone);
    formData.append("email", email);
    formData.append("managerId", managerId);

    await addEmployee(formData);
    getEmployees();
    resetEmployeesData();
  };

  const closeModal = () => {
    resetEmployeesData();
  };

  //Reset Employee
  const resetEmployeesData = () => {
    setNewEmployee({
      nameEmployee: "",
      photo: "",
      jobTitle: "",
      cellPhone: "+84",
      email: "",
      managerId: "",
    });
    setShowAddEmployeeModal(false);
  };

  return (
    <Modal show={showAddEmployeeModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Name Employee"
              name="nameEmployee"
              required
              value={nameEmployee}
              onChange={onchangeNewEmployeeForm}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Text>Photo</Form.Text>
            <Form.Control
              type="file"
              required
              onChange={onchangeNewEmployeePhoto}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              required
              value={jobTitle}
              onChange={onchangeNewEmployeeForm}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Text>Cell Phone</Form.Text>
            <Form.Control
              maxLength={13}
              type="text"
              placeholder="Cell Phone"
              name="cellPhone"
              required
              value={cellPhone}
              onChange={onchangeNewEmployeeForm}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={onchangeNewEmployeeForm}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="ID Department Manager"
              name="managerId"
              required
              value={managerId}
              onChange={onchangeNewEmployeeForm}
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

export default AddEmployeeModal;
