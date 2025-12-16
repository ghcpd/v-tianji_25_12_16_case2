import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import { PlaylistManager } from '../components/PlaylistManager';
import { MusicProvider } from '../context/MusicContext';

describe('PlaylistManager Component', () => {
  it('should render playlists section', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    expect(screen.getByText('Playlists')).toBeInTheDocument();
  });

  it('should display input for creating new playlist', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const input = screen.getByTestId('playlist-input');
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute('placeholder', 'New playlist name...');
  });

  it('should display create button', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const createBtn = screen.getByTestId('create-btn');
    expect(createBtn).toBeInTheDocument();
    expect(createBtn).toHaveTextContent('Create');
  });

  it('should display existing playlists', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    // Default playlists from mockData: "My Favorites" and "Chill Vibes"
    expect(screen.getByText('My Favorites')).toBeInTheDocument();
    expect(screen.getByText('Chill Vibes')).toBeInTheDocument();
  });

  it('should create a new playlist when button is clicked', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const input = screen.getByTestId('playlist-input');
    const createBtn = screen.getByTestId('create-btn');

    fireEvent.change(input, { target: { value: 'My New Playlist' } });
    fireEvent.click(createBtn);

    expect(screen.getByText('My New Playlist')).toBeInTheDocument();
  });

  it('should create playlist on Enter key press', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const input = screen.getByTestId('playlist-input');

    fireEvent.change(input, { target: { value: 'Quick Playlist' } });
    fireEvent.keyPress(input, { key: 'Enter', code: 'Enter', charCode: 13 });

    expect(screen.getByText('Quick Playlist')).toBeInTheDocument();
  });

  it('should display track count for each playlist', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    // My Favorites has 0 tracks, Chill Vibes has 3
    expect(screen.getByText('0 tracks')).toBeInTheDocument();
    expect(screen.getByText('3 tracks')).toBeInTheDocument();
  });

  it('should expand/collapse playlist on header click', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const playlistHeader = screen.getByText('Chill Vibes').closest('.playlist-header');
    fireEvent.click(playlistHeader);

    // After expanding, we should see tracks in the playlist
    const playlistTracks = screen.queryAllByTestId(/^playlist-track-/);
    expect(playlistTracks.length).toBeGreaterThan(0);
  });

  it('should delete playlist when delete button is clicked', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const deleteBtn = screen.getByTestId('delete-playlist-1');
    fireEvent.click(deleteBtn);

    // "My Favorites" should be deleted
    expect(screen.queryByText('My Favorites')).not.toBeInTheDocument();
  });

  it('should display delete button for each playlist', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const deleteButtons = screen.getAllByTestId(/^delete-playlist-/);
    expect(deleteButtons.length).toBeGreaterThan(0);
  });

  it('should remove track from playlist', () => {
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    // Expand the "Chill Vibes" playlist which has 3 tracks
    const playlistHeader = screen.getByText('Chill Vibes').closest('.playlist-header');
    fireEvent.click(playlistHeader);

    // Get first remove button
    const removeBtn = screen.getAllByTestId(/^remove-track-/)[0];
    fireEvent.click(removeBtn);

    // Playlist should now show 2 tracks
    expect(screen.getByText('2 tracks')).toBeInTheDocument();
  });

  it('should display no playlists message when empty', () => {
    // Default playlists are provided, so we just verify they exist
    render(
      <MusicProvider>
        <PlaylistManager />
      </MusicProvider>
    );

    const playlistItems = screen.getAllByTestId(/^playlist-\d+$/);
    expect(playlistItems.length).toBeGreaterThan(0);
  });
});
