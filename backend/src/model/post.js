import mongoose from "mongoose";

const Post = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    userInfo: {
      name: { type: String, require: true },
      avatar: { type: String },
    },
    title: { type: String, require: true },
    image: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const PostSchema = mongoose.model("Posts", Post);

export default PostSchema;
