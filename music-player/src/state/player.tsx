import React, { createContext, useContext, useReducer } from 'react'
import { Track } from '../mock/data'

export type Playlist = { id: string; name: string; trackIds: string[] }

type State = {
  currentTrackId: string | null
  isPlaying: boolean
  liked: Set<string>
  playlists: Playlist[]
}

type Action =
  | { type: 'PLAY'; id: string }
  | { type: 'TOGGLE_PLAY' }
  | { type: 'PAUSE' }
  | { type: 'TOGGLE_LIKE'; id: string }
  | { type: 'CREATE_PLAYLIST'; name: string }
  | { type: 'ADD_TO_PLAYLIST'; playlistId: string; trackId: string }

const initialState: State = {
  currentTrackId: null,
  isPlaying: false,
  liked: new Set(),
  playlists: []
}

const PlayerContext = createContext<{
  state: State
  dispatch: React.Dispatch<Action>
}>({ state: initialState, dispatch: () => {} })

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'PLAY':
      return { ...state, currentTrackId: action.id, isPlaying: true }
    case 'TOGGLE_PLAY':
      return { ...state, isPlaying: !state.isPlaying }
    case 'PAUSE':
      return { ...state, isPlaying: false }
    case 'TOGGLE_LIKE': {
      const liked = new Set(state.liked)
      if (liked.has(action.id)) liked.delete(action.id)
      else liked.add(action.id)
      return { ...state, liked }
    }
    case 'CREATE_PLAYLIST': {
      const id = 'pl_' + Math.random().toString(36).slice(2, 9)
      return { ...state, playlists: [...state.playlists, { id, name: action.name, trackIds: [] }] }
    }
    case 'ADD_TO_PLAYLIST': {
      return {
        ...state,
        playlists: state.playlists.map((p) => (p.id === action.playlistId ? { ...p, trackIds: [...p.trackIds, action.trackId] } : p))
      }
    }
    default:
      return state
  }
}

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  return <PlayerContext.Provider value={{ state, dispatch }}>{children}</PlayerContext.Provider>
}

export const usePlayer = () => useContext(PlayerContext)
