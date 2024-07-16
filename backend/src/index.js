import express from "express";
import cors from "cors";
import morgan from "morgan";
import Connect from "./config/connect.js";
import router from "./router/router.js";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(
  cors({
    origin: ["http://localhost:3000", "https://facebooks-clonee.vercel.app"],
    methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
    preflightContinue: false,
    credentials: true,
    optionsSuccessStatus: 200,
  })
);

Connect();
app.use("/api", router);

app.listen(8080, () => {
  console.log("Server is running on port http://localhost:8080");
});
