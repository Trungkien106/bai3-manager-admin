function departmentReducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case "DEPARTMENT_LOAD_SUCCESS":
      return {
        ...state,
        departments: payload,
      };

    case "DEPARTMENT_LOAD_FAIL":
      return {
        ...state,
        departments: [],
      };

    case "ADD_DEPARTMENT":
      return {
        ...state,
        departments: [...state.departments, payload],
      };

    case "DELETE_DEPARTMENT":
      return {
        ...state,
        departments: state.departments.filter((item) => item.id !== payload),
      };

    case "FIND_DEPARTMENT":
      return {
        ...state,
        departmentEdit: payload,
      };

    case "UPDATE_DEPARTMENT":
      const newDepartments = state.departments.map((item) =>
        item.id === payload.id ? payload : item
      );
      return {
        ...state,
        departments: newDepartments,
      };

    default:
      return state;
  }
}

export default departmentReducer;
