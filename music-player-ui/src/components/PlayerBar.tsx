import React from 'react'
import { usePlayer } from '../context/PlayerProvider'

export default function PlayerBar() {
  const { state, dispatch } = usePlayer()
  if (!state.current) return null
  return (
    <div className="player" data-testid="player">
      <div>
        <div style={{fontWeight:700}}>{state.current.title}</div>
        <div style={{color:'var(--muted)'}}>{state.current.id}</div>
      </div>
      <div className="controls">
        <button className="play-btn" onClick={() => dispatch({ type: state.isPlaying ? 'pause' : 'play', track: state.current! })} data-testid="play-toggle">
          {state.isPlaying ? 'Pause' : 'Play'}
        </button>
      </div>
    </div>
  )
}
