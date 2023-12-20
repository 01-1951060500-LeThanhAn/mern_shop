import SendIcon from "@mui/icons-material/Send";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getCommentApi, postCommentApi } from "../api/comment";
import { useSelector } from "react-redux";
import ReviewItem from "../components/ReviewItem";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
const Reviews = ({ id }) => {
  const [listComment, setListComment] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePostComment = async (e, comm) => {
    e.preventDefault();
    if (!text.trim()) return toast.warn("Vui lòng không bỏ trống");
    setLoading(true);

    try {
      const res = await postCommentApi(comm);

      if (res.data.success) {
        setListComment([res.data.results, ...listComment]);
      }
      setText("");
      setLoading(false);
    } catch (error) {
      console.log(error);
      toast.error("Thêm comment thất bại!");
    }
  };

  const fetchComments = async (commentId) => {
    try {
      const res = await getCommentApi(commentId);
      // console.log(res.data);
      if (res.data.success) {
        setListComment(res.data.results);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchComments(id);
  }, [id]);

  return (
    <>
      <div className="mx-6 lg:mx-36 2xl:mx-44 my-8">
        <p className="font-bold text-lg">Đánh giá sản phẩm của khách hàng</p>
        {currentUser ? (
          <div className="w-full border relative border-blue-600 py-2 px-3 mt-6">
            <form
              onSubmit={(e) =>
                handlePostComment(e, {
                  postId: id,
                  userId: currentUser._id,
                  comment: text,
                })
              }
            >
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full py-1 outline-none"
                type="text"
                placeholder="Thêm nhận xét..."
              />
              {loading ? (
                <div className="absolute right-3 cursor-pointer top-1">
                  <Box sx={{ display: "flex" }}>
                    <CircularProgress />
                  </Box>
                </div>
              ) : (
                <button className="absolute right-3 cursor-pointer top-2">
                  <SendIcon />
                </button>
              )}
            </form>
          </div>
        ) : (
          <p className="mt-4 text-xl">
            Bạn cần{" "}
            <Link to={`/login`} className="text-blue-600">
              đăng nhập{" "}
            </Link>{" "}
            để đánh giá
          </p>
        )}

        <div className="mt-8">
          {listComment.length > 0 ? (
            listComment.map((item) => (
              <ReviewItem
                listComment={listComment}
                setListComment={setListComment}
                key={item._id}
                item={item}
              />
            ))
          ) : (
            <>
              <div className="text-center text-2xl">Chưa có nhận xét nào!</div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
