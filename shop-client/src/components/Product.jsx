import styled from "styled-components";
import { Link } from "react-router-dom";

const Image = styled.img`
  height: 200px;
  text-align: center;
  margin-top: 10px;
  margin: 10px auto;
  z-index: 2;
`;

const Info = styled.div`
  height: 160px;
`;

const Title = styled.div`
  margin-top: 10px;
  font-weight: bold;
`;

const Price = styled.div`
  margin-top: 10px;
  font-weight: bold;
  color: red;
`;

const View = styled.div`
  margin: auto 20px;
`;

const Product = (item) => {
  return (
    <div className="shadow-sm md:w-[220px] 2xl:w-[260px] h-[370px] m-[10px] text-center shadow-slate-500/50">
      <Image src={item?.item?.img} />
      <Info>
        <Title>
          {item?.item?.title?.length > 25
            ? item?.item?.title.slice(0, 24)
            : item?.item?.title}
        </Title>
        <Price>{item?.item?.price}.00 USD</Price>
        <View>
          <Link to={`/product/${item?.item._id}`}>
            <button className="bg-[#ffd400] rounded-lg text-white my-4 w-full py-2">
              View Info
            </button>
          </Link>
        </View>
      </Info>
    </div>
  );
};

export default Product;
