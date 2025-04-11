import Playlist from "../models/Playlist.js";

// Create a new playlist
export const createPlaylist = async (req, res) => {
  const { name, description, songs } = req.body;
  try {
    const playlist = await Playlist.create({
      name,
      description,
      user: req.user._id,
      songs,
    });
    res.status(201).json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get all playlists for a user
export const getUserPlaylists = async (req, res) => {
  try {
    const playlists = await Playlist.find({ user: req.user._id }).populate("songs");
    res.status(200).json(playlists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add song to a playlist
export const addSongToPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    if (!playlist.songs.includes(songId)) {
      playlist.songs.push(songId);
      await playlist.save();
    }

    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove song from a playlist
export const removeSongFromPlaylist = async (req, res) => {
  const { playlistId, songId } = req.body;
  try {
    const playlist = await Playlist.findById(playlistId);
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    playlist.songs = playlist.songs.filter((id) => id.toString() !== songId);
    await playlist.save();

    res.status(200).json(playlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Delete playlist
export const deletePlaylist = async (req, res) => {
  try {
    const playlist = await Playlist.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });
    if (!playlist) return res.status(404).json({ message: "Playlist not found" });

    res.json({ message: "Playlist deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
