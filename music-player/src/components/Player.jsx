import React from 'react';
import { useMusic } from '../context/MusicContext';
import './Player.css';

export const Player = () => {
  const { currentTrack, isPlaying, togglePlayPause, currentTime, setCurrentTime } = useMusic();

  if (!currentTrack) {
    return (
      <div className="player">
        <div className="player-content">
          <p className="no-track">No track selected</p>
        </div>
      </div>
    );
  }

  const progress = (currentTime / currentTrack.duration) * 100;

  const handleProgressClick = (e) => {
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const newTime = ((e.clientX - rect.left) / rect.width) * currentTrack.duration;
    setCurrentTime(newTime);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="player">
      <div className="player-content">
        <div className="player-info">
          <h3>{currentTrack.title}</h3>
          <p>{currentTrack.artist}</p>
        </div>
        <div className="player-controls">
          <button
            className="play-btn"
            onClick={togglePlayPause}
            aria-label={isPlaying ? 'Pause' : 'Play'}
            data-testid="play-pause-btn"
          >
            {isPlaying ? '⏸' : '▶'}
          </button>
        </div>
        <div className="progress-bar" onClick={handleProgressClick} data-testid="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <div className="time-display">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(currentTrack.duration)}</span>
        </div>
      </div>
    </div>
  );
};
