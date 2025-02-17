import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from 'mongoose';
import videoRoute from "./src/routes/videoRoute.js";
import authRoute from "./src/routes/authRoute.js";
import userRoute from "./src/routes/userRoute.js";
import commentsRoute from "./src/routes/commentsRoute.js";
import historyRoute from "./src/routes/historyRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from 'path';

dotenv.config();

const app = express();

const corsOptions = {
  credentials: true, // Allow credentials (cookies)
};


app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(morgan('dev'))

mongoose.connect(process.env.MONGODB_URI).then(() => {
  console.log("Connected to DB");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit the process on connection error
});


// API routes
app.use("/api/videos", videoRoute);
app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/comments", commentsRoute);
app.use("/api/history", historyRoute);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).send(err.message || "Internal Server Error");
});

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server listening on address http://localhost:${PORT}`);
});
