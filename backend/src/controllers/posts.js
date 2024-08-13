import PostSchema from "../model/post.js";

export const getAllPosts = async (req, res) => {
  try {
    const data = await PostSchema.find(req.body);
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
  const {
    like: { name, avatar, userIdLike },
  } = req.body;

  try {
    const data = await PostSchema.findOne({ _id: req.params.id });
    const userLiked = data.like.users.some(
      (item) => item.userIdLike == userIdLike
    );
    if (userLiked) {
      return res.status(402).json({ message: "You are liked this post" });
    } else {
      data.like.count += 1;
      data.like.users.push({
        userIdLike: userIdLike,
        name: name,
        avatar: avatar,
      });
    }
    await data.save();
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
