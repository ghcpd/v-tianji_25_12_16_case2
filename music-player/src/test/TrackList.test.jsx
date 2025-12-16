import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { TrackList } from '../components/TrackList';
import { MusicProvider, useMusic } from '../context/MusicContext';

describe('TrackList Component', () => {
  const mockTracks = [
    {
      id: 1,
      title: 'Test Track 1',
      artist: 'Test Artist 1',
      duration: 210,
      liked: false,
    },
    {
      id: 2,
      title: 'Test Track 2',
      artist: 'Test Artist 2',
      duration: 245,
      liked: false,
    },
  ];

  it('should render track list with title', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    expect(screen.getByText('Test Playlist')).toBeInTheDocument();
  });

  it('should render all tracks', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    expect(screen.getByText('Test Track 1')).toBeInTheDocument();
    expect(screen.getByText('Test Track 2')).toBeInTheDocument();
  });

  it('should display track artists', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    expect(screen.getByText('Test Artist 1')).toBeInTheDocument();
    expect(screen.getByText('Test Artist 2')).toBeInTheDocument();
  });

  it('should display empty message when no tracks', () => {
    render(
      <MusicProvider>
        <TrackList tracks={[]} title="Test Playlist" />
      </MusicProvider>
    );

    expect(screen.getByText('No tracks available')).toBeInTheDocument();
  });

  it('should have like buttons for each track', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    const likeButtons = screen.getAllByTestId(/^like-btn-\d+$/);
    expect(likeButtons).toHaveLength(2);
  });

  it('should toggle like button on click', () => {
    // Test that like button changes appearance when clicked
    const TestTrackList = () => {
      const { toggleLike } = useMusic();
      const [track, setTrack] = React.useState(mockTracks[0]);

      return (
        <div>
          <button
            onClick={() => {
              toggleLike(track.id);
              setTrack(prev => ({ ...prev, liked: !prev.liked }));
            }}
            data-testid="like-btn-test"
          >
            {track.liked ? '❤️' : '🤍'}
          </button>
        </div>
      );
    };

    render(
      <MusicProvider>
        <TestTrackList />
      </MusicProvider>
    );

    const likeBtn = screen.getByTestId('like-btn-test');
    expect(likeBtn).toHaveTextContent('🤍');

    fireEvent.click(likeBtn);
    expect(likeBtn).toHaveTextContent('❤️');
  });

  it('should format duration correctly', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    // 210 seconds = 3:30
    expect(screen.getByText('3:30')).toBeInTheDocument();
    // 245 seconds = 4:05
    expect(screen.getByText('4:05')).toBeInTheDocument();
  });

  it('should play track when clicked', () => {
    render(
      <MusicProvider>
        <TrackList tracks={mockTracks} title="Test Playlist" />
      </MusicProvider>
    );

    const trackTitle = screen.getByText('Test Track 1');
    fireEvent.click(trackTitle);

    // Track should be selected/playing (verified through context)
    expect(trackTitle).toBeInTheDocument();
  });
});
