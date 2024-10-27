import PostSchema from "../model/post.js";
import UserSchema from "../model/user.js";

export const getUserById = async (req, res) => {
  try {
    const data = await UserSchema.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const updateAvatar = async (req, res) => {
  const { name, avatar } = req.body;
  try {
    const postByUserId = await PostSchema.updateMany(
      { userId: req.params.id },
      { userInfo: { name: name, avatar: avatar } }
    );
    const uploadAvatar = await UserSchema.findOneAndUpdate(
      { _id: req.params.id },
      { avatar: avatar },
      { new: true }
    );
    return res.status(200).json({ uploadAvatar, postByUserId });
  } catch (error) {
    console.log(error);
  }
};
