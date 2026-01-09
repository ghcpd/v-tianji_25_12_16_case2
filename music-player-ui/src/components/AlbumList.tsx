import React from 'react'
import { albums } from '../data/mock'
import AlbumCard from './AlbumCard'

export default function AlbumList() {
  return (
    <div>
      <h2 style={{marginTop:0}}>Albums</h2>
      <div className="grid">
        {albums.map((a) => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>
    </div>
  )
}
