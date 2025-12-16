import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import './PlaylistManager.css';

export const PlaylistManager = () => {
  const {
    playlists,
    createPlaylist,
    deletePlaylist,
    getPlaylistTracks,
    removeTrackFromPlaylist,
    playTrack
  } = useMusic();
  const [newPlaylistName, setNewPlaylistName] = useState('');
  const [expandedPlaylist, setExpandedPlaylist] = useState(null);

  const handleCreatePlaylist = () => {
    if (newPlaylistName.trim()) {
      createPlaylist(newPlaylistName);
      setNewPlaylistName('');
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="playlist-manager">
      <h2>Playlists</h2>
      
      <div className="create-playlist" data-testid="create-playlist">
        <input
          type="text"
          placeholder="New playlist name..."
          value={newPlaylistName}
          onChange={(e) => setNewPlaylistName(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleCreatePlaylist()}
          data-testid="playlist-input"
        />
        <button onClick={handleCreatePlaylist} data-testid="create-btn">
          Create
        </button>
      </div>

      <div className="playlists-list">
        {playlists.length === 0 ? (
          <p className="empty-message">No playlists yet</p>
        ) : (
          playlists.map(playlist => {
            const tracks = getPlaylistTracks(playlist.id);
            const isExpanded = expandedPlaylist === playlist.id;
            
            return (
              <div
                key={playlist.id}
                className="playlist-item"
                data-testid={`playlist-${playlist.id}`}
              >
                <div
                  className="playlist-header"
                  onClick={() => setExpandedPlaylist(isExpanded ? null : playlist.id)}
                >
                  <div className="playlist-info">
                    <h3>{playlist.name}</h3>
                    <p className="track-count">{tracks.length} tracks</p>
                  </div>
                  <button
                    className="delete-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      deletePlaylist(playlist.id);
                      setExpandedPlaylist(null);
                    }}
                    data-testid={`delete-playlist-${playlist.id}`}
                  >
                    🗑️
                  </button>
                </div>

                {isExpanded && (
                  <div className="playlist-tracks">
                    {tracks.length === 0 ? (
                      <p className="no-tracks">No tracks in this playlist</p>
                    ) : (
                      tracks.map(track => (
                        <div
                          key={track.id}
                          className="playlist-track"
                          data-testid={`playlist-track-${track.id}`}
                        >
                          <div
                            className="track-info"
                            onClick={() => playTrack(track.id)}
                          >
                            <p className="track-title">{track.title}</p>
                            <p className="track-artist">{track.artist}</p>
                          </div>
                          <div className="track-actions">
                            <span className="duration">{formatDuration(track.duration)}</span>
                            <button
                              onClick={() => removeTrackFromPlaylist(playlist.id, track.id)}
                              data-testid={`remove-track-${track.id}`}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
