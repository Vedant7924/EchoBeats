import express from "express";
import {
  createPlaylist,
  getUserPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  deletePlaylist,
} from "../controllers/playlistController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(protect, createPlaylist).get(protect, getUserPlaylists);
router.route("/add-song").put(protect, addSongToPlaylist);
router.route("/remove-song").put(protect, removeSongFromPlaylist);
router.route("/:id").delete(protect, deletePlaylist);

export default router;
