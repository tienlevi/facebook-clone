import express from "express";
import cors from "cors";
import morgan from "morgan";
import Connect from "./config/connect.js";
import router from "./router/router.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

Connect();
app.use("/api", cors(), router);

app.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080");
});
