import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ArrowUpward } from "@mui/icons-material";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../api/user";
import { getAllProducts } from "../../api/products";
import CategoryIcon from "@mui/icons-material/Category";
const FeatureInfo = () => {
  const [users, setUsers] = useState();
  const [products, setProducts] = useState();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers();

        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllUsers();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProducts();

        setProducts(res.data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProducts();
  });
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="header">
              <img
                className="w-8 h-8"
                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/icons/unicons/chart-success.png"
                alt=""
              />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">Profit</p>
          <p className="mt-2 text-2xl text-slate-500 font-semibold">$12.00</p>
          <div className="flex items-center">
            <div className="text-green-500">
              <ArrowUpward />
            </div>
            <p className="ml-2 text-green-500">+70%</p>
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="header">
              <img
                className="w-8 h-8"
                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/icons/unicons/wallet-info.png"
                alt=""
              />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">Sales</p>
          <p className="mt-2 text-2xl text-slate-500 font-semibold">$12.00</p>
          <div className="flex items-center">
            <div className="text-green-500">
              <ArrowUpward />
            </div>
            <p className="ml-2 text-green-500">+70%</p>
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="header">
              <img
                className="w-8 h-8"
                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/icons/unicons/paypal.png"
                alt=""
              />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">Payments</p>
          <p className="mt-2 text-2xl text-slate-500 font-semibold">$12.00</p>
          <div className="flex items-center">
            <div className="text-green-500">
              <ArrowUpward />
            </div>
            <p className="ml-2 text-green-500">+70%</p>
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="header">
              <img
                className="w-8 h-8"
                src="https://demos.themeselection.com/sneat-bootstrap-html-admin-template-free/assets/img/icons/unicons/cc-primary.png"
                alt=""
              />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">
            Transaction{" "}
          </p>
          <p className="mt-2 text-2xl text-slate-500 font-semibold">$12.00</p>
          <div className="flex items-center">
            <div className="text-green-500">
              <ArrowUpward />
            </div>
            <p className="ml-2 text-green-500">+70%</p>
          </div>
        </div>
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="w-8 h-8 text-orange-400">
              <CategoryIcon />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">
            Total products{" "}
          </p>
          <p className="mt-2 text-3xl text-slate-500 font-semibold">
            {products?.length}
          </p>
        </div>
        <div className="bg-white p-3 shadow-sm shadow-slate-500/50">
          <div className="flex justify-between items-center">
            <div className="text-blue-600">
              <PersonIcon />
            </div>
            <div className="icon">
              <MoreVertIcon />
            </div>
          </div>
          <p className="mt-3 text-md text-slate-500 font-semibold">
            Total users{" "}
          </p>
          <p className="mt-2 text-3xl text-slate-500 font-semibold">
            {users?.length}
          </p>
        </div>
      </div>
    </>
  );
};

export default FeatureInfo;
