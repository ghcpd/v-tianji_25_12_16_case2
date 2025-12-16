import React from 'react'
import { PlayerProvider } from './context/PlayerContext'
import Header from './components/Header'
import AlbumList from './components/AlbumList'
import PlaylistManager from './components/PlaylistManager'
import PlayerBar from './components/PlayerBar'

export default function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <Header />
        <div className="grid">
          <div>
            <AlbumList />
          </div>
          <div>
            <PlaylistManager />
            <div style={{ height: 12 }} />
            <div className="card">
              <h4 style={{ margin: 0 }}>Now Playing</h4>
              <div className="small" style={{ marginTop: 8 }}>The player appears at the bottom when a track is played.</div>
            </div>
          </div>
        </div>
        <PlayerBar />
      </div>
    </PlayerProvider>
  )
}
