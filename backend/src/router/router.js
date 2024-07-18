import { Router } from "express";
import { Login, Register } from "../controllers/auth.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";
import { AccessToken, RefreshToken } from "../controllers/token.js";
import {
  addPost,
  deletePost,
  editPost,
  getAllPosts,
} from "../controllers/posts.js";

const router = Router();

// Auth
router.post("/refresh-token", RefreshToken);
router.get("/auth", AuthenticateToken, AccessToken);
router.post("/register", Register);
router.post("/login", Login, AuthenticateToken);
// Posts
router.get("/posts", getAllPosts);
router.post("/posts", addPost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", editPost);

export default router;
