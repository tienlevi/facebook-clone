import { Router } from "express";
import { Login, Register } from "../controllers/auth.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";
import { AccessToken, RefreshToken } from "../controllers/token.js";

const router = Router();

router.post("/refresh-token", RefreshToken);
router.get("/auth", AuthenticateToken, AccessToken);
router.post("/register", Register);
router.post("/login", Login, AuthenticateToken);

export default router;
