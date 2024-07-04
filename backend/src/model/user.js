import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    avatar: { type: String },
  },
  { timestamps: true, versionKey: false }
);

const UserSchema = mongoose.model("Users", User);

export default UserSchema;
