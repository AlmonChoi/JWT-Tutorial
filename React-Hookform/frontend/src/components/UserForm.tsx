import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { RootState, AppDispatch } from "../state/store";
import { loginAsync, createAsync } from "../state/user/userSlice";
import { clrResult } from "../state/user/userSlice";

const Userschema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});

type FormFields = z.infer<typeof Userschema>;

interface Props {
  type: string;
  title: string;
}

const UserForm = ({ type, title }: Props) => {
  const id = useSelector((state: RootState) => state.user.id);
  const isLogin = useSelector((state: RootState) => state.user.isLogin);
  const result = useSelector((state: RootState) => state.user.result);

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(clrResult());
  }, []);

  //React-Hook-Form Field and validator
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<FormFields>({
    defaultValues: {
      email: "test@mail.com",
      password: "password",
    },
    resolver: zodResolver(Userschema),
  });

  // Form Submit action
  const onSubmit: SubmitHandler<FormFields> = async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      // throw new Error("This is for test catach error!");
      console.log(data);
      if (type === "login") {
        dispatch(loginAsync(data));
      } else if (type === "create") {
        dispatch(createAsync(data));
      }
    } catch (err) {
      setError("root", {
        message: err.message,
      });
    }
  };

  return (
    <>
      <Container>
        <Card
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ color: "#000" }}
        >
          <Card.Body>
            <Card.Title>{title}</Card.Title>

            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    {...register("email")}
                    type="email"
                    placeholder="Enter email"
                  />
                  <Form.Text className="text-danger">
                    {errors.email && <div>{errors.email.message}</div>}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-4" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    {...register("password")}
                    type="password"
                    placeholder="Password"
                  />
                  <Form.Text className="text-danger">
                    {errors.password && <div>{errors.password.message}</div>}
                  </Form.Text>
                </Form.Group>

                <Col></Col>
                <Col xs={7} className="text-center">
                  <Button
                    variant="primary"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Loading..." : "Submit"}
                  </Button>
                </Col>
                <Col></Col>

                {errors.root && (
                  <div className="text-danger">{errors.root.message}</div>
                )}
                {result && <div className="text-black">{result}</div>}
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default UserForm;
