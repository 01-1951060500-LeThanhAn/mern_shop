import { useRef } from "react";
import styled from "styled-components";

import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
import { loginApi } from "../../api/auth.js";
import { useNavigate } from "react-router-dom";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: url("https://img.freepik.com/free-vector/gradient-galaxy-background_23-2148983655.jpg?w=1060&t=st=1683430689~exp=1683431289~hmac=10be8d39886980e74acfb6de64c14eaef1002d296008a38557ce722e6571ecb6")
    center;
  background-size: cover;
  display: flex;
  z-index: 100;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`;

const Error = styled.span`
  color: red;
`;

const Login = () => {
  const email = useRef();
  const password = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isFetching, error } = useSelector((state) => state.user);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await loginApi(
        {
          email: email.current.value,
          password: password.current.value,
        },
        dispatch
      );
    } catch (error) {
      console.log(error);
    }

    navigate("/");
    window.location.reload();
  };
  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="Email"
            type="email"
            required
            className="loginInput"
            ref={email}
          />
          <Input ref={password} placeholder="password" type="password" />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong...</Error>}
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;
