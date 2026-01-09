import React from 'react'
import { PlayerProvider } from './context/PlayerProvider'
import Header from './components/Header'
import AlbumList from './components/AlbumList'
import PlaylistManager from './components/PlaylistManager'
import PlayerBar from './components/PlayerBar'

export default function App() {
  return (
    <PlayerProvider>
      <div className="app">
        <Header />
        <div style={{display:'grid',gridTemplateColumns:'1fr 320px',gap:20}}>
          <div>
            <AlbumList />
          </div>
          <aside>
            <PlaylistManager />
          </aside>
        </div>
        <PlayerBar />
      </div>
    </PlayerProvider>
  )
}
