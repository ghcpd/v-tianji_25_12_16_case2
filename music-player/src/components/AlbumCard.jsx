import React from 'react';

const AlbumCard = ({ album, onSelect }) => {
  return (
    <div className="album-card" onClick={() => onSelect(album)}>
      <img src={album.cover} alt={album.title} />
      <h3>{album.title}</h3>
      <p>{album.artist}</p>
    </div>
  );
};

export default AlbumCard;