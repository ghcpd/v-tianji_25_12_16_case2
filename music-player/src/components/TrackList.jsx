import React from 'react';
import { useMusic } from '../context/MusicContext';
import './TrackList.css';

export const TrackList = ({ tracks, title }) => {
  const { playTrack, toggleLike } = useMusic();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  if (!tracks || tracks.length === 0) {
    return (
      <div className="track-list">
        <h3>{title}</h3>
        <p className="empty-message">No tracks available</p>
      </div>
    );
  }

  return (
    <div className="track-list">
      <h3>{title}</h3>
      <div className="tracks" data-testid="track-list">
        {tracks.map(track => (
          <div
            key={track.id}
            className="track-item"
            data-testid={`track-${track.id}`}
          >
            <div className="track-details" onClick={() => playTrack(track.id)}>
              <div className="track-name-artist">
                <p className="track-title">{track.title}</p>
                <p className="track-artist">{track.artist}</p>
              </div>
              <p className="track-duration">{formatDuration(track.duration)}</p>
            </div>
            <button
              className={`like-btn ${track.liked ? 'liked' : ''}`}
              onClick={() => toggleLike(track.id)}
              data-testid={`like-btn-${track.id}`}
              aria-label={track.liked ? 'Unlike' : 'Like'}
            >
              {track.liked ? '❤️' : '🤍'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
