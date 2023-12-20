import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { getAllProducts } from "../../api/products.js";
import { Link } from "react-router-dom";
export default function WidgetSm() {
  const [products, setProducts] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetAllProducts = async () => {
      try {
        const res = await getAllProducts();
        setProducts(res.data?.results);
      } catch (error) {
        console.log(error);
      }
    };

    fetAllProducts();
  }, []);

  return (
    <div className="mb-8 pr-4 pl-6 w-full py-4 shadow-sm shadow-slate-500/50 bg-white">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold mb-5">Products</h3>
        <div className="text-lg bg-blue-500 text-white px-3 py-2 font-semibold mb-5">
          <Link to={`/products`}>
            {" "}
            <button>View All</button>
          </Link>
        </div>
      </div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>No</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Image</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Color</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products &&
              products.slice(0, 10).map((row, index) => (
                <>
                  {row._id !== currentUser._id && (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                    </TableRow>
                  )}
                </>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
