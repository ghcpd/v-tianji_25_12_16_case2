import React from 'react'
import { Track } from '../types'
import { usePlayer } from '../context/PlayerProvider'

export default function TrackItem({ track }: { track: Track }) {
  const { state, dispatch } = usePlayer()
  const isCurrent = state.current?.id === track.id
  const liked = state.liked.has(track.id)

  function togglePlay() {
    if (isCurrent && state.isPlaying) dispatch({ type: 'pause' })
    else dispatch({ type: 'play', track })
  }

  return (
    <div className="track" data-testid={`track-${track.id}`}>
      <div style={{display:'flex',gap:10,alignItems:'center'}}>
        <button className="small-btn" onClick={togglePlay}>{isCurrent && state.isPlaying? 'Pause':'Play'}</button>
        <div>
          <div style={{fontWeight:600}}>{track.title}</div>
          <div style={{color:'var(--muted)',fontSize:12}}>{Math.floor(track.duration/60)}:{String(track.duration%60).padStart(2,'0')}</div>
        </div>
      </div>
      <div className="controls">
        <button className={`small-btn ${liked? 'like':''}`} onClick={() => dispatch({ type: 'toggle_like', trackId: track.id })} aria-label={`like-${track.id}`}>
          {liked? '♥':'♡'}
        </button>
        <button className="small-btn" onClick={() => dispatch({ type: 'create_playlist', name: 'My Playlist' })} aria-label={`add-playlist-${track.id}`}>
          +Playlist
        </button>
      </div>
    </div>
  )
}
