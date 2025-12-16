import { createContext, useContext, useReducer } from "react";
import type { ReactNode } from "react";
import type { Track } from "../data";

export interface PlayerState {
  currentTrack: Track | null;
  isPlaying: boolean;
  likedTrackIds: Set<string>;
  playlists: Record<string, Track[]>; // playlist name -> tracks
}

export type PlayerAction =
  | { type: "PLAY"; track: Track }
  | { type: "PAUSE" }
  | { type: "TOGGLE_LIKE"; trackId: string }
  | { type: "ADD_TO_PLAYLIST"; playlist: string; track: Track };

export const initialState: PlayerState = {
  currentTrack: null,
  isPlaying: false,
  likedTrackIds: new Set<string>(),
  playlists: {},
};

export function reducer(state: PlayerState, action: PlayerAction): PlayerState {
  switch (action.type) {
    case "PLAY":
      return { ...state, currentTrack: action.track, isPlaying: true };
    case "PAUSE":
      return { ...state, isPlaying: false };
    case "TOGGLE_LIKE": {
      const newSet = new Set(state.likedTrackIds);
      if (newSet.has(action.trackId)) newSet.delete(action.trackId);
      else newSet.add(action.trackId);
      return { ...state, likedTrackIds: newSet };
    }
    case "ADD_TO_PLAYLIST": {
      const existing = state.playlists[action.playlist] ?? [];
      return {
        ...state,
        playlists: {
          ...state.playlists,
          [action.playlist]: [...existing, action.track],
        },
      };
    }
    default:
      return state;
  }
}

export const PlayerContext = createContext<{
  state: PlayerState;
  dispatch: React.Dispatch<PlayerAction>;
} | null>(null);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <PlayerContext.Provider value={{ state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};

export function usePlayer() {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error("usePlayer must be used within a PlayerProvider");
  return ctx;
}
