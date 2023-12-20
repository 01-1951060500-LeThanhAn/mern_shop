import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import SideBar from "../../components/sidebar/Sidebar";
import { BASE_URL } from "../../api";
import { toast } from "react-toastify";
import axios from "axios";
import { getAllUsers } from "../../api/user";
export default function UserList() {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
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

  const handleDeleteUser = async (id) => {
    if (window.confirm("Bạn có muốn xóa người dùng này ?")) {
      const token = JSON.parse(localStorage.getItem("tokenAdmmin"));
      try {
        const res = await axios.delete(`${BASE_URL}/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res.data);
        setUsers(users.filter((item) => item._id !== id));
        return toast.success("Xóa người dùng thành công");
      } catch (error) {
        toast.error("Xóa người dùng thất bại");
        console.log(error);
      }
    }
  };

  return (
    <>
      <div className="flex items-center">
        <div className="fixed top-0 bg-white ">
          <SideBar />
        </div>
        <div className="mb-8 ml-48 mr-8 pr-4 mt-4 pl-6 w-full py-4 shadow-sm shadow-slate-500/50 bg-slate-100">
          <h3 className=" font-bold mb-5 text-3xl">Người dùng</h3>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Số thứ tự</TableCell>
                  <TableCell>Avatar</TableCell>
                  <TableCell>Tên</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>Ngày</TableCell>
                  <TableCell>Hành động</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {users.map((row, index) => (
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
                        <TableCell>
                          <img
                            className="w-12 text-center h-12 rounded-full object-cover"
                            src={
                              row?.picture === ""
                                ? "https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg"
                                : row?.picture
                            }
                            alt=""
                          />
                        </TableCell>
                        <TableCell>{row.username}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>
                          {new Date(row.createdAt).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <div
                            onClick={() => handleDeleteUser(row._id)}
                            className="text-red-500 ml-6 cursor-pointer"
                          >
                            <DeleteIcon />
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
    </>
  );
}
