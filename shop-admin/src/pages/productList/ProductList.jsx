import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductItem,
  getProducts,
} from "../../redux/actions/productAction";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../components/sidebar/Sidebar";
import { Link } from "react-router-dom";

function ProductList() {
  const { products } = useSelector((state) => state.products);

  const { currentUser } = useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getProducts(dispatch);
  }, [dispatch]);

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa không? ")) {
      setLoading(true);
      try {
        await deleteProductItem(id, dispatch);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }

      setLoading(false);
    }
  };

  return (
    <>
      {!loading && (
        <div className="flex items-center">
          <div className="fixed top-0 bg-white ">
            <SideBar />
          </div>
          <div className="mb-8 ml-48 mr-8 pr-4 mt-4 pl-6 w-full py-4 shadow-sm shadow-slate-500/50 bg-slate-100">
            <div className="flex justify-between items-center">
              <h3 className="text-3xl font-bold mb-5">Sản phẩm</h3>
              <Link to={`/newproduct`}>
                <button className="text-xl bg-blue-500 text-white px-3 py-2 cursor-pointer font-semibold mb-5">
                  Tạo sản phẩm
                </button>
              </Link>
            </div>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Số thứ tự</TableCell>
                    <TableCell>Tiêu đề</TableCell>
                    <TableCell>Mô tả</TableCell>
                    <TableCell>Hình ảnh</TableCell>
                    <TableCell>Kích cỡ</TableCell>
                    <TableCell>Màu sắc</TableCell>
                    <TableCell>Gía</TableCell>
                    <TableCell>Ngày</TableCell>
                    <TableCell>Hành động</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {products?.data?.results &&
                    products?.data?.results.map((row, index) => (
                      <>
                        {row._id !== currentUser._id && (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {index}
                            </TableCell>
                            <TableCell>{row.title}</TableCell>
                            <TableCell>{row.desc}</TableCell>
                            <TableCell>
                              <img
                                src={row?.img}
                                className="w-20 h-20 object-contain"
                                alt=""
                              />
                            </TableCell>
                            <TableCell>{row.size.join(",")}</TableCell>
                            <TableCell>{row.color.join(",")}</TableCell>
                            <TableCell>{row.price}</TableCell>
                            <TableCell>
                              {new Date(row.createdAt).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <Link to={`/product/${row._id}`}>
                                  <div>
                                    <EditIcon className="text-blue-500 cursor-pointer" />
                                  </div>
                                </Link>
                                <div
                                  onClick={() => handleDeleteProduct(row._id)}
                                >
                                  <DeleteIcon className="text-red-500 cursor-pointer ml-2" />
                                </div>
                              </div>
                            </TableCell>
                          </TableRow>
                        )}
                      </>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductList;
