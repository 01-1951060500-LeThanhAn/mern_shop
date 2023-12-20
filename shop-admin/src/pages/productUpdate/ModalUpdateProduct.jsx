import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAllProducts } from "../../api/products";
import { Publish } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import Sidebar from "../../components/sidebar/Sidebar";
import { useEffect, useState } from "react";
import { updateProductItem } from "../../redux/actions/productAction";
import { toast } from "react-toastify";

const ModalUpdateProduct = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [product, setProduct] = useState({});
  const [products, setProducts] = useState([]);
  const productId = location.pathname.split("/")[2];
  const navigate = useNavigate();
  const [data, setData] = useState({
    title: "",
    desc: "",
    price: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await getAllProducts();

      setProducts(res.data?.results);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    setProduct(
      products && products.find((product) => product._id === productId)
    );
  }, [products, productId]);
  useEffect(() => {
    return () => product && URL.revokeObjectURL(product);
  }, [product]);

  const ImageHander = async (pics) => {
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "thanhan2001");
      data.append("cloud_name", "dkw090gsn");
      fetch("https://api.cloudinary.com/v1_1/dkw090gsn/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setProduct({ ...product, img: data?.url });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error("Photo is invalid");
    }
  };

  const handleUpdate = () => {
    try {
      updateProductItem(
        productId,
        {
          img: product?.img,
          desc: data?.desc,
          title: data?.title,
          price: data?.price,
        },
        dispatch
      );
      navigate("/products");
      toast.success("Cập nhật sản phẩm thành công");
    } catch (error) {
      console.log(error);
      toast.error("Cập nhật thất bại");
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="w-1/5 bg-white">
          <Sidebar />
        </div>
        <div className="flex w-4/5 h-[500px] px-6 shadow-sm shadow-slate-500/50 mx-12  bg-slate-100">
          <div className=" p-5 w-full ">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl">Product: {product?.title}</h1>
              <div>
                <Link to="/newproduct">
                  <button className="bg-blue-500 text-white px-4 py-2 text-xl font-semibold cursor-pointer rounded-full">
                    Create
                  </button>
                </Link>
                <button
                  onClick={handleUpdate}
                  className="bg-red-500 ml-4 text-white px-4 py-2 text-xl font-semibold cursor-pointer rounded-full"
                >
                  Update
                </button>
              </div>
            </div>
            <div className="">
              <div className="flex items-center">
                <img
                  src={product?.img}
                  alt=""
                  className="w-24 object-contain  mr-3 h-24"
                />
              </div>
            </div>
            <div className="p-3  my-8 shadow-sm h-72 bg-white shadow-slate-500/50">
              <form className="flex justify-between">
                <div className="flex flex-col">
                  <label>Product Name</label>
                  <input
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                    className="border border-blue-500 outline-none my-3 py-1 rounded-md px-2"
                    type="text"
                  />
                  <label>Product Description</label>
                  <input
                    name="desc"
                    value={data.desc}
                    onChange={handleChange}
                    className="border border-blue-500 outline-none my-3 py-1 rounded-md px-2"
                    type="text"
                  />
                  <label>Price</label>
                  <input
                    name="price"
                    value={data.price}
                    onChange={handleChange}
                    className="border border-blue-500 outline-none my-3 py-1 rounded-md px-2"
                    type="text"
                  />
                </div>
                <div className="">
                  <div className="flex flex-col items-center">
                    <img
                      src={product?.img}
                      alt=""
                      className="w-44  object-contain mr-5 h-44"
                    />
                    <label className="text-2xl mr-3 mt-6" htmlFor="file">
                      <Publish />
                    </label>
                    <input
                      onChange={(e) => {
                        ImageHander(e.target.files[0]);
                      }}
                      type="file"
                      accept="image/*"
                      id="file"
                      hidden
                      name="file"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ModalUpdateProduct;
