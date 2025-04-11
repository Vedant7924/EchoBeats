import express from "express";
import {
  createSong,
  getAllSongs,
  getSongById,
  updateSong,
  deleteSong,
} from "../controllers/songController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/")
  .get(getAllSongs)
  .post(protect, createSong); // Protected route

router.route("/:id")
  .get(getSongById)
  .put(protect, updateSong)
  .delete(protect, deleteSong);

export default router;
