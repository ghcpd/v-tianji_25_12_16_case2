import React from 'react'

export default function Header() {
  return (
    <div className="header">
      <div className="brand">
        <div className="logo">MP</div>
        <div>
          <h3 className="h1">Music Player</h3>
          <div className="h2">Browse albums • Build playlists • Like your favorites</div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <button className="btn">Explore</button>
        <button className="btn">Sign in</button>
      </div>
    </div>
  )
}
