import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";
import playlistRoutes from "./routes/playlistRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/songs", songRoutes);
app.use("/api/playlists", playlistRoutes);

app.get("/", (req, res) => {
  res.send("EchoBeats API is running 🎵");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
