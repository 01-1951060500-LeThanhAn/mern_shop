import { Badge } from "@mui/material";
import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import useFakeUser from "../hooks/useFakeUser";
import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import LogoutIcon from "@mui/icons-material/Logout";

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  flex: 1;
  display: flex;

  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const Avatars = styled.div`
  display: flex;
  align-items: center;

  cursor: pointer;
  ${mobile({ flex: 2, justifyContent: "center" })}
`;

const MenuItem = styled.div`
  font-size: 14px;
  font-weight: semi-bold;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: "12px", marginLeft: "10px" })}
`;

const Form = styled.form``;
const LogOut = styled.div`
  margin-right: 20px;
`;

const Navbar = () => {
  const { currentUser } = useFakeUser();
  const cart = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [show, setShow] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    navigate(`/search?&keyword=${query}`);
  };

  const handleLogOut = () => {
    if (window.confirm("Bạn có chắc chắn muốn đăng xuất không ? ")) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    }
    navigate("/login");
  };

  return (
    <div className="h-16 w-full">
      <div className="flex justify-between items-center mx-8 py-4">
        <Left>
          <Link to={`/`}>
            <div className="text-xl 2xl:text-3xl font-bold">THANHAN.</div>
          </Link>
        </Left>
        <div className="text-center hidden md:block">
          <div className="flex border items-center">
            <Form onSubmit={handleSubmit}>
              <input
                className="w-[350px]  px-3 py-2 outline-none "
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search"
              />
              <Search
                style={{ color: "gray", fontSize: 30, cursor: "pointer" }}
              />
            </Form>
          </div>
        </div>
        <Right>
          {currentUser ? (
            <Avatars className="ds">
              <LogOut onClick={handleLogOut}>
                <LogoutIcon />
              </LogOut>
              <div className="avatar">
                <img
                  onClick={() => setShow(!show)}
                  className="bg-black relative rounded-full  w-12 h-12"
                  src="https://i.stack.imgur.com/QLyI4.png"
                  alt=""
                />

                <div
                  className={`absolute top-14 ${
                    show ? "hidden" : "block"
                  } shadow-sm shadow-slate-500 right-16 z-50`}
                >
                  <p className="bg-white text-black px-2 py-1">
                    {currentUser?.username}
                  </p>
                  <p className="bg-white text-black px-2 py-1">
                    {currentUser?.email}
                  </p>
                </div>
              </div>
            </Avatars>
          ) : (
            <>
              <Link to={`/register`}>
                {" "}
                <MenuItem>Đăng ký</MenuItem>
              </Link>
              <Link to={`/login`}>
                {" "}
                <MenuItem>Đăng nhập</MenuItem>
              </Link>
            </>
          )}
          <MenuItem>
            <Link to={`/cart`}>
              <Badge badgeContent={cart?.products?.length} color="primary">
                <ShoppingCartOutlined />
              </Badge>
            </Link>
          </MenuItem>
        </Right>
      </div>
    </div>
  );
};

export default Navbar;
