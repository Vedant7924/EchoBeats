import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: { type: String, required: true },
  artist: { type: String, required: true },
  album: { type: String },
  genre: { type: String },
  coverImage: { type: String }, // URL
  audioUrl: { type: String, required: true }, // URL
}, { timestamps: true });

export default mongoose.model("Song", songSchema);
