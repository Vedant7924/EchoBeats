import React from "react";

function SongList({ songs }) {
  return (
    <div className="song-list">
      <h3>Available Songs</h3>
      <ul>
        {songs.map((song) => (
          <li key={song._id}>
            <strong>{song.title}</strong> by {song.artist}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SongList;
