import { Router } from "express";
import { getUser, Register } from "../controllers/auth.js";

const router = Router();

router.get("/auth", getUser);
router.post("/register", Register);

export default router;
