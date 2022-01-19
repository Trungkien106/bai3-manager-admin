function employeeReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "EMPLOYEE_LOAD_SUCCESS":
      return {
        ...state,
        employees: payload,
      };

    case "EMPLOYEE_LOAD_FAIL":
      return {
        ...state,
        employees: [],
      };

    case "ADD_EMPLOYEE":
      return {
        ...state,
        employees: [...state.employees, payload],
      };

    case "DELETE_EMPLOYEE":
      return {
        ...state,
        employees: state.employees.filter((item) => item.id !== payload),
      };

    case "FIND_EMPLOYEE":
      return {
        ...state,
        employeeEdit: payload,
      };

    case "UPDATE_EMPLOYEE":
      const newEmployees = state.employees.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        ...state,
        employees: newEmployees,
      };

    default:
      return state;
  }
}

export default employeeReducer;
