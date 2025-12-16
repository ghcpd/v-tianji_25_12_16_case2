import React, { useState } from 'react'
import { usePlayer } from '../context/PlayerProvider'
import { albums } from '../data/mock'

export default function PlaylistManager() {
  const { state, dispatch } = usePlayer()
  const [name, setName] = useState('')

  function create() {
    if (!name.trim()) return
    dispatch({ type: 'create_playlist', name: name.trim() })
    setName('')
  }

  function addToPlaylist(playlistId: string, trackId: string) {
    dispatch({ type: 'add_to_playlist', playlistId, trackId })
  }

  return (
    <div className="playlist">
      <h3>Playlists</h3>
      <div style={{display:'flex',gap:8,marginBottom:8}}>
        <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="New playlist name" />
        <button className="small-btn" onClick={create}>Create</button>
      </div>
      {state.playlists.map((p) => (
        <div key={p.id} className="card" style={{marginBottom:8}}>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <div>
              <div style={{fontWeight:700}}>{p.name}</div>
              <div style={{color:'var(--muted)',fontSize:13}}>{p.trackIds.length} tracks</div>
            </div>
            <div>
              <select onChange={(e)=> addToPlaylist(p.id, e.target.value)}>
                <option value="">Add track...</option>
                {albums.flatMap((a)=>a.tracks).map((t)=> <option key={t.id} value={t.id}>{t.title}</option>)}
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
