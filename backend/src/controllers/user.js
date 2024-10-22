import UserSchema from "../model/user.js";

export const getUserById = async (req, res) => {
  try {
    const data = await UserSchema.findById(req.params.id);
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};
