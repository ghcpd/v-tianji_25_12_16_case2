import React from 'react'
import { Album } from '../mock/data'
import { usePlayer } from '../state/player'

export const TrackList: React.FC<{ album: Album }> = ({ album }) => {
  const { state, dispatch } = usePlayer()
  return (
    <div>
      {album.tracks.map((t) => {
        const isCurrent = state.currentTrackId === t.id
        const liked = state.liked.has(t.id)
        return (
          <div key={t.id} className="track">
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <button
                aria-label={`play-${t.id}`}
                className={`small ${isCurrent ? 'playing' : ''}`}
                onClick={() => dispatch({ type: 'PLAY', id: t.id })}
              >
                {isCurrent && state.isPlaying ? '⏸' : '▶'}
              </button>
              <div>
                <div style={{ fontWeight: 600 }}>{t.title}</div>
                <div style={{ fontSize: 12, color: 'var(--muted)' }}>{Math.floor(t.duration / 60)}:{(t.duration % 60).toString().padStart(2, '0')}</div>
              </div>
            </div>
            <div className="controls">
              <button
                aria-label={`like-${t.id}`}
                className={`small like ${liked ? 'playing' : ''}`}
                onClick={() => dispatch({ type: 'TOGGLE_LIKE', id: t.id })}
              >
                {liked ? '♥' : '♡'}
              </button>
              <button className="small" onClick={() => dispatch({ type: 'CREATE_PLAYLIST', name: t.title + ' playlist' })} aria-label={`add-${t.id}`}>
                +Playlist
              </button>
            </div>
          </div>
        )
      })}
    </div>
  )
}
