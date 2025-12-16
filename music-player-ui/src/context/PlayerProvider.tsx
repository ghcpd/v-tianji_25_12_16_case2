import React, { createContext, useContext, useReducer, useRef } from 'react'
import { Track, Playlist } from '../types'
import { albums } from '../data/mock'

type State = {
  current?: Track
  isPlaying: boolean
  liked: Set<string>
  playlists: Playlist[]
}

type Action =
  | { type: 'play'; track: Track }
  | { type: 'pause' }
  | { type: 'toggle_like'; trackId: string }
  | { type: 'create_playlist'; name: string }
  | { type: 'add_to_playlist'; playlistId: string; trackId: string }

const initialState: State = {
  current: undefined,
  isPlaying: false,
  liked: new Set(),
  playlists: [],
}

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'play':
      return { ...state, current: action.track, isPlaying: true }
    case 'pause':
      return { ...state, isPlaying: false }
    case 'toggle_like': {
      const liked = new Set(state.liked)
      if (liked.has(action.trackId)) liked.delete(action.trackId)
      else liked.add(action.trackId)
      return { ...state, liked }
    }
    case 'create_playlist': {
      const id = 'p' + Math.random().toString(36).slice(2, 9)
      const p: Playlist = { id, name: action.name, trackIds: [] }
      return { ...state, playlists: [...state.playlists, p] }
    }
    case 'add_to_playlist': {
      return {
        ...state,
        playlists: state.playlists.map((p) =>
          p.id === action.playlistId && !p.trackIds.includes(action.trackId)
            ? { ...p, trackIds: [...p.trackIds, action.trackId] }
            : p,
        ),
      }
    }
    default:
      return state
  }
}

const PlayerContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
  playNext: () => void
} | null>(null)

export function PlayerProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  function playNext() {
    const allTracks = albums.flatMap((a) => a.tracks)
    if (!state.current) return
    const idx = allTracks.findIndex((t) => t.id === state.current!.id)
    const next = allTracks[idx + 1]
    if (next) dispatch({ type: 'play', track: next })
    else dispatch({ type: 'pause' })
  }

  React.useEffect(() => {
    if (!audioRef.current) audioRef.current = new Audio()
    const audio = audioRef.current
    if (state.current) {
      audio.src = state.current.src
      audio.play()
      audio.onended = playNext
    } else {
      audio.pause()
    }
    if (!state.isPlaying) audio.pause()
    return () => {
      audio.onended = null
    }
  }, [state.current, state.isPlaying])

  return (
    <PlayerContext.Provider value={{ state, dispatch, playNext }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used within PlayerProvider')
  return ctx
}
