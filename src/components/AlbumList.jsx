import React from 'react'
import AlbumCard from './AlbumCard'
import { usePlayer } from '../context/PlayerContext'

export default function AlbumList() {
  const { albums } = usePlayer()
  return (
    <div className="card">
      <h4 style={{ margin: 0 }}>Albums</h4>
      <div className="small" style={{ marginTop: 8 }}>A selection of mock albums to play from.</div>

      <div style={{ marginTop: 14 }} className="album-list" data-testid="album-list">
        {albums.map(a => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>

      <div className="footer-note">This is a frontend-only demo using in-memory data and no backend.</div>
    </div>
  )
}
