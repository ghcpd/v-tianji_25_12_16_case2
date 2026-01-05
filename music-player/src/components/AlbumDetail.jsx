import React, { useState } from 'react';
import { useMusic } from '../context/MusicContext';
import './AlbumDetail.css';

export const AlbumDetail = ({ albumId, onBack }) => {
  const { getAlbumById, getAlbumTracks, playTrack, toggleLike, addTrackToPlaylist, playlists } = useMusic();
  const [selectedTrackId, setSelectedTrackId] = useState(null);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);

  const album = getAlbumById(albumId);
  const tracks = getAlbumTracks(albumId);

  if (!album) {
    return <div>Album not found</div>;
  }

  const handleAddToPlaylist = (playlistId) => {
    if (selectedTrackId) {
      addTrackToPlaylist(playlistId, selectedTrackId);
      setShowPlaylistMenu(false);
      setSelectedTrackId(null);
    }
  };

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="album-detail" data-testid={`album-detail-${albumId}`}>
      <button onClick={onBack} className="back-btn">
        ← Back
      </button>

      <div className="album-header">
        <img src={album.cover} alt={album.title} className="album-cover-large" />
        <div className="album-header-info">
          <h1>{album.title}</h1>
          <p className="artist-name">{album.artist}</p>
          <p className="year">{album.year}</p>
          <p className="track-info">{tracks.length} tracks</p>
        </div>
      </div>

      <div className="tracks-container">
        <h2>Tracks</h2>
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="track-row"
            data-testid={`album-track-${track.id}`}
          >
            <span className="track-index">{index + 1}</span>
            <div
              className="track-cell"
              onClick={() => playTrack(track.id)}
              style={{ cursor: 'pointer', flex: 1 }}
            >
              <p className="track-title">{track.title}</p>
              <p className="track-artist">{track.artist}</p>
            </div>
            <div className="track-actions">
              <span className="duration">{formatDuration(track.duration)}</span>
              <button
                className="like-btn"
                onClick={() => toggleLike(track.id)}
                data-testid={`album-like-btn-${track.id}`}
              >
                {track.liked ? '❤️' : '🤍'}
              </button>
              <div className="playlist-dropdown">
                <button
                  onClick={() => {
                    setSelectedTrackId(track.id);
                    setShowPlaylistMenu(!showPlaylistMenu);
                  }}
                  data-testid={`add-to-playlist-${track.id}`}
                >
                  ➕
                </button>
                {showPlaylistMenu && selectedTrackId === track.id && (
                  <div className="playlist-menu">
                    {playlists.length === 0 ? (
                      <p className="no-playlists">No playlists</p>
                    ) : (
                      playlists.map(playlist => (
                        <button
                          key={playlist.id}
                          onClick={() => handleAddToPlaylist(playlist.id)}
                          data-testid={`add-to-playlist-${playlist.id}`}
                        >
                          {playlist.name}
                        </button>
                      ))
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
