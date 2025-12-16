import React from 'react'
import { albums } from '../mock/data'
import { TrackList } from './TrackList'

export const AlbumList: React.FC = () => {
  return (
    <div className="card">
      <h3>Browse Albums</h3>
      <div className="album-list">
        {albums.map((a) => (
          <div key={a.id} className="album">
            <img src={a.cover} alt={a.title} />
            <div>
              <div style={{ fontWeight: 600 }}>{a.title}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{a.artist}</div>
              <div style={{ marginTop: 8 }}>
                <TrackList album={a} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
