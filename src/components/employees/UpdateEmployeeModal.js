import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useContext, useState, useEffect } from "react";
import { EmployeeContext } from "../../contexts/EmployeeContext";

function UpdateEmployeeModal() {
  // Context
  const {
    employeeState: { employeeEdit },
    getEmployees,
    showUpdateEmployeeModal,
    setShowUpdateEmployeeModal,
    updateEmployee,
  } = useContext(EmployeeContext);

  // State
  const [nameEmployee, setNameEmployee] = useState(employeeEdit.nameEmployee);
  const [photo, setPhoto] = useState(employeeEdit.photo);
  const [jobTitle, setJobTitle] = useState(employeeEdit.jobTitle);
  const [cellPhone, setCellPhone] = useState(employeeEdit.cellPhone);
  const [email, setEmail] = useState(employeeEdit.email);
  const [managerId, setManagerId] = useState(employeeEdit.manager.id);

  useEffect(() => setNameEmployee(employeeEdit.nameEmployee), [employeeEdit]);
  useEffect(() => setPhoto(employeeEdit.photo), [employeeEdit]);
  useEffect(() => setJobTitle(employeeEdit.jobTitle), [employeeEdit]);
  useEffect(() => setCellPhone(employeeEdit.cellPhone), [employeeEdit]);
  useEffect(() => setEmail(employeeEdit.email), [employeeEdit]);
  useEffect(() => setManagerId(employeeEdit.manager.id), [employeeEdit]);

  const onSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("nameEmployee", nameEmployee);
    formData.append("photo", photo);
    formData.append("jobTitle", jobTitle);
    formData.append("cellPhone", cellPhone);
    formData.append("email", email);
    formData.append("managerId", managerId);

    await updateEmployee(formData, employeeEdit.id);
    getEmployees();
    setShowUpdateEmployeeModal(false);
  };

  const closeModal = () => {
    setNameEmployee(employeeEdit.nameEmployee);
    setPhoto(employeeEdit.photo);
    setJobTitle(employeeEdit.jobTitle);
    setCellPhone(employeeEdit.cellPhone);
    setEmail(employeeEdit.email);
    setManagerId(employeeEdit.manager.id);
    setShowUpdateEmployeeModal(false);
  };

  return (
    <Modal show={showUpdateEmployeeModal} onHide={closeModal} animation={false}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
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
              onChange={(event) => setNameEmployee(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Text>Photo</Form.Text>
            <Form.Control
              type="file"
              required
              onChange={(event) => setPhoto(event.target.files[0])}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Job Title"
              name="jobTitle"
              required
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
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
              onChange={(event) => setCellPhone(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="Email"
              name="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="form-group">
            <Form.Control
              type="text"
              placeholder="ID Department Manager"
              name="managerId"
              required
              value={managerId}
              onChange={(event) => setManagerId(event.target.value)}
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

export default UpdateEmployeeModal;
