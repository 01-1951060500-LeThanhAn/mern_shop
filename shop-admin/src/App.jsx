import "./App.css";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Home from "./pages/home/Home";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import ProductList from "./pages/productList/ProductList";
import ModalUpdateProduct from "./pages/productUpdate/ModalUpdateProduct";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import Order from "./components/order/Order";
import { useJwt } from "react-jwt";
function App() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const { isExpired } = useJwt(localStorage.getItem("tokenAdmmin"));
  useEffect(() => {
    if (localStorage.getItem("tokenAdmmin") === "null") {
      navigate("/login");
      localStorage.removeItem("tokenAdmmin");
      localStorage.removeItem("admin");
    }
  }, []);

  useEffect(() => {
    const scroll = window.addEventListener("scroll", () => {
      setVisible(window.scrollY > 1700);
    });

    return () => {
      window.removeEventListener("scroll", scroll);
    };
  }, []);

  useEffect(() => {
    const checkToken = () => {
      if (isExpired === true) {
        navigate("/login");
        localStorage.removeItem("tokenAdmmin");
        localStorage.removeItem("admin");
      }
    };

    checkToken();
  }, [isExpired]);

  const handleScroll = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <ToastContainer />
      <div className="relative">
        <Routes>
          <Route path="/login" element={<Login />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/users" element={<UserList />}></Route>
          <Route path="/order" element={<Order />}></Route>

          <Route path="/products" element={<ProductList />}></Route>
          <Route
            path="/product/:productId"
            element={<ModalUpdateProduct />}
          ></Route>
          <Route path="/newproduct" element={<NewProduct />}></Route>
        </Routes>
      </div>

      <div
        className={`bg-blue-500 text-white rounded-full cursor-pointer ${
          visible ? "block" : "hidden"
        } p-3 fixed bottom-12 right-8 z-50`}
      >
        <button onClick={handleScroll}>
          <ArrowUpwardIcon />
        </button>
      </div>
    </>
  );
}

export default App;
