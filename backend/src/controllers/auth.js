import Joi from "joi";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import UserSchema from "../model/user.js";

dotenv.config();

const SignUpValidate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  tel: Joi.string().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).valid(Joi.ref("password")),
  avatar: Joi.string(),
});

const SignInValidate = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = SignUpValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const exist = await UserSchema.findOne({ email });
    if (exist) {
      return res.status(401).json({ message: "Email already exist" });
    }
    const hashedPassword = await bcryptjs.hash(password, 6);
    const data = await UserSchema.create({
      ...req.body,
      password: hashedPassword,
    });
    return res.status(200).json(data);
  } catch (error) {
    console.log(error);
  }
};

export const Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = SignInValidate.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((err) => err.message);
      return res.status(400).json(errors);
    }
    const user = await UserSchema.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Email is not exist" });
    }
    const isMatch = await bcryptjs.compare(password, user.password);
    if (!isMatch) {
      return res.status(402).json({ message: "password incorrect" });
    }
    const accessToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_ACCESS_TOKEN,
      {
        expiresIn: "30s",
      }
    );
    const refreshToken = jwt.sign(
      { _id: user._id },
      process.env.JWT_REFRESH_TOKEN
    );
    return res.status(200).json({
      message: "Login success",
      user,
      accessToken: accessToken,
      refreshToken: refreshToken,
    });
  } catch (error) {
    console.log(error);
  }
};
