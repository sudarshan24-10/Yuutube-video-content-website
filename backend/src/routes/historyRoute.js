import { verifyToken } from "../utils/verifyToken.js";
import express from "express";
import {addToHistory,getWatchHistory} from "../controller/historyController.js";

const router = express.Router();

router.post('/storeHistory',verifyToken,addToHistory);
router.get('/getHistory',verifyToken,getWatchHistory);

export default router;