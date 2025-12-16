import React, { useEffect, useRef } from 'react'
import { usePlayer } from '../state/player'
import { albums } from '../mock/data'

export const Player: React.FC = () => {
  const { state, dispatch } = usePlayer()
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    if (!audioRef.current) return
    if (state.isPlaying) {
      try {
        const ret = audioRef.current.play()
        // play() may not return a Promise in some jsdom versions
        if (ret && typeof (ret as any).catch === 'function') (ret as any).catch(() => {})
      } catch (e) {
        // ignore play errors in test environment
      }
    } else audioRef.current.pause()
  }, [state.isPlaying, state.currentTrackId])

  const currentTrack = albums.flatMap((a) => a.tracks).find((t) => t.id === state.currentTrackId)

  return (
    <div className="card">
      <h3>Now Playing</h3>
      {currentTrack ? (
        <div>
          <div style={{ fontWeight: 700 }}>{currentTrack.title}</div>
          <div style={{ color: 'var(--muted)', marginBottom: 8 }}>{currentTrack.duration} sec</div>
          <div className="controls">
            <button className="button" onClick={() => dispatch({ type: 'TOGGLE_PLAY' })} aria-label="toggle-play">
              {state.isPlaying ? 'Pause' : 'Play'}
            </button>
            <button className="small" onClick={() => dispatch({ type: 'PAUSE' })} aria-label="stop">Stop</button>
          </div>
          <audio ref={audioRef} src={''} />
        </div>
      ) : (
        <div style={{ color: 'var(--muted)' }}>No track selected</div>
      )}
    </div>
  )
}
