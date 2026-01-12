import React, { useState } from 'react';
import { MusicProvider } from './context/MusicContext';
import AlbumList from './components/AlbumList';
import TrackList from './components/TrackList';
import Player from './components/Player';
import PlaylistList from './components/PlaylistList';
import Favorites from './components/Favorites';
import './App.css';

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  return (
    <MusicProvider>
      <div className="app">
        <header>
          <h1>Music Player</h1>
        </header>
        <main>
          <AlbumList onSelect={setSelectedAlbum} />
          {selectedAlbum && <TrackList album={selectedAlbum} />}
          <PlaylistList />
          <Favorites />
          <Player />
        </main>
      </div>
    </MusicProvider>
  );
}

export default App;
