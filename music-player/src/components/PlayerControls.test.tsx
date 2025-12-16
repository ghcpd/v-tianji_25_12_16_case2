import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import type { Mock } from 'vitest';
import PlayerControls from './PlayerControls';
import { PlayerContext } from '../state/PlayerContext';

const renderWithContext = (state: any, dispatch: Mock) =>
  render(
    <PlayerContext.Provider value={{ state, dispatch }}>
      <PlayerControls />
    </PlayerContext.Provider>
  );

describe('PlayerControls', () => {
  it('shows no track selected when none', () => {
    const dispatch = vi.fn();
    const state = { currentTrack: null, isPlaying: false, likedTrackIds: new Set<string>() };
    renderWithContext(state, dispatch);
    expect(screen.getByText('No track selected')).toBeInTheDocument();
  });

  it('shows now playing and toggles play/pause', () => {
    const dispatch = vi.fn();
    const state = { currentTrack: { id: 't1', title: 'Song One', duration: 180 }, isPlaying: false, likedTrackIds: new Set<string>() };
    renderWithContext(state, dispatch);
    expect(screen.getByText('Now playing:')).toBeInTheDocument();
    const button = screen.getByText('Play');
    fireEvent.click(button);
    expect(dispatch).toHaveBeenCalledWith({ type: 'PLAY', track: state.currentTrack });
  });
});
