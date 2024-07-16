import express from "express";
import cors from "cors";
import morgan from "morgan";
import Connect from "./config/connect.js";
import router from "./router/router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

Connect();
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080");
});
