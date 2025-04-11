import React, { useState } from "react";
import API from "../api";

function PlaylistManager({ playlists, refreshPlaylists }) {
  const [newPlaylistName, setNewPlaylistName] = useState("");

  const createPlaylist = async (e) => {
    e.preventDefault();
    try {
      await API.post("/playlists", { name: newPlaylistName });
      setNewPlaylistName("");
      refreshPlaylists();
    } catch (err) {
      console.error("Error creating playlist", err);
    }
  };

  return (
    <div className="playlist-manager">
      <h3>Your Playlists</h3>
      <form onSubmit={createPlaylist}>
        <input
          type="text"
          placeholder="New Playlist Name"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          required
        />
        <button type="submit">Create</button>
      </form>
      <ul>
        {playlists.map((playlist) => (
          <li key={playlist._id}>{playlist.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PlaylistManager;
