import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./components/layout/Home";
import Login from "./views/Login";
import "./App.css";
import AuthContextProvider from "./contexts/AuthContext";
import Department from "./views/Department";
import Employee from "./views/Employee";
import DepartmentContextProvider from "./contexts/DepartmentContext";
import EmployeeContextProvider from "./contexts/EmployeeContext";

function App() {
  return (
    <>
      <AuthContextProvider>
        <DepartmentContextProvider>
          <EmployeeContextProvider>
            <Router>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/department" component={Department} />
                <Route exact path="/employee" component={Employee} />
              </Switch>
            </Router>
          </EmployeeContextProvider>
        </DepartmentContextProvider>
      </AuthContextProvider>
    </>
  );
}

export default App;
