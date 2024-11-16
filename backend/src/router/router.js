import { Router } from "express";
import { Login, Register } from "../controllers/auth.js";
import AuthenticateToken from "../middleware/AuthenticateToken.js";
import { AccessToken, RefreshToken } from "../controllers/token.js";
import {
  addPost,
  deletePost,
  editPost,
  getAllPosts,
  getPostByUserId,
  likePost,
  unlikePost,
} from "../controllers/posts.js";
import {
  getUserById,
  getUsers,
  searchUsers,
  updateAvatar,
} from "../controllers/user.js";
import {
  addComment,
  deleteComment,
  editComment,
  getCommentByPostId,
} from "../controllers/comment.js";

const router = Router();

// Auth
router.post("/refresh-token", RefreshToken);
router.get("/auth", AuthenticateToken, AccessToken);
router.post("/register", Register);
router.post("/login", Login, AuthenticateToken);
// Posts
router.get("/posts", getAllPosts);
router.get("/posts/:userId", getPostByUserId);
router.post("/posts", addPost);
router.delete("/posts/:id", deletePost);
router.put("/posts/:id", editPost);
router.put("/posts/:userIdLike/like/:id", likePost);
router.put("/posts/:userIdLike/unlike/:id", unlikePost);
// User
router.get("/users", getUsers);
router.get("/user/:id", getUserById);
router.put("/user/update-avatar/:id", updateAvatar);
router.get("/search-users", searchUsers);
// Comment
router.get("/comments/:postId", getCommentByPostId);
router.post("/comments", addComment);
router.delete("/comments/:id", deleteComment);
router.put("/comments/:id", editComment);

export default router;
