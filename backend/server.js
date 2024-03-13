import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import mongoose from 'mongoose';
import videoRoute from "./src/routes/videoRoute.js";
import authRoute from "./src/routes/authRoute.js";
import bodyParser from 'body-parser';
import userRoute from "./src/routes/userRoute.js";
import commentsRoute from "./src/routes/commentsRoute.js";
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

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);

  
  // Serve static files from the build directory
  app.use(express.static(path.join(__dirname, 'frontend/build')));
  
  // Define your API routes here
  
  // For any other requests, serve the frontend index.html file
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'frontend/build/index.html'));
  });

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server listening on address http://localhost:${PORT}`);
});
