import History from "../models/History.js";


export const getWatchHistory = async (req, res, next) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const history = await History.find({ userId }).populate("videoId");

    const videoData = history
      .filter(item => item.videoId !== null)
      .sort((a, b) => b.watchedAt - a.watchedAt) 
      .map(item => item.videoId);

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
  
  