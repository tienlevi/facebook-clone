import { Router } from "express";
import { AccessToken, Login, Register } from "../controllers/auth.js";
import Token from "../middleware/token.js";

const router = Router();

router.get("/auth", AccessToken, Token);
router.post("/register", Register);
router.post("/login", Login, Token);

export default router;
