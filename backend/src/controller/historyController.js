import History from "../models/History.js";


export const getWatchHistory = async (req, res, next) => {
    try {
      const userId = req.user.id;
      console.log(userId);
      const history = await History.find({ userId }).populate("videoId");
      const videoData = history
    .map(item => item.videoId)
    .filter(video => video !== null);
      res.status(200).json(videoData);
    } catch (err) {
      next(err);
    }
  };

export const addToHistory = async (req, res, next) => {
    try {
      const { userId, videoId } = req.body;
  
      await History.findOneAndUpdate(
        { userId, videoId },
        { watchedAt: new Date()},
        { upsert: true, new: true }
      );
  
      res.status(200).json({ message: "History updated" });
    } catch (err) {
      next(err);
    }
  };
  
  