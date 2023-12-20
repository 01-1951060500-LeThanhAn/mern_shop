import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import { useSelector } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { deleteCommentApi } from "../api/comment";
import { toast } from "react-toastify";
const ReviewItem = ({ item, listComment, setListComment }) => {
  const { currentUser } = useSelector((state) => state.user);

  const handleDeleteComment = async (id) => {
    if (window.confirm("Bạn có chắc chắn xóa comment không?")) {
      await deleteCommentApi(id);
      setListComment(listComment.filter((idComment) => idComment._id !== id));
      toast.success("Xóa comment thành công");
    }
  };

  return (
    <>
      <div className="mb-14">
        <div className="flex items-center justify-between">
          <div className="flex justify-start relative">
            <div className="mt-2">
              <img
                className="w-12 h-12 object-cover rounded-full"
                src={
                  item?.userId?.picture || `https://i.stack.imgur.com/QLyI4.png`
                }
                alt=""
              />
            </div>
            <div>
              <div className=" cursor-pointer ml-3 relative bg-slate-300  px-3 py-3 w-auto rounded-xl">
                <div className="flex items-center ">
                  <p className="font-semibold text-md">
                    {item?.userId?.username}
                  </p>
                  <p className="pl-2 text-slate-500">
                    {new Date(item?.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p>{item?.comment}</p>
              </div>
            </div>

            <div
              className="absolute left-16 cursor-pointer font-semibold -bottom-6 text-sm"
              //   className={`absolute ${
              //     isLiked ? "text-blue-600" : "text-slate-500"
              //   }  left-16 cursor-pointer font-semibold -bottom-6 text-sm `}
            >
              Thích
            </div>
            <div className="absolute left-28 cursor-pointer font-semibold -bottom-6 text-sm text-slate-500">
              Reply
            </div>
            <div className="absolute -right-4 cursor-pointer font-semibold -bottom-4 text-sm text-slate-500">
              <div className="bg-slate-200 flex items-center px-2 py-1 rounded-xl">
                <div className="text-xl">
                  <ThumbUpIcon />
                </div>
                <p className="text-md ml-2">{0}</p>
              </div>
            </div>
          </div>

          {currentUser._id === item?.userId?._id ? (
            <>
              <div
                onClick={() => handleDeleteComment(item._id)}
                className="text-2xl cursor-pointer text-blue-600"
              >
                <DeleteIcon />
              </div>
            </>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default ReviewItem;
