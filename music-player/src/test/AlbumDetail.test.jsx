import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AlbumDetail } from '../components/AlbumDetail';
import { MusicProvider } from '../context/MusicContext';

describe('AlbumDetail Component', () => {
  it('should render back button', () => {
    const handleBack = vi.fn();
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={handleBack} />
      </MusicProvider>
    );

    const backBtn = screen.getByText('← Back');
    expect(backBtn).toBeInTheDocument();
  });

  it('should display album title', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
  });

  it('should display album artist', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    // Album detail uses artist-name class - need to be specific since "Luna Echo" appears multiple times
    const artistElements = screen.getAllByText('Luna Echo');
    expect(artistElements.length).toBeGreaterThan(0);
  });

  it('should display album year', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    const yearElements = screen.getAllByText('2023');
    expect(yearElements.length).toBeGreaterThan(0);
  });

  it('should display tracks from album', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Starlight')).toBeInTheDocument();
    expect(screen.getByText('Midnight Prayer')).toBeInTheDocument();
    expect(screen.getByText('Dreams of You')).toBeInTheDocument();
    expect(screen.getByText('Fade Away')).toBeInTheDocument();
  });

  it('should display track count', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('4 tracks')).toBeInTheDocument();
  });

  it('should display like buttons for each track', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    const likeButtons = screen.getAllByTestId(/^album-like-btn-/);
    expect(likeButtons).toHaveLength(4);
  });

  it('should toggle like on track', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    const likeBtn = screen.getByTestId('album-like-btn-1');
    expect(likeBtn).toHaveTextContent('🤍');

    fireEvent.click(likeBtn);
    expect(likeBtn).toHaveTextContent('❤️');
  });

  it('should have add to playlist buttons', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    const addButtons = screen.getAllByTestId(/^add-to-playlist-\d+$/);
    expect(addButtons.length).toBeGreaterThan(0);
  });

  it('should display tracks heading', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Tracks')).toBeInTheDocument();
  });

  it('should display album cover image', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    const coverImage = screen.getByAltText('Midnight Dreams');
    expect(coverImage).toBeInTheDocument();
  });

  it('should call onBack when back button is clicked', () => {
    const handleBack = vi.fn();
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={handleBack} />
      </MusicProvider>
    );

    const backBtn = screen.getByText('← Back');
    fireEvent.click(backBtn);

    expect(handleBack).toHaveBeenCalled();
  });

  it('should format duration correctly', () => {
    render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    // Track 1 duration is 210 seconds = 3:30
    expect(screen.getByText('3:30')).toBeInTheDocument();
  });

  it('should render different album when albumId changes', () => {
    const { rerender } = render(
      <MusicProvider>
        <AlbumDetail albumId={1} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();

    rerender(
      <MusicProvider>
        <AlbumDetail albumId={2} onBack={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Neon Lights')).toBeInTheDocument();
  });
});
