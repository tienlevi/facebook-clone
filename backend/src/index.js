import express from "express";
import cors from "cors";
import morgan from "morgan";
import Connect from "./config/connect.js";
import router from "./router/router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
const allowedOrigins = [
  "http://localhost:3000",
  "https://facebooks-clonee.vercel.app",
];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

Connect();
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080");
});
