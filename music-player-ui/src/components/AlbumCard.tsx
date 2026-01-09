import React from 'react'
import { Album } from '../types'
import TrackItem from './TrackItem'

export default function AlbumCard({ album }: { album: Album }) {
  return (
    <div className="card" data-testid={`album-${album.id}`}>
      <img src={album.cover} alt={album.title} className="album-cover" />
      <div className="album-title">{album.title}</div>
      <div className="album-artist">{album.artist}</div>
      <div style={{marginTop:8}}>
        {album.tracks.map((t) => (
          <TrackItem key={t.id} track={t} />
        ))}
      </div>
    </div>
  )
}
