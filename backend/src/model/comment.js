import mongoose from "mongoose";

const Comment = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    name: {
      type: String,
    },
    avatar: {
      type: String,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Posts",
    },
    title: { type: String, require: true },
  },
  { timestamps: true, versionKey: false }
);

const CommentSchema = mongoose.model("Comments", Comment);

export default CommentSchema;
