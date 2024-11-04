import PostSchema from "../model/post.js";
import UserSchema from "../model/user.js";

export const getAllPosts = async (req, res) => {
  try {
    const limit = parseInt(req.query.limit);
    const page = parseInt(req.query.page);
    const posts = await PostSchema.find(req.body)
      .limit(limit)
      .skip((page - 1) * limit);
    return res.status(200).json({ limit, page, posts });
  } catch (error) {
    console.log(error);
  }
};

export const getPostByUserId = async (req, res) => {
  try {
    const data = await PostSchema.find({ userId: req.params.userId });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const addPost = async (req, res) => {
  try {
    const data = await PostSchema.create(req.body);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = async (req, res) => {
  try {
    const data = await PostSchema.findByIdAndDelete({ _id: req.params.id });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const editPost = async (req, res) => {
  try {
    const data = await PostSchema.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const likePost = async (req, res) => {
  try {
    const user = await UserSchema.findById({ _id: req.params.userIdLike });
    const data = await PostSchema.findOne({ _id: req.params.id });
    const userLiked = data.like.users.some(
      (item) => item.userIdLike == req.params.userIdLike
    );

    if (userLiked) {
      return res.status(402).json({ message: "You are liked this post" });
    } else {
      data.like.count += 1;
      data.like.users.push({
        userIdLike: req.params.userIdLike,
        name: user.name,
        avatar: user.avatar,
      });
    }

    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const unlikePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userIdLike = req.params.userIdLike;
    const data = await PostSchema.findOne({ _id: postId });
    const userLiked = data.like.users.some(
      (item) => item.userIdLike.toString() === userIdLike
    );
    if (!userLiked) {
      return res.status(402).json({ message: "You have not liked this post" });
    }
    data.like.count -= 1;
    data.like.users = data.like.users.filter(
      (item) => item.userIdLike.toString() !== userIdLike
    );

    await data.save();

    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
