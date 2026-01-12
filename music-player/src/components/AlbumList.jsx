import React from 'react';
import { mockAlbums } from '../data/mockData';
import AlbumCard from './AlbumCard';

const AlbumList = ({ onSelect }) => {
  return (
    <div className="album-list">
      <h2>Albums</h2>
      <div className="albums-grid">
        {mockAlbums.map(album => (
          <AlbumCard key={album.id} album={album} onSelect={onSelect} />
        ))}
      </div>
    </div>
  );
};

export default AlbumList;