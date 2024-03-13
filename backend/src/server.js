import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from 'mongoose';
import videoRoute from "./routes/videoRoute.js";
import authRoute from "./routes/authRoute.js";
import bodyParser from 'body-parser';
import userRoute from "./routes/userRoute.js";
import commentsRoute from "./routes/commentsRoute.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();


  mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Connect to DB");
  }).catch((err)=>{
    console.log(err);
    res.status(err.status).send(err.message)
  });

  const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true, // Allow credentials (cookies)
  };
  
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(bodyParser.json()); 
app.use((err, req, res, next) => {
    console.log(err)
    res.status(err.status).send(err.message);
  });
  app.use("/api/video",videoRoute);
  app.use("/api/auth",authRoute);
  app.use("/api/users",userRoute);
  app.use("/api/comments",commentsRoute)

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening on address http://localhost:${PORT}`);
});
