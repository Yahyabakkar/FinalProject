import express from "express";
import {
  getUser,
updateUser,
  loginUser,
  getAllUser,
  deleteUser
} from "../controllers/userController.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", getAllUser );
router.get("/:id", getUser);

//Delete 
router.delete('/users/:id', deleteUser);


/* UPDATE */
router.patch("/:id", verifyToken,updateUser);
router.post("/login", loginUser);

export default router;