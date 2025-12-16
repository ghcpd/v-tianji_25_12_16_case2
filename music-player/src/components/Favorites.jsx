import React from 'react';
import { useMusic } from '../context/MusicContext';

const Favorites = () => {
  const { favorites, playTrack } = useMusic();

  return (
    <div className="favorites">
      <h2>Favorites</h2>
      <ul>
        {favorites.map(track => (
          <li key={track.id} className="track-item">
            <button onClick={() => playTrack(track)}>Play</button>
            <span>{track.title} - {track.artist}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favorites;