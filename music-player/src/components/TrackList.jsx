import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';

const TrackList = ({ album }) => {
  const { playTrack, toggleFavorite, isFavorite, addToPlaylist, playlists } = useMusic();
  const [playlistName, setPlaylistName] = useState('');

  const handleAddToPlaylist = (track) => {
    if (playlistName.trim()) {
      addToPlaylist(playlistName.trim(), track);
      setPlaylistName('');
    }
  };

  return (
    <div className="track-list">
      <h3>{album.title} - Tracks</h3>
      <ul>
        {album.tracks.map(track => (
          <li key={track.id} className="track-item">
            <button onClick={() => playTrack(track)}>Play</button>
            <span>{track.title} - {track.duration}</span>
            <button onClick={() => toggleFavorite(track)}>
              {isFavorite(track.id) ? '❤️' : '🤍'}
            </button>
            <select value={playlistName} onChange={(e) => setPlaylistName(e.target.value)}>
              <option value="">Select Playlist</option>
              {playlists.map(p => <option key={p.name} value={p.name}>{p.name}</option>)}
            </select>
            <button onClick={() => handleAddToPlaylist(track)}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TrackList;