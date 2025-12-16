import { useState } from 'react';
import { albums } from '../data';
import TrackList from './TrackList';

export default function AlbumList() {
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);

  const handleOpen = (id: string) => setOpenAlbumId(id === openAlbumId ? null : id);

  return (
    <div className="album-list">
      {albums.map((album) => (
        <div key={album.id} className="album">
          <div className="album-header" onClick={() => handleOpen(album.id)}>
            <h2>{album.title}</h2>
            <small>{album.artist}</small>
          </div>
          {openAlbumId === album.id && <TrackList tracks={album.tracks} />}
        </div>
      ))}
    </div>
  );
}
