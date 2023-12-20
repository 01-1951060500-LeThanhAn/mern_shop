import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
} from "@mui/icons-material";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="flex-1 h-[100vh]  sticky top-[50px]">
      <div className="p-5 text-blue-500">
        <div className="mb-[10px]">
          <h3 className="text-lg">Dashboard</h3>
          <ul className="p-[5px]">
            <Link to="/" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-md active">
                <LineStyle className="mr-[5px] text-xl" />
                Home
              </li>
            </Link>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <Timeline className="mr-[5px] text-xl" />
              Analytics
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <TrendingUp className="mr-[5px] text-xl" />
              Sales
            </li>
          </ul>
        </div>
        <div className="mb-[10px]">
          <h3 className="text-sm text-blue-500">Quick Menu</h3>
          <ul className="p-[5px]">
            <Link to="/users" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-md">
                <PermIdentity className="mr-[5px] text-xl" />
                Users
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="p-[5px] cursor-pointer flex items-center rounded-md">
                <Storefront className="mr-[5px] text-xl" />
                Products
              </li>
            </Link>
            <Link to={`/order`}>
              <li className="p-[5px] cursor-pointer flex items-center rounded-md">
                <AttachMoney className="mr-[5px] text-xl" />
                Orders
              </li>
            </Link>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <BarChart className="mr-[5px] text-xl" />
              Reports
            </li>
          </ul>
        </div>
        <div className="mb-[10px]">
          <h3 className="text-sm text-blue-500">Notifications</h3>
          <ul className="p-[5px]">
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <MailOutline className="mr-[5px] text-xl" />
              Mail
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <DynamicFeed className="mr-[5px] text-xl" />
              Feedback
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <ChatBubbleOutline className="mr-[5px] text-xl" />
              Messages
            </li>
          </ul>
        </div>
        <div className="mb-[10px]">
          <h3 className="text-sm text-blue-500">Staff</h3>
          <ul className="p-[5px]">
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <WorkOutline className="mr-[5px] text-xl" />
              Manage
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <Timeline className="mr-[5px] text-xl" />
              Analytics
            </li>
            <li className="p-[5px] cursor-pointer flex items-center rounded-md">
              <Report className="mr-[5px] text-xl" />
              Reports
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
