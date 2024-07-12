import { Router } from "express";
import { Login, Register } from "../controllers/auth.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";
import { AccessToken, RefreshToken } from "../controllers/token.js";
import { addPost, getAllPosts } from "../controllers/posts.js";

const router = Router();

router.post("/refresh-token", RefreshToken);
router.get("/auth", AuthenticateToken, AccessToken);
router.post("/register", Register);
router.post("/login", Login, AuthenticateToken);
router.get("/posts",getAllPosts)
router.post("/posts", addPost);

export default router;
