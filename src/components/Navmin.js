import React,{useEffect} from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation,Link,useNavigate} from 'react-router-dom';

const Navmin = () => {
  const history = useNavigate();
  //for active nav
const logoutHandel = () =>{
  localStorage.removeItem('token');
  history("/");
}
  let location = useLocation();

  return (
    <>
    <Navbar bg="light" expand="lg">
      <Container >
        <Navbar.Brand href="/home">iNotebook</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link className={`${location.pathname === "/" ? "active" : ""}`} href="/">Home</Nav.Link>
            <Nav.Link href="/about" className={`${location.pathname === "/about" ? "active" : ""}`}>About</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" disabled>
              Link
            </Nav.Link>
          </Nav>
          {!localStorage.getItem("token")?<div><Link to="/" className="btn btn-primary mx-1 p-2">Login</Link>
          <Link to="/signup" className="btn btn-primary mx-1 p-2">Signup</Link></div>:
          <button onClick={logoutHandel} type='button'className="btn btn-primary mx-1 p-2">Logout</button>}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
  )
}

export default Navmin