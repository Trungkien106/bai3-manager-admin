import NavbarMenu from "../components/layout/NavbarMenu";
import { DepartmentContext } from "../contexts/DepartmentContext";
import { useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import AddDepartmentModal from "../components/departments/AddDepartmentModal";
import UpdateDepartmentModal from "../components/departments/UpdateDepartmentModal";

function Department() {
  // Contexts
  const {
    departmentState: { departmentEdit, departments },
    getDepartments,
    setShowAddDepartmentModal,
    deleteDepartment,
    findDepartment,
    setShowUpdateDepartmentModal,
  } = useContext(DepartmentContext);

  // Start: Get all departments
  useEffect(() => getDepartments(), []);

  // Click Choose Department
  const chooseDepartment = (departmentID) => {
    findDepartment(departmentID);
    setShowUpdateDepartmentModal(true);
  };

  return (
    <>
      <NavbarMenu></NavbarMenu>
      <h1 className="title">DEPARTMENT</h1>
      <div className="table-form">
        <Table bordered size="sm">
          <thead className="table-head">
            <tr>
              <th>Id</th>
              <th>Name Department</th>
              <th>Office Phone</th>
              <th>Options</th>
            </tr>
          </thead>
          <tbody>
            {departments.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.nameDepartment}</td>
                <td>{item.officePhone}</td>
                <td>
                  <Button
                    variant="success"
                    onClick={() => chooseDepartment(item.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    style={{ marginLeft: "8px" }}
                    variant="danger"
                    onClick={() => deleteDepartment(item.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Open Add Department Modal */}
      <Button
        variant="success"
        className="btn-add"
        onClick={() => setShowAddDepartmentModal(true)}
      >
        Add
      </Button>
      <AddDepartmentModal />
      {departmentEdit !== null && <UpdateDepartmentModal />}
    </>
  );
}

export default Department;
