import React from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function TrackList({ album }) {
  const { playTrack, current, isPlaying, toggleLike, liked, addToPlaylist, playlists } = usePlayer()

  return (
    <div>
      {album.tracks.map(t => {
        const isCurrent = current && current.track.id === t.id
        const isLiked = liked.has(t.id)
        return (
          <div className="track" key={t.id} data-testid={`track-${t.id}`}>
            <div className="track-left">
              <button className={`btn ${isCurrent && isPlaying ? 'primary' : ''}`} onClick={() => playTrack(t, album)} aria-label={`play-${t.id}`}>
                {isCurrent && isPlaying ? 'Playing' : 'Play'}
              </button>
              <div style={{ minWidth: 220 }}>
                <div style={{ fontWeight: 700 }}>{t.title}</div>
                <div className="small">{album.artist} · {t.duration}</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <select className="input" onChange={(e) => { if (e.target.value) addToPlaylist(e.target.value, t.id); e.target.value = '' }} data-testid={`add-to-${t.id}`}>
                <option value="">Add to...</option>
                {playlists.map(pl => <option key={pl.id} value={pl.id}>{pl.name}</option>)}
              </select>

              <div role="button" aria-label={`like-${t.id}`} className={`like ${isLiked ? 'liked' : ''}`} onClick={() => toggleLike(t.id)} data-testid={`like-${t.id}`}>♥</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
