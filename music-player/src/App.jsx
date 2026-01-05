import React, { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import { Player } from './components/Player';
import { AlbumGrid } from './components/AlbumGrid';
import { AlbumDetail } from './components/AlbumDetail';
import { PlaylistManager } from './components/PlaylistManager';
import { TrackList } from './components/TrackList';
import { useMusic } from './context/MusicContext';
import './App.css';

function AppContent() {
  const [selectedAlbumId, setSelectedAlbumId] = useState(null);
  const [activeTab, setActiveTab] = useState('albums');
  const { getLikedTracks } = useMusic();

  return (
    <div className="app">
      <header className="app-header">
        <h1>🎵 Music Player</h1>
        <p className="tagline">Your Personal Music Hub</p>
      </header>

      <Player />

      <nav className="nav-tabs" data-testid="nav-tabs">
        <button
          className={`tab ${activeTab === 'albums' ? 'active' : ''}`}
          onClick={() => {
            setActiveTab('albums');
            setSelectedAlbumId(null);
          }}
          data-testid="albums-tab"
        >
          Albums
        </button>
        <button
          className={`tab ${activeTab === 'playlists' ? 'active' : ''}`}
          onClick={() => setActiveTab('playlists')}
          data-testid="playlists-tab"
        >
          Playlists
        </button>
        <button
          className={`tab ${activeTab === 'favorites' ? 'active' : ''}`}
          onClick={() => setActiveTab('favorites')}
          data-testid="favorites-tab"
        >
          Favorites
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'albums' && (
          <>
            {selectedAlbumId ? (
              <AlbumDetail
                albumId={selectedAlbumId}
                onBack={() => setSelectedAlbumId(null)}
              />
            ) : (
              <AlbumGrid onSelectAlbum={setSelectedAlbumId} />
            )}
          </>
        )}

        {activeTab === 'playlists' && <PlaylistManager />}

        {activeTab === 'favorites' && (
          <TrackList tracks={getLikedTracks()} title="Favorite Tracks" />
        )}
      </main>

      <footer className="app-footer">
        <p>© 2024 Music Player. All rights reserved.</p>
      </footer>
    </div>
  );
}

function App() {
  return (
    <MusicProvider>
      <AppContent />
    </MusicProvider>
  );
}

export default App;
