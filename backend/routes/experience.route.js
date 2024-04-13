// auth.route.js

import Router from 'express';
import { CreateExperience, ListExperience, ListExperienceById, RemoveExperienceById } from "../controllers/experience.controller.js";

const router = Router();

router.post("/add", CreateExperience);
router.get("/list", ListExperience);
router.get("/Single-experience/:id", ListExperienceById);
router.delete("/Remove-Single-experience/:id", RemoveExperienceById);


export default router; // Exporting the router as default
