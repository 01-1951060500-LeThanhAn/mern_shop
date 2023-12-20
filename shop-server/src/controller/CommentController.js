import Comments from "../models/CommentModel.js";

const postComments = async (req, res) => {
  try {
    const comments = new Comments({
      ...req.body,
    });
    await comments.save();
    const newComment = await Comments.findOne({ _id: comments._id }).populate(
      "userId"
    );

    res.status(200).json({
      success: true,
      results: newComment,
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getComment = async (req, res) => {
  const postId = req.params.id;
  try {
    const comments = await Comments.find({ postId }).populate("userId");
    res.status(200).json({
      success: true,
      results: comments,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server not found!",
    });
  }
};

const deleteComment = async (req, res) => {
  const _id = req.params.id;

  try {
    const deleteComment = await Comments.findByIdAndDelete({ _id });
    if (deleteComment) {
      res.status(200).json("Delete comment success");
    }
  } catch (error) {
    res.status(500).json("Delete comment failed");
  }
};

export { postComments, getComment, deleteComment };
