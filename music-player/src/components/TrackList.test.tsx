import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import TrackList from './TrackList';
import type { Track } from '../data';
import { PlayerContext } from '../state/PlayerContext';

const track: Track = { id: 't1', title: 'Song One', duration: 180 };

const renderWithContext = (state: any, dispatch: Mock) =>
  render(
    <PlayerContext.Provider value={{ state, dispatch }}>
      <TrackList tracks={[track]} />
    </PlayerContext.Provider>
  );

describe('TrackList', () => {
  it('plays a track when play button clicked', () => {
    const dispatch = vi.fn();
    const state = { currentTrack: null, isPlaying: false, likedTrackIds: new Set<string>() };
    renderWithContext(state, dispatch);
    const button = screen.getByText('▶️');
    fireEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({ type: 'PLAY', track });
  });

  it('toggles like', () => {
    const dispatch = vi.fn();
    const state = { currentTrack: null, isPlaying: false, likedTrackIds: new Set<string>() };
    renderWithContext(state, dispatch);
    const likeButton = screen.getByText('🤍');
    fireEvent.click(likeButton);
    expect(dispatch).toHaveBeenCalledWith({ type: 'TOGGLE_LIKE', trackId: track.id });
  });
});
