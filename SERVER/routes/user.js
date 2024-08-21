import express from "express";
const router = express.Router();

import { signup, signin } from "../controllers/user.js";
//insert into above "googleSignIn"
router.post("/signup", signup);
router.post("/signin", signin);
//router.post("googleSignIn", googleSignIn);

export default router;