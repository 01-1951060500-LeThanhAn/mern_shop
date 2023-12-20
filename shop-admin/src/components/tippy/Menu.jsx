import "tippy.js/dist/tippy.css";
import Tippy from "@tippyjs/react/headless";
import { AiOutlineProfile } from "react-icons/ai";
import { IoLogOutOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const Menu = ({ children }) => {
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const handeLogOut = () => {
    if (window.confirm("Bnạ có chắc chắn đăng xuất không")) {
      localStorage.removeItem("tokenAdmmin");
      localStorage.removeItem("admin");
      navigate("/login");
    }
  };
  return (
    <Tippy
      interactive
      hideOnClick={false}
      delay={[0, 700]}
      offset={[12, 8]}
      placement="bottom-end"
      render={(attrs) => (
        <div
          className="bg-white shadow-xl text-black p-3 rounded-lg"
          tabIndex="-1"
          {...attrs}
        >
          <div className="">
            <div className="flex items-center">
              <div className="logo text-xl">
                <AiOutlineProfile />
              </div>
              <div className="ml-2">{currentUser?.email}</div>
            </div>

            <div onClick={handeLogOut} className="flex items-center mt-2">
              <div className="logo text-xl">
                <IoLogOutOutline />
              </div>
              <div className="ml-2">LogOut</div>
            </div>
          </div>
        </div>
      )}
    >
      {children}
    </Tippy>
  );
};

export default Menu;
