import React from 'react';
import { useMusic } from '../context/MusicContext';

const Player = () => {
  const { currentTrack, isPlaying, pauseTrack, resumeTrack } = useMusic();

  if (!currentTrack) return <div className="player">No track selected</div>;

  return (
    <div className="player">
      <div className="track-info">
        <h4>{currentTrack.title}</h4>
        <p>{currentTrack.artist}</p>
      </div>
      <div className="controls">
        <button onClick={isPlaying ? pauseTrack : resumeTrack}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  );
};

export default Player;