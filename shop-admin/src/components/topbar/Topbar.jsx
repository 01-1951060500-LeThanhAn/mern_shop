import { useSelector } from "react-redux";
import Menu from "../tippy/Menu";
const Topbar = () => {
  const { currentUser } = useSelector((state) => state.user);

  return (
    <>
      <div className="w-full h-16 bg-blue-600 sticky top-0 z-50">
        <div className="h-full px-5 py-0 flex justify-between items-center">
          <div className="topLeft">
            <span className="text-bold text-3xl text-white cursor-pointer">
              ThanhAn
            </span>
          </div>
          <div className="flex items-center">
            <div className="relative cursor-pointer mr-3 text-white">
              <p>{currentUser?.username}</p>
            </div>
            <Menu>
              <img
                src={
                  currentUser?.picture !== ""
                    ? currentUser?.picture
                    : `https://robohash.org/${currentUser.username}`
                }
                alt=""
                className="w-10 h-10 rounded-full cursor-pointer"
              />
            </Menu>
          </div>
        </div>
      </div>
    </>
  );
};

export default Topbar;
