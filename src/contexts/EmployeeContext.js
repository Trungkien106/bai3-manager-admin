import { createContext, useReducer, useState } from "react";
import employeeReducer from "../reducers/employeeReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";

export const EmployeeContext = createContext();

function EmployeeContextProvider({ children }) {
  // State
  const [employeeState, dispatch] = useReducer(employeeReducer, {
    employeeEdit: null,
    employees: [],
  });

  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showUpdateEmployeeModal, setShowUpdateEmployeeModal] = useState(false);

  // Get all employees
  const getEmployees = async () => {
    try {
      const response = await axios.get(`${apiUrl}/employee`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data) {
        dispatch({
          type: "EMPLOYEE_LOAD_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "EMPLOYEE_LOAD_FAIL",
      });
    }
  };

  // Add Employee
  const addEmployee = async (newEmployee) => {
    try {
      const response = await axios.post(`${apiUrl}/employee`, newEmployee, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data.dataSave) {
        dispatch({
          type: "ADD_EMPLOYEE",
          payload: response.data.dataSave,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Delete Employee
  const deleteEmployee = async (employeeID) => {
    if (window.confirm("Do you really want to delete ?")) {
      try {
        const response = await axios.delete(
          `${apiUrl}/employee/${employeeID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          dispatch({
            type: "DELETE_EMPLOYEE",
            payload: employeeID,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Find Employee Edit when click
  const findEmployee = (employeeID) => {
    const employeeEdit = employeeState.employees.find(
      (item) => item.id === employeeID
    );
    dispatch({
      type: "FIND_EMPLOYEE",
      payload: employeeEdit,
    });
  };

  // Update Employee
  const updateEmployee = async (updatedEmployee, updatedEmployeeId) => {
    console.log(updatedEmployee);
    try {
      const response = await axios.put(
        `${apiUrl}/employee/${updatedEmployeeId}`,
        updatedEmployee,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        dispatch({
          type: "UPDATE_EMPLOYEE",
          payload: response.data.dataChange,
        });
      }
      return response.data;
    } catch (error) {
      return error.response.data
        ? error.response.data
        : { success: false, message: "Server error" };
    }
  };

  // Employees Data
  const employeesData = {
    employeeState,
    getEmployees,
    showAddEmployeeModal,
    setShowAddEmployeeModal,
    addEmployee,
    deleteEmployee,
    findEmployee,
    updateEmployee,
    showUpdateEmployeeModal,
    setShowUpdateEmployeeModal,
  };

  return (
    <EmployeeContext.Provider value={employeesData}>
      {children}
    </EmployeeContext.Provider>
  );
}

export default EmployeeContextProvider;
