// auth.route.js

import { Login, Signup } from "../controllers/auth.controller.js";
import Router from 'express';
import { userVerification } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", Signup);
router.post("/login", Login);
router.post("/user-verification", userVerification);

export default router; // Exporting the router as default
