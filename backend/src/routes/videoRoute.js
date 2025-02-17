import express from "express";
import { addVideo, addView, getTitles, getByTag, getVideo, random, search, sub, trend } from "../controller/videoController.js";
import { verifyToken } from "../utils/verifyToken.js"

const router = express.Router();

//create a video
router.post("/", verifyToken, addVideo)
router.put("/:id", verifyToken, addVideo)
router.delete("/:id", verifyToken, addVideo)
router.get("/find/:id", getVideo)
router.put("/view/:id", addView)
router.get("/trend", trend)
router.get("/random", random)
router.get("/sub",verifyToken, sub)
router.get("/tags", getByTag)
router.get("/search", search)
router.get("/titles",getTitles);
router.get("/trend", trend);

export default router;