import Playlist from "../models/Playlist.js";
import Video from "../models/Video.js";
import createError from "../utils/error.js";

// Create a Playlist
export const createPlaylist = async (req, res, next) => {
  const newPlaylist = new Playlist({ userId: req.user.id, ...req.body });
  try {
    const savedPlaylist = await newPlaylist.save();
    res.status(200).json(savedPlaylist);
  } catch (err) {
    next(err);
  }
};

// Update Playlist (title, description, privacy)
export const updatePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return next(createError(404, "Playlist not found!"));
    if (req.user.id === playlist.userId) {
      const updatedPlaylist = await Playlist.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json(updatedPlaylist);
    } else {
      return next(createError(403, "You can update only your playlist!"));
    }
  } catch (err) {
    next(err);
  }
};

// Delete a Playlist
export const deletePlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return next(createError(404, "Playlist not found!"));
    if (req.user.id === playlist.userId) {
      await Playlist.findByIdAndDelete(req.params.id);
      res.status(200).json("The playlist has been deleted.");
    } else {
      return next(createError(403, "You can delete only your playlist!"));
    }
  } catch (err) {
    next(err);
  }
};

// Get a Single Playlist
export const getPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id).populate("videos");
    res.status(200).json(playlist);
  } catch (err) {
    next(err);
  }
};

// Get All Playlists of a User
export const getUserPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.find({ userId: req.params.userId });
    res.status(200).json(playlists);
  } catch (err) {
    next(err);
  }
};

// Add a Video to Playlist
export const addVideoToPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return next(createError(404, "Playlist not found!"));

    if (req.user.id === playlist.userId) {
      if (!playlist.videos.includes(req.body.videoId)) {
        playlist.videos.push(req.body.videoId);
        await playlist.save();
        res.status(200).json("Video added to the playlist.");
      } else {
        res.status(400).json("Video already exists in the playlist.");
      }
    } else {
      return next(createError(403, "You can add videos only to your playlist!"));
    }
  } catch (err) {
    next(err);
  }
};

// Remove a Video from Playlist
export const removeVideoFromPlaylist = async (req, res, next) => {
  try {
    const playlist = await Playlist.findById(req.params.id);
    if (!playlist) return next(createError(404, "Playlist not found!"));

    if (req.user.id === playlist.userId) {
      playlist.videos = playlist.videos.filter((videoId) => videoId !== req.body.videoId);
      await playlist.save();
      res.status(200).json("Video removed from the playlist.");
    } else {
      return next(createError(403, "You can remove videos only from your playlist!"));
    }
  } catch (err) {
    next(err);
  }
};
