import styled from "styled-components";
import { mobile } from "../utils/responsive";
import { Link } from "react-router-dom";

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({ height: "20vh" })}
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  background-color: white;
  color: gray;
  cursor: pointer;
  font-weight: 600;
`;

const CategoryItem = (item) => {
  return (
    <div className="lg:h-[30vh] my-1 md:my-1 2xl:h-[70vh] 2xl:mt-2 flex-1 relative mx-[5px]">
      <Link to={`/products/${item.item.params}`}>
        <Image src={item.item.img} />
        <Info>
          <Title>{item.item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </div>
  );
};

export default CategoryItem;
