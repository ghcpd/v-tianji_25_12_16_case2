import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('App Component', () => {
  it('should render the app header', () => {
    render(<App />);
    expect(screen.getByText('🎵 Music Player')).toBeInTheDocument();
  });

  it('should render the tagline', () => {
    render(<App />);
    expect(screen.getByText('Your Personal Music Hub')).toBeInTheDocument();
  });

  it('should render navigation tabs', () => {
    render(<App />);
    expect(screen.getByTestId('albums-tab')).toBeInTheDocument();
    expect(screen.getByTestId('playlists-tab')).toBeInTheDocument();
    expect(screen.getByTestId('favorites-tab')).toBeInTheDocument();
  });

  it('should render the player', () => {
    render(<App />);
    // The player component always renders, it just shows "No track selected" when empty
    const playerSection = document.querySelector('.player');
    expect(playerSection).toBeInTheDocument();
  });

  it('should render albums tab by default', () => {
    render(<App />);
    const albumsTab = screen.getByTestId('albums-tab');
    expect(albumsTab).toHaveClass('active');
  });

  it('should switch to playlists tab when clicked', () => {
    render(<App />);
    const playlistsTab = screen.getByTestId('playlists-tab');
    fireEvent.click(playlistsTab);

    expect(playlistsTab).toHaveClass('active');
    const playlistsHeading = screen.getByRole('heading', { name: /^Playlists$/ });
    expect(playlistsHeading).toBeInTheDocument();
  });

  it('should switch to favorites tab when clicked', () => {
    render(<App />);
    const favoritesTab = screen.getByTestId('favorites-tab');
    fireEvent.click(favoritesTab);

    expect(favoritesTab).toHaveClass('active');
    expect(screen.getByText('Favorite Tracks')).toBeInTheDocument();
  });

  it('should render album grid on albums tab', () => {
    render(<App />);
    const albumGrid = screen.getByTestId('album-grid');
    expect(albumGrid).toBeInTheDocument();
  });

  it('should switch to album detail when album is selected', () => {
    render(<App />);
    const firstAlbum = screen.getByTestId('album-1');
    fireEvent.click(firstAlbum);

    expect(screen.getByText('Midnight Dreams')).toBeInTheDocument();
    expect(screen.getByText('← Back')).toBeInTheDocument();
  });

  it('should go back to album grid when back button is clicked', () => {
    render(<App />);
    const firstAlbum = screen.getByTestId('album-1');
    fireEvent.click(firstAlbum);

    const backBtn = screen.getByText('← Back');
    fireEvent.click(backBtn);

    expect(screen.getByTestId('album-grid')).toBeInTheDocument();
  });

  it('should reset selected album when switching to playlists', () => {
    render(<App />);
    const firstAlbum = screen.getByTestId('album-1');
    fireEvent.click(firstAlbum);

    const playlistsTab = screen.getByTestId('playlists-tab');
    fireEvent.click(playlistsTab);

    const albumsTab = screen.getByTestId('albums-tab');
    fireEvent.click(albumsTab);

    expect(screen.getByTestId('album-grid')).toBeInTheDocument();
  });

  it('should render footer', () => {
    render(<App />);
    expect(screen.getByText(/© 2024 Music Player/)).toBeInTheDocument();
  });

  it('should have main content area', () => {
    render(<App />);
    const mainContent = screen.getByRole('main');
    expect(mainContent).toBeInTheDocument();
  });
});
