import mongoose from "mongoose";

const User = new mongoose.Schema(
  {
    name: { type: String, require: true },
    email: { type: String, require: true },
    tel: { type: String, require: true },
    password: { type: String, require: true, minlength: 6 },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dbjkk9wg0/image/upload/v1720775882/facebook-posts/xo41kgbhyxjfbdmfq4n6.png",
    },
  },
  { timestamps: true, versionKey: false }
);

const UserSchema = mongoose.model("Users", User);

export default UserSchema;
