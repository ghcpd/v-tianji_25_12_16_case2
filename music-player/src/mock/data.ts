export type Track = {
  id: string
  title: string
  duration: number // seconds
}

export type Album = {
  id: string
  title: string
  artist: string
  cover: string
  tracks: Track[]
}

export const albums: Album[] = [
  {
    id: 'alb1',
    title: 'Neon Dreams',
    artist: 'Synthwave Collective',
    cover: 'https://images.unsplash.com/photo-1495435229349-e86db7bfa013?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=2a0b8b9a2a7b0a9d3e4a7d8b0c3a1e2f',
    tracks: [
      { id: 't1', title: 'Midnight Drive', duration: 210 },
      { id: 't2', title: 'City Lights', duration: 186 },
      { id: 't3', title: 'Afterburn', duration: 240 }
    ]
  },
  {
    id: 'alb2',
    title: 'Acoustic Mornings',
    artist: 'The Strummers',
    cover: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&s=1f6a89f3b0d3a1b2c3d4e5f6a7b8c9d0',
    tracks: [
      { id: 't4', title: 'Sunrise', duration: 200 },
      { id: 't5', title: 'Porch Swing', duration: 176 }
    ]
  }
]
