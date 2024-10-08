import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserSchema from "../model/user.js";

dotenv.config();
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

export const RefreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  try {
    if (!refreshToken) {
      return res.status(401).json({ error: "Invalid refresh token" });
    }
    jwt.verify(refreshToken, process.env.JWT_REFRESH_TOKEN, (err, user) => {
      const accessToken = jwt.sign(
        { _id: user._id },
        process.env.JWT_ACCESS_TOKEN
      );
      err && console.log(err);
      return res.status(200).json({ accessToken, refreshToken });
    });
  } catch (error) {
    console.log(error);
  }
};
