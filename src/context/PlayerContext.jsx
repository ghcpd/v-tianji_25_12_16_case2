import React, { createContext, useContext, useState } from 'react'
import { albums as mock } from '../data/mockAlbums'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
  const [albums] = useState(mock)
  const [current, setCurrent] = useState(null) // { track, album }
  const [isPlaying, setIsPlaying] = useState(false)
  const [liked, setLiked] = useState(() => new Set())
  const [playlists, setPlaylists] = useState([]) // { id, name, trackIds: [] }

  function playTrack(track, album) {
    setCurrent({ track, album })
    setIsPlaying(true)
  }
  function togglePlay() {
    setIsPlaying(p => !p)
  }
  function toggleLike(trackId) {
    setLiked(prev => {
      const copy = new Set(prev)
      if (copy.has(trackId)) copy.delete(trackId)
      else copy.add(trackId)
      return copy
    })
  }
  function createPlaylist(name) {
    const id = 'pl_' + Date.now().toString(36)
    const pl = { id, name: name || 'New Playlist', trackIds: [] }
    setPlaylists(p => [pl, ...p])
    return pl
  }
  function addToPlaylist(playlistId, trackId) {
    setPlaylists(p => p.map(pl => pl.id === playlistId ? { ...pl, trackIds: Array.from(new Set([...pl.trackIds, trackId])) } : pl))
  }

  return (
    <PlayerContext.Provider value={{ albums, current, isPlaying, playTrack, togglePlay, liked, toggleLike, playlists, createPlaylist, addToPlaylist }}>
      {children}
    </PlayerContext.Provider>
  )
}

export function usePlayer() {
  const ctx = useContext(PlayerContext)
  if (!ctx) throw new Error('usePlayer must be used inside PlayerProvider')
  return ctx
}
