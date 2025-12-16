import React from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function PlayerBar() {
  const { current, isPlaying, togglePlay, toggleLike, liked } = usePlayer()
  if (!current) return null
  const { track, album } = current
  const isLiked = liked.has(track.id)
  return (
    <div className="playbar" role="status">
      <div style={{ width: 56, height: 56, borderRadius: 8, background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700 }}>{album.art}</div>
      <div className="now">
        <div style={{ fontWeight: 800 }}>{track.title}</div>
        <div className="small">{album.artist} • {track.duration}</div>
      </div>

      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
        <button className={`btn ${isPlaying ? 'primary' : ''}`} onClick={togglePlay} data-testid="play-toggle">{isPlaying ? 'Pause' : 'Play'}</button>
        <div role="button" aria-label="like-now" className={`like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(track.id)} data-testid="like-now">♥</div>
      </div>
    </div>
  )
}
