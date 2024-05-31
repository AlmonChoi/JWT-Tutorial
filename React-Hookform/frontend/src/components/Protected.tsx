import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "./state/store";

const Protected = () => {
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const jwt = useSelector((state: RootState) => state.user.jwt);

  const [content, setContent] = useState(
    "Protected content and logon required!"
  );

  useEffect(() => {
    if (isLogin) {
      console.log("Getting protected message");
      fetch("/secure/api", {
        method: "GET",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          Authorization: jwt,
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.message) {
            console.log(response.message);
            return response.message;
          } else {
            console.log(response.error);
            return response.error;
          }
        })
        .then((result) => setContent(result));
    }
  }, []);

  return (
    <>
      <Container>
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ color: "#000" }}
        >
          <Card.Body>
            <Card.Title>Protected Content</Card.Title>
            <p></p>
            {content}
            <p></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Protected;
