import { BrowserRouter, Routes, Route } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import Home from "./components/Home";
import Header from "./components/Header";
import UserForm from "./components/UserForm";
import LogoutForm from "./components/LogoutForm";
import Protected from "./components/Protected";

import { useSelector } from "react-redux";
import { RootState } from "./state/store";

function App() {
  const id = useSelector((state: RootState) => state.user.id);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const jwt = useSelector((state: RootState) => state.user.jwt);

  return (
    <>
      <Container fluid>
        <Header />
        <Row>
          <p></p>
        </Row>
        <Row>
          <Col></Col>
          <Col xs={5}>
            <BrowserRouter>
              <Routes>
                <Route
                  path="/"
                  element={<Home id={id} isLogin={isLogin} jwt={jwt} />}
                ></Route>
                <Route
                  exact
                  path="/createUser"
                  element={<UserForm type="create" title="Create User" />}
                ></Route>
                <Route
                  exact
                  path="/login"
                  element={
                    isLogin ? (
                      <Container>
                        <Card
                          className="shadow p-3 mb-5 bg-white rounded"
                          style={{ color: "#000" }}
                        >
                          <Card.Body>
                            <Card.Title>Login Page</Card.Title>
                            <p></p>User has Logon
                            <p></p>isLogin field = {isLogin ? "True" : "False"}
                          </Card.Body>
                        </Card>
                      </Container>
                    ) : (
                      <UserForm type="login" title="Login" />
                    )
                  }
                ></Route>

                <Route exact path="/logout" element={<LogoutForm />}></Route>
                <Route path="/protected" element={<Protected />}></Route>
              </Routes>
            </BrowserRouter>
          </Col>
          <Col></Col>
        </Row>
      </Container>
    </>
  );
}

export default App;
