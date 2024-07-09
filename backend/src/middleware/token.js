import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function Token(req, res, next) {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Error" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    return res.status(200).json(user);
  });
  next();
}

export default Token;
