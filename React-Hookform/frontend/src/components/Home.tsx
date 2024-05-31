import Container from "react-bootstrap/Container";
import Card from "react-bootstrap/Card";

interface Props {
  id: string;
  isLogin: boolean;
  jwt: string;
}

const Home = ({ id, isLogin, jwt }: Props) => {
  return (
    <>
      <Container>
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ color: "#000" }}
        >
          <Card.Body>
            <Card.Title>Home</Card.Title>
            <div>UserId : {id}</div>
            <div>isLogin : {isLogin ? "True" : "False"}</div>
            <div>JWT Token : {jwt}</div>
            <p></p>This is JWT Home Page and do not require any logon<p></p>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default Home;
