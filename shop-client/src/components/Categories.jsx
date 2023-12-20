import styled from "styled-components";
import { categories } from "../utils/data";
import { mobile } from "../utils/responsive";
import CategoryItem from "./CategoryItem";

const Container = styled.div`
  // display: flex;
  // padding: 5px;
  // justify-content: space-between;
  // ${mobile({ padding: "0px", flexDirection: "column" })}
`;

const Categories = () => {
  return (
    <Container className="flex md:my-1 flex-col lg:flex-row 2xl:flex 2xl:flex-row 2xl:justify-between">
      {categories.map((item) => (
        <CategoryItem item={item} key={item.id} />
      ))}
    </Container>
  );
};

export default Categories;
