import React from "react";
import reactLogo from "../assets/react.svg";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Container fluid>
        <Navbar bg="primary" data-bs-theme="dark">
          <img src={reactLogo} className="logo react" alt="React logo" />
          <div className="me-2"></div>
          <Navbar.Brand href="/">JWT React-Hoot-Form</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createUser">Create User</Nav.Link>
            <Nav.Link href="/login">Login</Nav.Link>
            <Nav.Link href="/logout">Logout</Nav.Link>
            <Nav.Link href="/protected">Protected Access</Nav.Link>
            <Nav.Link href="/secure/test">API Test</Nav.Link>
          </Nav>
        </Navbar>
      </Container>
    </>
  );
};

export default Header;
