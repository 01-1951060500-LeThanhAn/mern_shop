import { Add, Remove } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import DeleteIcon from "@mui/icons-material/Delete";
import Navbar from "../components/Navbar";
import { mobile } from "../utils/responsive.js";
import StripeCheckout from "react-stripe-checkout";
import { useEffect, useState } from "react";
import { userApi } from "../api/index";
import { useNavigate } from "react-router";
import { cleanCart, removeCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";

const KEY =
  "pk_test_51JsT6lDhEfGrbNnMZ25xzn0JpkEYxKstOB1APUboUFLy0VnQ1zZBqfD4ow2YD0K5ntI5on6aMLibhdUnzh39aHMm00jMaURdZP";

const Container = styled.div``;

const TopTexts = styled.div`
  ${mobile({ display: "none" })}
`;
const TopText = styled.span`
  background-color: #006fdf;
  color: white;
  cursor: pointer;
  margin: 0px 10px;
  font-weight: semibold;
  padding: 6px 10px;
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
`;

const SummaryItem = styled.div`
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  font-weight: ${(props) => props.type === "total" && "500"};
  font-size: ${(props) => props.type === "total" && "24px"};
`;

const SummaryItemText = styled.span``;

const SummaryItemPrice = styled.span``;

const Button = styled.div`
  background-color: #006fdf;
  color: white;
  text-align: center;
  padding: 8px 0;
`;

const ButtonSon = styled.div`
  width: auto;
`;

const Cart = () => {
  const cart = useSelector((state) => state.cart);

  const [stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userApi.post("/checkout/payment", {
          tokenId: stripeToken.id,
          amount: 500,
        });
        dispatch(cleanCart());

        navigate("/success", {
          stripeData: res.data,
          products: cart,
        });
      } catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, cart.total, navigate]);

  const handleDeleteCart = (color) => {
    if (window.confirm("Bạn có chắc chắn xóa  đơn hàng này")) {
      dispatch(removeCart(color));
    }
    return toast.success("Xóa thành công đơn hàng");
  };

  return (
    <Container>
      <Navbar />
      <div className="mt-8 2xl:mx-8 mx-2">
        <div className="flex justify-end items-center">
          <TopTexts>
            <TopText>Shopping Bag({cart?.products?.length})</TopText>
            <TopText>Your Wishlist (0)</TopText>
          </TopTexts>
        </div>
        <div className="flex flex-col w-full mt-12 2xl:justify-between lg:justify-between lg:flex-row">
          <div className="mb-8 ">
            {cart.products &&
              cart.products.map((product) => (
                <>
                  <div className="flex">
                    <div className="flex justify-between items-center">
                      <img className="w-36 h-36" src={product.img} />
                      <div className="md:flex md:flex-row md:justify-between 2xl:flex-row  lg:flex-col lg:items-center">
                        <p className="mx-4 lg:mx-0 2xl:ml-12">
                          {product.title}
                        </p>
                        <p className="mx-4">{product.color}</p>
                        <p className="mx-4">{product.size}</p>
                        <p className="font-bold text-red-600 2xl:ml-12 mx-4 md:mx-0">
                          $ {product.price * product.quantity}
                        </p>
                      </div>
                      <div className="flex ml-6 md:ml-36 2xl:ml-12 lg:mr-24 items-center justify-between">
                        <div className="flex items-center md:ml-12">
                          <div className="mr-3">
                            {" "}
                            <Add />
                          </div>
                          <p>{product.quantity}</p>
                          <div className="ml-3">
                            {" "}
                            <Remove />
                          </div>
                        </div>

                        <div
                          className="ml-4"
                          onClick={() => handleDeleteCart(product.color)}
                        >
                          <DeleteIcon />
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ))}
            <Hr />
          </div>

          <div className="w-full 2xl:w-1/3 lg:w-[50%] p-5 shadow-sm shadow-slate-500/50">
            <SummaryTitle>ORDER SUMMARY</SummaryTitle>
            <SummaryItem>
              <SummaryItemText>Subtotal</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Estimated Shipping</SummaryItemText>
              <SummaryItemPrice>$ 5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem>
              <SummaryItemText>Shipping Discount</SummaryItemText>
              <SummaryItemPrice>$ -5.90</SummaryItemPrice>
            </SummaryItem>
            <SummaryItem type="total">
              <SummaryItemText>Total</SummaryItemText>
              <SummaryItemPrice>$ {cart.total}</SummaryItemPrice>
            </SummaryItem>
            <StripeCheckout
              name="Thành An Shop"
              image="https://img.freepik.com/premium-vector/cute-snake-mascot-illustration-logo-icon-vector-flat-cartoon-style_461200-232.jpg"
              billingAddress
              shippingAddress
              description={`Tên sản phẩm của bạn: $${cart.total}`}
              amount={cart.total}
              token={onToken}
              stripeKey={KEY}
            >
              <Button>
                <ButtonSon>THANH TOÁN NGAY</ButtonSon>
              </Button>
            </StripeCheckout>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Cart;
