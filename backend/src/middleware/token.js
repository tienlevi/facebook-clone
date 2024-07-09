import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

function Token(req, res, next) {
  const headers = req.headers["authorization"];
  const token = headers && headers.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Error" });
  }
  jwt.verify(token, process.env.JWT_ACCESS_TOKEN, (err, body) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.body = body;
    next();
  });
}

export default Token;
