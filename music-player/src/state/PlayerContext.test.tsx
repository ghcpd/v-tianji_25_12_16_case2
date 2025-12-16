import { reducer, initialState } from './PlayerContext';
import type { PlayerState } from './PlayerContext';
import type { Track } from '../data';

describe('PlayerContext reducer', () => {
  const track: Track = { id: 't1', title: 'Song One', duration: 180 };

  it('should play a track', () => {
    const state = reducer(initialState, { type: 'PLAY', track });
    expect(state.currentTrack).toEqual(track);
    expect(state.isPlaying).toBe(true);
  });

  it('should pause', () => {
    const playing = { ...initialState, currentTrack: track, isPlaying: true };
    const state = reducer(playing, { type: 'PAUSE' });
    expect(state.isPlaying).toBe(false);
  });

  it('should toggle like', () => {
    const state1 = reducer(initialState, { type: 'TOGGLE_LIKE', trackId: track.id });
    expect(state1.likedTrackIds.has(track.id)).toBe(true);
    const state2 = reducer(state1, { type: 'TOGGLE_LIKE', trackId: track.id });
    expect(state2.likedTrackIds.has(track.id)).toBe(false);
  });

  it('should add to playlist', () => {
    const state = reducer(initialState, { type: 'ADD_TO_PLAYLIST', playlist: 'Favorites', track });
    expect(state.playlists['Favorites']).toEqual([track]);
    const state2 = reducer(state, { type: 'ADD_TO_PLAYLIST', playlist: 'Favorites', track });
    expect(state2.playlists['Favorites']).toEqual([track, track]);
  });
});
