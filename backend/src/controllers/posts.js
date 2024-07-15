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
