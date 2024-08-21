import express from "express";
const router = express.Router();
import auth from "../middlewares/auth.js";

import { createTour, getTour, getTours, getToursByUser } from "../controllers/tour.js";
router.post("/", createTour);
router.get("/", getTours);
router.get("/:id", getTour);
router.get("/userTours/:id", getToursByUser);

export default router;