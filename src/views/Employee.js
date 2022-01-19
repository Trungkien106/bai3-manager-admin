import NavbarMenu from "../components/layout/NavbarMenu";
import { useContext, useEffect } from "react";
import { EmployeeContext } from "../contexts/EmployeeContext";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { apiUrl } from "../contexts/constants";
import AddEmployeeModal from "../components/employees/AddEmployeeModal";
import UpdateEmployeeModal from "../components/employees/UpdateEmployeeModal";

function Employee() {
  //Context
  const {
    employeeState: { employeeEdit, employees },
    getEmployees,
    setShowAddEmployeeModal,
    deleteEmployee,
    findEmployee,
    setShowUpdateEmployeeModal,
  } = useContext(EmployeeContext);

  // Start: Get all employees
  useEffect(() => getEmployees(), []);

  // Click Choose Employee
  const chooseEmployee = (employeeID) => {
    findEmployee(employeeID);
    setShowUpdateEmployeeModal(true);
  };

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <h1 className="title">EMPLOYEE</h1>
      <div className="table-form">
        <Table bordered size="sm">
          <thead className="table-head">
            <tr>
              <th>Id</th>
              <th style={{ width: "150px" }}>Name Employee</th>
              <th style={{ width: "130px" }}>Photo</th>
              <th>Job Title</th>
              <th>Cell Phone</th>
              <th>Email</th>
              <th>Manager</th>
              <th style={{ width: "160px" }}>Options</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nameEmployee}</td>
                <td>
                  <img
                    className="avatar"
                    src={`${apiUrl}/employee/${item.photo}`}
                    alt={item.photo}
                    width="150"
                    height="150"
                  />
                </td>
                <td>{item.jobTitle}</td>
                <td>{item.cellPhone}</td>
                <td>{item.email}</td>
                <td>{item.manager.nameDepartment}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => chooseEmployee(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: "8px" }}
                    variant="danger"
                    onClick={() => deleteEmployee(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Open Add Employee Modal */}
      <Button
        variant="success"
        className="btn-add"
        onClick={() => setShowAddEmployeeModal(true)}
      >
        Add
      </Button>
      <AddEmployeeModal />
      {employeeEdit !== null && <UpdateEmployeeModal />}
    </>
  );
}

export default Employee;
