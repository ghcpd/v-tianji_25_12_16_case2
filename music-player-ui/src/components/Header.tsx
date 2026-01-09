import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div>
        <h1 style={{margin:0}}>Music Player</h1>
        <div style={{color:'var(--muted)'}}>Browse albums and manage playlists</div>
      </div>
      <div>
        <input className="search" placeholder="Search artists, albums, tracks" />
      </div>
    </div>
  )
}
