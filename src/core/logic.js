// Pure, framework-agnostic core logic used by the UI (and tested by the node test runner)

export function createPlaylist(state, name) {
  const id = 'pl_' + Date.now().toString(36)
  const pl = { id, name: name || 'New Playlist', trackIds: [] }
  return { ...state, playlists: [pl, ...(state.playlists || [])] }
}

export function addToPlaylist(state, playlistId, trackId) {
  const pls = (state.playlists || []).map(pl => pl.id === playlistId ? { ...pl, trackIds: Array.from(new Set([...pl.trackIds, trackId])) } : pl)
  return { ...state, playlists: pls }
}

export function toggleLike(state, trackId) {
  const liked = new Set(state.liked || [])
  if (liked.has(trackId)) liked.delete(trackId)
  else liked.add(trackId)
  return { ...state, liked: Array.from(liked) }
}

export function playTrack(state, track, album) {
  return { ...state, current: { track, album }, isPlaying: true }
}

export function togglePlay(state) {
  return { ...state, isPlaying: !state.isPlaying }
}
