import mongoose from "mongoose";

const userLikePost = new mongoose.Schema({
  userIdLike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    require: true,
  },
  name: { type: String, require: true },
  avatar: { type: String, require: true },
});

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
    like: {
      count: { type: Number, default: 0 },
      users: [userLikePost],
    },
    publicId: { type: String },
    title: { type: String, require: true },
    fileSrc: { type: String },
    fileType: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const PostSchema = mongoose.model("Posts", Post);

export default PostSchema;
