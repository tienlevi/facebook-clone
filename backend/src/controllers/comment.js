import CommentSchema from "../model/comment.js";

export const getCommentByPostId = async (req, res) => {
  try {
    const data = await CommentSchema.find({ postId: req.params.postId });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const addComment = async (req, res) => {
  try {
    const data = await CommentSchema.create(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deleteComment = async (req, res) => {
  try {
    const data = await CommentSchema.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
