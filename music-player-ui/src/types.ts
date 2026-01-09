export type Track = {
  id: string
  title: string
  duration: number
  src: string
}

export type Album = {
  id: string
  title: string
  artist: string
  cover: string
  tracks: Track[]
}

export type Playlist = {
  id: string
  name: string
  trackIds: string[]
}