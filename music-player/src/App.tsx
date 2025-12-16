import { PlayerProvider } from './state/PlayerContext';
import AlbumList from './components/AlbumList';
import PlayerControls from './components/PlayerControls';
import './App.css';

function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <h1>Music Player</h1>
        <AlbumList />
        <PlayerControls />
      </div>
    </PlayerProvider>
  );
}

export default App;
