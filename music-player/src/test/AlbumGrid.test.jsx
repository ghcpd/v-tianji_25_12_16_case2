import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { AlbumGrid } from '../components/AlbumGrid';
import { MusicProvider } from '../context/MusicContext';

describe('AlbumGrid Component', () => {
  it('should render all albums', () => {
    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={() => {}} />
      </MusicProvider>
    );

    const albumGrid = screen.getByTestId('album-grid');
    expect(albumGrid).toBeInTheDocument();

    // Should have 4 albums
    const albums = screen.getAllByTestId(/^album-\d+$/);
    expect(albums).toHaveLength(4);
  });

  it('should display album titles', () => {
    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
    expect(screen.getByText('Neon Lights')).toBeInTheDocument();
    expect(screen.getByText('Ocean Waves')).toBeInTheDocument();
    expect(screen.getByText('Electric Horizon')).toBeInTheDocument();
  });

  it('should display album artists', () => {
    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Luna Echo')).toBeInTheDocument();
    expect(screen.getByText('Cyber Pulse')).toBeInTheDocument();
    expect(screen.getByText('Coastal Sounds')).toBeInTheDocument();
    expect(screen.getByText('Synth Masters')).toBeInTheDocument();
  });

  it('should display album years', () => {
    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={() => {}} />
      </MusicProvider>
    );

    const yearElements = screen.getAllByText('2023');
    expect(yearElements.length).toBeGreaterThan(0);
  });

  it('should call onSelectAlbum when an album is clicked', () => {
    const mockFn = vi.fn();

    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={mockFn} />
      </MusicProvider>
    );

    const firstAlbum = screen.getByTestId('album-1');
    fireEvent.click(firstAlbum);

    expect(mockFn).toHaveBeenCalledWith(1);
  });

  it('should render album section heading', () => {
    render(
      <MusicProvider>
        <AlbumGrid onSelectAlbum={() => {}} />
      </MusicProvider>
    );

    expect(screen.getByText('Albums')).toBeInTheDocument();
  });
});
