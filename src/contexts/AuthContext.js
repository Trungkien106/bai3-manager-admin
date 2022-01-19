import { createContext } from "react";
import axios from "axios";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";

export const AuthContext = createContext();

function AuthContextProvider({ children }) {
  // Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      if (response.data.accessToken) {
        localStorage.setItem(
          LOCAL_STORAGE_TOKEN_NAME,
          response.data.accessToken
        );
      }
      return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // Logout
  const logoutUser = () => {
    localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME);
  };

  // Context data
  const authContextData = { loginUser, logoutUser };

  // Return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;
