import { useRef } from "react";
import styled from "styled-components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { registerApi } from "../api/auth";
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.pexels.com/photos/459653/pexels-photo-459653.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 40%;
  padding: 20px;
  background-color: white;
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
`;
const Login = styled.button`
  margin-top: 10px;
`;
const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();
  const handleClick = async (e) => {
    e.preventDefault();
    if (username.current.value.length < 4) {
      toast.error("Tên phải hơn 3 ký tự");
    }
    if (!email.current.value.includes("@gmail.com")) {
      toast.error("Email không đúng định dạng");
      return;
    }
    if (passwordAgain.current.value !== password.current.value) {
      toast.error("Password not same");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await registerApi(user);

        navigate("/login");
        toast.success("Đăng ký thành công");
      } catch (err) {
        console.log(err);
      }
    }
  };
  return (
    <Container>
      <Wrapper>
        <Title>Tạo tài khoản</Title>
        <Form onSubmit={handleClick}>
          <Input ref={username} placeholder="username" />
          <Input ref={email} placeholder="email" />
          <Input ref={password} placeholder="password" />
          <Input ref={passwordAgain} placeholder="confirm password" />
          <Agreement>
            Chỉ cần bỏ ra 3 phút tạo tài khoản thì quý khách có thể mua hàng của
            shop chúng tôi
          </Agreement>
          <Button>Đăng ký</Button>
        </Form>
        <Login>
          Nếu đã có tài khoản. Vui lòng{" "}
          <Link className="text-blue-500" to={`/login`}>
            đăng nhập
          </Link>
        </Login>
      </Wrapper>
    </Container>
  );
};

export default Register;
