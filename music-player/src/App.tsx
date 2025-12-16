import React from 'react'
import { PlayerProvider } from './state/player'
import { AlbumList } from './components/AlbumList'
import { Player } from './components/Player'
import { Sidebar } from './components/Sidebar'

export const App: React.FC = () => {
  return (
    <PlayerProvider>
      <div className="app">
        <div className="header">
          <h1>Music Player</h1>
          <div style={{ color: 'var(--muted)' }}>Mock frontend-only app</div>
        </div>
        <div className="grid">
          <div>
            <AlbumList />
            <div className="card" style={{ marginTop: 14 }}>
              <h3>Liked Tracks</h3>
              <div style={{ color: 'var(--muted)' }}>Use the ♥ button to add likes</div>
            </div>
          </div>
          <div>
            <Player />
            <Sidebar />
          </div>
        </div>
      </div>
    </PlayerProvider>
  )
}

export default App
