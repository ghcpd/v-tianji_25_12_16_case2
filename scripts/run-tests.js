import assert from 'assert'
import { createPlaylist, addToPlaylist, toggleLike, playTrack, togglePlay } from '../src/core/logic.js'
import { albums } from '../src/data/mockAlbums.js'

function run() {
  console.log('\nRunning lightweight node tests for core UI logic...')
  // initial state
  let state = { playlists: [], liked: [], current: null, isPlaying: false }

  // create playlist
  state = createPlaylist(state, 'Chill')
  assert(state.playlists.length === 1, 'playlist should be created')
  assert(state.playlists[0].name === 'Chill', 'playlist name preserved')

  // add a track
  const trackId = albums[0].tracks[2].id
  state = addToPlaylist(state, state.playlists[0].id, trackId)
  assert(state.playlists[0].trackIds.includes(trackId), 'track was added to playlist')

  // toggle like
  state = toggleLike(state, trackId)
  assert(state.liked.includes(trackId), 'track is liked')
  state = toggleLike(state, trackId)
  assert(!state.liked.includes(trackId), 'track like toggled off')

  // play
  const track = albums[1].tracks[0]
  const album = albums[1]
  state = playTrack(state, track, album)
  assert(state.current && state.current.track.id === track.id, 'current track set')
  assert(state.isPlaying === true, 'isPlaying true after play')

  // toggle play
  state = togglePlay(state)
  assert(state.isPlaying === false, 'togglePlay works')

  console.log('All tests passed ✅\n')
}

try {
  run()
} catch (err) {
  console.error('Test failure:', err.message)
  process.exitCode = 2
}
