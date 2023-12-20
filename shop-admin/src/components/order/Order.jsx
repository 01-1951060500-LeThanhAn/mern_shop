import Sidebar from "../sidebar/Sidebar";
import Stripe from "stripe";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
const stripe = new Stripe(
  "sk_test_51JsT6lDhEfGrbNnM2H7bWwBqLm3ZsoMD3AOr5iLLrl6bXb0BOmmEZGOq2hTPF6ZtZIm7jzvl5KisMm5bJCVEryxu008PnLP1EY"
);

const Order = () => {
  const [charges, setCharges] = useState([]);

  useEffect(() => {
    async function fetchCharges() {
      const charges = await stripe.charges.list({ limit: 100, status: "paid" });
      console.log(charges.data);
      setCharges(charges.data);
    }
    fetchCharges();
  }, []);

  return (
    <>
      <div className="flex items-center">
        <div className="fixed top-0 bg-white">
          <Sidebar />
        </div>
        <div className="mb-8 ml-48 mr-8 pr-4 mt-4 pl-6 w-full py-4 shadow-sm shadow-slate-500/50 bg-slate-100">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>No</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Địa chỉ</TableCell>
                  <TableCell>Mã đơn hàng</TableCell>

                  <TableCell>Trạng thái đơn hàng</TableCell>
                  <TableCell>Ngày mua</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {charges &&
                  charges.map((row, index) => (
                    <>
                      <TableRow
                        key={row._id}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {index + 1}
                        </TableCell>
                        <TableCell>{row?.source.name}</TableCell>
                        <TableCell>{row?.source.address_country}</TableCell>

                        <TableCell>{row.id}</TableCell>
                        <TableCell>
                          <p className="bg-[#DCFCE7] w-[90px] rounded-lg px-2 py-1 text-[#496734]">
                            {row?.status}
                          </p>
                        </TableCell>
                        <TableCell>
                          {new Date(row?.created * 1000).toLocaleString(
                            "en-US"
                          )}
                        </TableCell>
                      </TableRow>
                    </>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </>
  );
};

export default Order;
