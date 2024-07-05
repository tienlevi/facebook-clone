import { Router } from "express";
import { getUser, Login, Register } from "../controllers/auth.js";

const router = Router();

router.get("/auth", getUser);
router.post("/register", Register);
router.post("/login", Login);

export default router;
