import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { describe, it, expect, afterEach } from 'vitest';
import App from '../App';
import { MusicProvider } from '../context/MusicContext';

afterEach(cleanup);

describe('App', () => {
  it('renders the music player app', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    expect(screen.getByText('Music Player')).toBeInTheDocument();
    expect(screen.getByText('Albums')).toBeInTheDocument();
  });

  it('displays albums', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    expect(screen.getByText('Album One')).toBeInTheDocument();
    expect(screen.getByText('Album Two')).toBeInTheDocument();
  });

  it('selects an album and shows tracks', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    const albumCard = screen.getByText('Album One');
    fireEvent.click(albumCard);
    expect(screen.getByText('Album One - Tracks')).toBeInTheDocument();
    expect(screen.getByText('Track 1 - 3:45')).toBeInTheDocument();
  });

  it('plays a track', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    const albumCard = screen.getByText('Album One');
    fireEvent.click(albumCard);
    const playButton = screen.getAllByText('Play')[0];
    fireEvent.click(playButton);
    expect(screen.getByText('Track 1')).toBeInTheDocument();
    expect(screen.getByText('Pause')).toBeInTheDocument();
  });

  it('toggles favorite', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    const albumCard = screen.getByText('Album One');
    fireEvent.click(albumCard);
    const heartButton = screen.getAllByText('🤍')[0];
    fireEvent.click(heartButton);
    expect(screen.getAllByText('❤️')[0]).toBeInTheDocument();
  });

  it('creates a playlist', () => {
    render(
      <MusicProvider>
        <App />
      </MusicProvider>
    );
    const input = screen.getByPlaceholderText('New playlist name');
    fireEvent.change(input, { target: { value: 'My Playlist' } });
    const createButton = screen.getByText('Create');
    fireEvent.click(createButton);
    expect(screen.getByText('My Playlist (0 tracks)')).toBeInTheDocument();
  });
});