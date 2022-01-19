import { createContext, useReducer, useState } from "react";
import departmentReducer from "../reducers/departmentReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";

export const DepartmentContext = createContext();

function DepartmentContextProvider({ children }) {
  // State
  const [departmentState, dispatch] = useReducer(departmentReducer, {
    departmentEdit: null,
    departments: [],
  });

  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);
  const [showUpdateDepartmentModal, setShowUpdateDepartmentModal] =
    useState(false);

  // Get all departments
  const getDepartments = async () => {
    try {
      const response = await axios.get(`${apiUrl}/department`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data) {
        dispatch({
          type: "DEPARTMENT_LOAD_SUCCESS",
          payload: response.data,
        });
      }
    } catch (error) {
      dispatch({
        type: "DEPARTMENT_LOAD_FAIL",
      });
    }
  };

  // Add Department
  const addDepartment = async (newDepartment) => {
    try {
      const response = await axios.post(`${apiUrl}/department`, newDepartment, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
        },
      });
      if (response.data.dataSave) {
        dispatch({
          type: "ADD_DEPARTMENT",
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

  // Delete Department
  const deleteDepartment = async (departmentID) => {
    if (window.confirm("Do you really want to delete ?")) {
      try {
        const response = await axios.delete(
          `${apiUrl}/department/${departmentID}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
            },
          }
        );
        if (response.data.statusCode === 200) {
          dispatch({
            type: "DELETE_DEPARTMENT",
            payload: departmentID,
          });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  // Find Department Edit when click
  const findDepartment = (departmentID) => {
    const departmentEdit = departmentState.departments.find(
      (item) => item.id === departmentID
    );
    dispatch({
      type: "FIND_DEPARTMENT",
      payload: departmentEdit,
    });
  };

  // Update Department
  const updateDepartment = async (updatedDepartment) => {
    try {
      const response = await axios.put(
        `${apiUrl}/department/${updatedDepartment.id}`,
        updatedDepartment,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage[LOCAL_STORAGE_TOKEN_NAME]}`,
          },
        }
      );
      if (response.data.statusCode === 200) {
        dispatch({
          type: "UPDATE_DEPARTMENT",
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

  // Departments Data
  const departmentData = {
    departmentState,
    getDepartments,
    showAddDepartmentModal,
    setShowAddDepartmentModal,
    addDepartment,
    deleteDepartment,
    findDepartment,
    updateDepartment,
    showUpdateDepartmentModal,
    setShowUpdateDepartmentModal,
  };

  return (
    <DepartmentContext.Provider value={departmentData}>
      {children}
    </DepartmentContext.Provider>
  );
}

export default DepartmentContextProvider;
