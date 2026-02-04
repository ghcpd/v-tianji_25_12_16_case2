import React, { useState } from 'react'
import { usePlayer } from '../context/PlayerContext'

export default function PlaylistManager() {
  const { playlists, createPlaylist } = usePlayer()
  const [name, setName] = useState('')

  function onCreate(e) {
    e.preventDefault()
    if (!name.trim()) return
    createPlaylist(name.trim())
    setName('')
  }

  return (
    <div className="card">
      <h4 style={{ margin: 0 }}>Playlists</h4>
      <div className="small" style={{ marginTop: 8 }}>Create playlists and add tracks to organize your favorites.</div>

      <form style={{ marginTop: 12, display: 'flex', gap: 8 }} onSubmit={onCreate}>
        <input className="input" placeholder="New playlist name" value={name} onChange={e => setName(e.target.value)} data-testid="pl-input" />
        <button className="btn primary" onClick={onCreate} data-testid="pl-create">Create</button>
      </form>

      <div style={{ marginTop: 12 }} className="playlists" data-testid="pl-list">
        {playlists.length === 0 && <div className="small">No playlists yet — create one.</div>}
        {playlists.map(pl => (
          <div key={pl.id} className="playlist" data-testid={`pl-${pl.id}`}>
            <div>
              <div style={{ fontWeight: 700 }}>{pl.name}</div>
              <div className="small">{pl.trackIds.length} tracks</div>
            </div>
            <div className="small">•••</div>
          </div>
        ))}
      </div>
    </div>
  )
}
