import React from 'react';
import { useMusic } from '../context/MusicContext';
import './AlbumGrid.css';

export const AlbumGrid = ({ onSelectAlbum }) => {
  const { albums } = useMusic();

  return (
    <div className="album-section">
      <h2>Albums</h2>
      <div className="album-grid" data-testid="album-grid">
        {albums.map(album => (
          <div
            key={album.id}
            className="album-card"
            onClick={() => onSelectAlbum(album.id)}
            data-testid={`album-${album.id}`}
          >
            <div className="album-cover">
              <img src={album.cover} alt={album.title} />
            </div>
            <div className="album-info">
              <h3>{album.title}</h3>
              <p className="artist">{album.artist}</p>
              <p className="year">{album.year}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
