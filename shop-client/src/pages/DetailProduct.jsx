import { Add, Remove } from "@mui/icons-material";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import { mobile } from "../utils/responsive.js";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { baseApi } from "../api/index";
import { addCart } from "../redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Reviews from "./Reviews";
import RandomProduct from "../components/RandomProduct";
import Footer from "./Footer";
const Container = styled.div``;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 80%;
  margin: 0 auto;
  height: 65vh;
  object-fit: contain;
  ${mobile({ height: "40vh" })}
`;

const Title = styled.h1`
  font-weight: 700;
  font-size: 23px;
`;

const Desc = styled.p`
  margin: 20px 0px;
  font-weight: semi-bold;
`;

const Price = styled.span`
  font-weight: bold;
  font-size: 30px;
`;

const Filter = styled.div`
  display: flex;

  align-items: center;
`;

const FilterTitle = styled.span`
  font-size: 20px;
  font-weight: semibold;
`;

const FilterColor = styled.div`
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin-left: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-center;
  margin: 0 30px 0 0 ${mobile({ width: "100%" })};
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;

  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1px 0;
`;

const Button = styled.button`
  padding: 10px;
  color: white;
  margin-left: 30px;
  background-color: #006fdf;
  cursor: pointer;
  font-weight: 500;
`;

const ColorItem = styled.div`
  margin: 0 6px;
`;

const AddItem = styled.div`
  border: 1px solid black;
  padding: 1px 0;
  border-right: none;
  cursor: pointer;
`;

const RemoveItem = styled.div`
  border: 1px solid black;
  padding: 1px 0;
  border-left: none;
  cursor: pointer;
`;

const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const { currentUser } = useSelector((state) => state.user);

  const [color, setColor] = useState("");
  const [size, setSize] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);

  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await baseApi.get("/product/details/" + id);

        setProduct(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getProduct();
  }, [id]);

  const handleQuantity = (type) => {
    if (type === "dec") {
      quantity > 1 && setQuantity(quantity - 1);
    } else {
      setQuantity(quantity + 1);
    }
  };

  const handleClick = () => {
    if (!currentUser) {
      return toast.error("Vui lòng đăng nhập để mua hàng");
    }
    if (color.length === 0 || size.length === 0) {
      return toast.error("Vui lòng chọn kích cỡ và màu sắc");
    }

    dispatch(addCart({ ...product, quantity, color, size }));
    return toast.success("Thêm giỏ hàng thành công");
  };
  return (
    <Container>
      <Navbar />

      <div className="flex flex-col mt-4 items-center lg:flex-row lg:mt-0 2xl:mx-20 2xl:mt-12">
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <div className="flex-1 px-8">
          <Title>{product.title}</Title>
          <Desc>{product?.desc}</Desc>
          <Price>$ {product.price}</Price>

          <div className="flex justify-between 2xl:w-4/5 w-full my-[30px]">
            <Filter>
              <FilterTitle>Màu sắc: </FilterTitle>
              {product.color?.map((c) => (
                <FilterColor className="text-xl" key={c}>
                  <ColorItem
                    onClick={() => setColor(c)}
                    className={
                      color === c
                        ? "bg-black text-white px-2 py-1"
                        : "border border-black px-2 py-1 text-black"
                    }
                  >
                    {c}
                  </ColorItem>
                </FilterColor>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Kích cỡ:</FilterTitle>
              <FilterSize onChange={(e) => setSize(e.target.value)}>
                {product.size?.map((s) => (
                  <FilterSizeOption key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </div>
          <AddContainer>
            <AmountContainer>
              <AddItem>
                <Remove onClick={() => handleQuantity("dec")} />
              </AddItem>
              <Amount>{quantity}</Amount>
              <RemoveItem>
                {" "}
                <Add onClick={() => handleQuantity("inc")} />
              </RemoveItem>
            </AmountContainer>
            <Button onClick={handleClick}>Thêm sản phẩm vào giỏ hàng</Button>
          </AddContainer>
        </div>
      </div>

      <Reviews id={id} />
      <RandomProduct />
      <Footer />
    </Container>
  );
};

export default Product;
