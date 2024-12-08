import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import {
  userRegister,
  userLogin,
  userLogout,
  userDetails,
} from "../controllers/userController";

const router = Router();

// Public routes
router.post("/register", userRegister);
router.post("/login", userLogin);

// Protected routes
router.get("/logout", authMiddleware, userLogout);
router.get("/details", authMiddleware, userDetails);

export default router;
