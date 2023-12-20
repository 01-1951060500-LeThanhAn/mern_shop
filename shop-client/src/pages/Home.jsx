import Categories from "../components/Categories";
import Navbar from "../components/Navbar";
import Slider from "../components/Slider";
import ProductReview from "./ProductReview";
import Footer from "./Footer";
const Home = () => {
  return (
    <div className="data">
      <Navbar />
      <Slider />
      <Categories />
      <ProductReview cat={"phone"} title={"Điện thoại"} />
      <ProductReview cat={"laptop"} title={"Máy tính xách tay"} />
      <ProductReview cat={"mouse"} title={"Chuột máy tính"} />
      <ProductReview cat={"smartwatch"} title={"Đồng hồ thông minh"} />
      <Footer />
    </div>
  );
};

export default Home;
