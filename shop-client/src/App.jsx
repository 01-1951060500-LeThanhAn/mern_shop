import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ProductList from "./pages/ProductList";
import DetailProduct from "./pages/DetailProduct";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Success from "./pages/Success.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register";
import Search from "./pages/Search";
function App() {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/products/:category" element={<ProductList />}></Route>
          <Route path="/product/:id" element={<DetailProduct />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/success" element={<Success />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/search" element={<Search />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
