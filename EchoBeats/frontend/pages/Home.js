import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button"; // Adjust import if needed
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const navigate = useNavigate();

  const api = import.meta.env.VITE_API_BASE_URL || process.env.REACT_APP_API_BASE_URL;

  // Get JWT token from localStorage
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchSongs();
    fetchPlaylists();
  }, []);

  const fetchSongs = async () => {
    try {
      const res = await axios.get(`${api}/songs`);
      setSongs(res.data);
    } catch (err) {
      console.error("Error fetching songs:", err);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const res = await axios.get(`${api}/playlists`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPlaylists(res.data);
    } catch (err) {
      console.error("Error fetching playlists:", err);
    }
  };

  const handleAddToPlaylist = async (songId) => {
    if (!selectedPlaylist) return alert("Select a playlist first!");

    try {
      await axios.post(
        `${api}/playlists/${selectedPlaylist}/add`,
        { songId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Song added to playlist!");
    } catch (err) {
      console.error("Error adding to playlist:", err);
    }
  };

  return (
    <div className="p-6">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-indigo-600">🎵 EchoBeats</h1>
        <p className="text-gray-600 mt-2">Stream music. Create playlists. Vibe anytime.</p>
      </div>

      <div className="flex items-center gap-4 mb-6">
        <select
          className="border p-2 rounded-md"
          value={selectedPlaylist}
          onChange={(e) => setSelectedPlaylist(e.target.value)}
        >
          <option value="">Select Playlist</option>
          {playlists.map((pl) => (
            <option key={pl._id} value={pl._id}>
              {pl.name}
            </option>
          ))}
        </select>
        <Button onClick={() => navigate("/create-playlist")}>+ New Playlist</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {songs.map((song) => (
          <div
            key={song._id}
            className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition duration-200"
          >
            <h2 className="text-lg font-semibold">{song.title}</h2>
            <p className="text-gray-500">{song.artist}</p>
            <p className="text-sm text-gray-400">{song.genre}</p>
            <Button
              className="mt-3 w-full"
              onClick={() => handleAddToPlaylist(song._id)}
            >
              ➕ Add to Playlist
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
