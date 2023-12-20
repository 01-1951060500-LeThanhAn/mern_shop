import { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import { ClosedCaption, InsertPhoto } from "@mui/icons-material";
import { toast } from "react-toastify";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { baseApi } from "../../api";
const NewProduct = () => {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cat, setCat] = useState([]);
  const [size, setSize] = useState([]);
  const [colors, setColors] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleSize = (e) => {
    setSize(e.target.value.split(","));
  };
  const handleColors = (e) => {
    setColors(e.target.value.split(","));
  };

  const handleAddproducts = async (e) => {
    e.preventDefault();
    if (!file) {
      return toast.error("Vui lòng thêm ảnh ");
    }
    if (!size || !colors || !cat) {
      return toast.error("Vui lòng  không để trống các trường ");
    }
    setLoading(true);

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "videos");
      data.append("cloud_name", "dkw090gsn");

      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dkw090gsn/image/upload`,
        data
      );

      const products = {
        ...inputs,
        img: res.data?.url,
        categories: cat,
        size: size,
        color: colors,
      };
      const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
      await baseApi.post(`/product`, products, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoading(false);
      setFile(null);
      toast.success("Thêm sản phẩm thành công");
      navigate("/products");
    } catch (error) {
      setLoading(false);
      setFile(null);
      console.log(error);
    }
  };
  return (
    <>
      <div className="flex">
        <div className="w-1/5 bg-white">
          <Sidebar />
        </div>
        <div className="w-4/5 p-6">
          <p className="text-3xl font-bold mb-4">Tạo sản phẩm</p>
          {file ? (
            <div className="shareImgContainer">
              <img
                className="w-1/4 h-40 object-contain"
                src={URL.createObjectURL(file)}
                alt=""
              />
              <ClosedCaption
                className="text-2xl mt-2"
                onClick={() => setFile(null)}
              />
            </div>
          ) : (
            <label className="flex mr-[10px]" htmlFor="upload">
              <div className="w-1/4 h-40 cursor-pointer shadow-sm shadow-slate-500/50 bg-white flex justify-center items-center">
                <div className="flex  flex-col items-center">
                  <InsertPhoto className="text-xl text-slate-500" />
                  <span className="border-none text-lg text-slate-500">
                    Chèn ảnh
                  </span>
                </div>
              </div>
            </label>
          )}
          <input
            onChange={(e) => setFile(e.target.files[0])}
            type="file"
            id="upload"
            hidden
            accept="*"
          />
          <div className="grid grid-cols-2">
            <div className="my-4">
              <div className=" py-2 mr-4 text-xl font-semibold">Tiêu đề</div>
              <input
                className="py-2 w-[400px] border-none outline-none px-2"
                name="title"
                type="text"
                placeholder="Apple Airpods"
                onChange={handleChange}
              />
            </div>
            <div className="my-4">
              <div className=" py-2 mr-4 text-xl font-semibold">Mô tả</div>
              <input
                className="py-2 w-[400px] border-none outline-none px-2"
                name="desc"
                type="text"
                placeholder="description..."
                onChange={handleChange}
              />
            </div>
            <div className="my-4">
              <div className=" py-2 mr-4 text-xl font-semibold">Gía</div>
              <input
                className="py-2 w-[400px] border-none outline-none px-2"
                name="price"
                type="number"
                placeholder="100"
                onChange={handleChange}
              />
            </div>
            <div className="my-4">
              <div className=" py-2 mr-4 text-xl font-semibold">Thể loại</div>
              <input
                value={cat}
                className="py-2 w-[400px] px-2  border-none
                outline-none"
                type="text"
                placeholder="jeans,skirts"
                onChange={handleCat}
              />
            </div>
            <div className="my-4">
              <div className=" py-2 mr-4 text-xl font-semibold">Kích cỡ</div>
              <input
                value={size}
                onChange={handleSize}
                className="py-2 w-[400px] px-2  border-none
                outline-none"
                type="text"
                placeholder="XS,XL,...."
              />
            </div>
            <div className="my-4">
              <div className=" py-2  mr-4 text-xl font-semibold">Màu sắc</div>
              <input
                value={colors}
                onChange={handleColors}
                className="py-2 px-2 w-[400px] border-none
                outline-none"
                type="text"
                placeholder="red, blue...."
              />
            </div>
          </div>
          <div className="my-4">
            <div className=" py-2 mr-4 text-xl font-semibold">
              <button
                onClick={handleAddproducts}
                className="bg-blue-500 text-white px-3 py-2 cursor-pointer"
              >
                {loading ? (
                  <>
                    <div className="text-slate-400 cursor-none">Loading...</div>
                  </>
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
