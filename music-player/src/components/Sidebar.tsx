import React, { useState } from 'react'
import { usePlayer } from '../state/player'

export const Sidebar: React.FC = () => {
  const { state, dispatch } = usePlayer()
  const [name, setName] = useState('')

  return (
    <div className="card">
      <h3>Playlists</h3>
      <div className="playlist-list">
        {state.playlists.map((p) => (
          <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 700 }}>{p.name}</div>
              <div style={{ fontSize: 12, color: 'var(--muted)' }}>{p.trackIds.length} tracks</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12 }}>
        <input value={name} onChange={(e) => setName(e.target.value)} className="input" placeholder="New playlist name" />
        <div style={{ marginTop: 8 }}>
          <button className="button" onClick={() => { if (name.trim()){ dispatch({ type: 'CREATE_PLAYLIST', name: name.trim() }); setName('') } }} aria-label="create-playlist">Create</button>
        </div>
      </div>
    </div>
  )
}
