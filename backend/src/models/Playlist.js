import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      index: true, // Index for faster lookups
    },
    title: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    videos: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Video",
      default: [],
    },
    isPrivate: {
      type: Boolean,
      default: false, // false = Public, true = Private
    },
  },
  { timestamps: true }
);

export default mongoose.model("Playlist", PlaylistSchema);
