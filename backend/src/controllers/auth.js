import Joi from "joi";
import bcryptjs from "bcryptjs";
import UserSchema from "../model/user.js";

const validate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.string().min(6).valid(Joi.ref("password")),
  avatar: Joi.string(),
});

export const Register = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { error } = validate.validate(req.body, { abortEarly: false });
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
