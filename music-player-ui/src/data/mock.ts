import { Album } from '../types'

// Using public example MP3 links for demo purposes
const sample = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'

export const albums: Album[] = [
  {
    id: 'a1',
    title: 'Galaxy Grooves',
    artist: 'Neon Drifters',
    cover: 'https://picsum.photos/400/300?random=101',
    tracks: [
      { id: 't1', title: 'Starlight', duration: 210, src: sample },
      { id: 't2', title: 'Comet Tail', duration: 180, src: sample },
      { id: 't3', title: 'Aurora', duration: 240, src: sample },
    ],
  },
  {
    id: 'a2',
    title: 'Midnight Lounge',
    artist: 'Velvet Echo',
    cover: 'https://picsum.photos/400/300?random=102',
    tracks: [
      { id: 't4', title: 'Blue Smoke', duration: 200, src: sample },
      { id: 't5', title: 'Moonlight Kiss', duration: 230, src: sample },
    ],
  },
]
