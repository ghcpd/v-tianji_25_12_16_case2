import React from 'react'
import TrackList from './TrackList'

export default function AlbumCard({ album }) {
  return (
    <div className="card album-card" data-testid={`album-${album.id}`}>
      <div className="album-art">{album.art}</div>
      <div className="album-meta">
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
          <div>
            <div className="album-title">{album.title}</div>
            <div className="album-sub">{album.artist} · {album.year}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="small">{album.tracks.length} tracks</div>
            <div style={{ marginTop: 8 }}><button className="btn">View</button></div>
          </div>
        </div>

        <div style={{ marginTop: 12 }}>
          <TrackList album={album} />
        </div>
      </div>
    </div>
  )
}
