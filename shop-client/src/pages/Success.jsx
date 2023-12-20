import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "./Footer";

const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <Navbar />

      <div className="mt-10">
        <div className="container bg-white p-4 flex flex-col items-center justify-center">
          <h1 className="text-[50px] font-semibold my-10">
            Xin cảm ơn quý khách đã thanh toán!
          </h1>
          <p className="mb-4 border p-4 text-center">
            Cảm ơn quý khách đã ủng hộ, chúng tui sẽ liên hệ với bạn sớm nhất
          </p>
          <button
            onClick={() => navigate("/")}
            className="py-1 px-4 bg-[#ffd400] my-4 text-white"
          >
            Trở về trang chủ !
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Success;
