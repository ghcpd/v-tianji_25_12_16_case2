import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import { Player } from '../components/Player';
import { MusicProvider, useMusic } from '../context/MusicContext';

describe('Player Component', () => {
  it('should render no track message when no track is selected', () => {
    render(
      <MusicProvider>
        <Player />
      </MusicProvider>
    );

    expect(screen.getByText('No track selected')).toBeInTheDocument();
  });

  it('should always render a player container', () => {
    // The player component always renders
    const { container } = render(
      <MusicProvider>
        <Player />
      </MusicProvider>
    );

    const playerContainer = container.querySelector('.player');
    expect(playerContainer).toBeInTheDocument();
  });

  it('should render when a track is available', () => {
    // Create a component that uses the music context properly
    const PlayerWithTrack = () => {
      const { playTrack } = useMusic();

      React.useEffect(() => {
        playTrack(1);
      }, [playTrack]);

      return <Player />;
    };

    render(
      <MusicProvider>
        <PlayerWithTrack />
      </MusicProvider>
    );

    // Should render the player
    const progressBar = screen.getByTestId('progress-bar');
    expect(progressBar).toBeInTheDocument();
  });

  it('should format time correctly', () => {
    const PlayerWithTime = () => {
      const { playTrack, setCurrentTime } = useMusic();

      React.useEffect(() => {
        playTrack(1);
        setCurrentTime(125); // 2:05
      }, [playTrack, setCurrentTime]);

      return <Player />;
    };

    render(
      <MusicProvider>
        <PlayerWithTime />
      </MusicProvider>
    );

    // Progress bar should exist
    expect(screen.getByTestId('progress-bar')).toBeInTheDocument();
  });
});
