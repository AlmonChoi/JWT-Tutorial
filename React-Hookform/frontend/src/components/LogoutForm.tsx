import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../state/store";
import { logout } from "../state/user/userSlice";

const LogoutForm = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);

  const dispatch = useDispatch<AppDispatch>();
  dispatch(logout());

  return (
    <>
      <Container>
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ color: "#000" }}
        >
          <Card.Body>
            <Card.Title>Logout Page</Card.Title>
            <p></p>User logout executed
            <p></p>isLogin = {isLogin ? "True" : "False"}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default LogoutForm;
