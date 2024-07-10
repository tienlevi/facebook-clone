import UserSchema from "../model/user.js";

export const AccessToken = async (req, res) => {
  try {
    const user = await UserSchema.findOne({ _id: req.body._id });
    if (!user) {
      return res.status(403).json({ error: "User not found" });
    }
    return res.status(200).json({ user });
  } catch (error) {
    console.error(error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
