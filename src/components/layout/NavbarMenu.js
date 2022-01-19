import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import { AuthContext } from "../../contexts/AuthContext";
import { useContext } from "react";
import { useHistory } from "react-router-dom";

function NavbarMenu() {
  const { logoutUser } = useContext(AuthContext);

  const history = useHistory();
  const logout = () => {
    logoutUser();
    history.push("/login");
  };

  return (
    <Navbar bg="success" expand="lg" variant="dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0">
            <Nav.Link className="fs-6" to="/department" as={Link}>
              DEPARTMENT
            </Nav.Link>
            <Nav.Link className="fs-6" to="/employee" as={Link}>
              EMPLOYEE
            </Nav.Link>
            <Nav.Link className="fs-6" onClick={logout}>
              LOGOUT
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarMenu;
