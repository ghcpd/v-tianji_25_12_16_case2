import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';

const PlaylistList = () => {
  const { playlists, createPlaylist } = useMusic();
  const [newPlaylistName, setNewPlaylistName] = useState('');

  const handleCreate = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName.trim());
      setNewPlaylistName('');
    }
  };

  return (
    <div className="playlist-list">
      <h2>Playlists</h2>
      <div>
        <input
          type="text"
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          placeholder="New playlist name"
        />
        <button onClick={handleCreate}>Create</button>
      </div>
      <ul>
        {playlists.map(playlist => (
          <li key={playlist.name}>
            {playlist.name} ({playlist.tracks.length} tracks)
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlaylistList;