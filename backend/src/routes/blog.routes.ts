import { Router } from "express";
import {
  createBlog,
  getAllBlogs,
  getBlog,
} from "../controllers/blogController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/create", authMiddleware, createBlog);
router.get("/get/:blogId", authMiddleware, getBlog);
router.get("/all", authMiddleware, getAllBlogs);

export default router;
