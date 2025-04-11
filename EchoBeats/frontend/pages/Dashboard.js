import React, { useEffect, useState, useContext } from "react";
import API from "../api";
import SongList from "../components/SongList";
import PlaylistManager from "../components/PlaylistManager";
import { AuthContext } from "../context/AuthContext";

function Dashboard() {
  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const res = await API.get("/songs");
        setSongs(res.data);
      } catch (err) {
        console.error("Error fetching songs", err);
      }
    };

    const fetchPlaylists = async () => {
      try {
        const res = await API.get("/playlists");
        setPlaylists(res.data);
      } catch (err) {
        console.error("Error fetching playlists", err);
      }
    };

    fetchSongs();
    fetchPlaylists();
  }, []);

  return (
    <div className="dashboard">
      <h2>Welcome, {user?.username} 🎧</h2>
      <div className="dashboard-content">
        <SongList songs={songs} />
        <PlaylistManager playlists={playlists} refreshPlaylists={() => {
          API.get("/playlists").then(res => setPlaylists(res.data));
        }} />
      </div>
    </div>
  );
}

export default Dashboard;
