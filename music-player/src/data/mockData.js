// Mock data for the music player application

export const mockAlbums = [
  {
    id: 1,
    title: "Midnight Dreams",
    artist: "Luna Echo",
    cover: "https://via.placeholder.com/200?text=Midnight+Dreams",
    year: 2023,
    tracks: [1, 2, 3, 4]
  },
  {
    id: 2,
    title: "Neon Lights",
    artist: "Cyber Pulse",
    cover: "https://via.placeholder.com/200?text=Neon+Lights",
    year: 2023,
    tracks: [5, 6, 7, 8]
  },
  {
    id: 3,
    title: "Ocean Waves",
    artist: "Coastal Sounds",
    cover: "https://via.placeholder.com/200?text=Ocean+Waves",
    year: 2022,
    tracks: [9, 10, 11, 12]
  },
  {
    id: 4,
    title: "Electric Horizon",
    artist: "Synth Masters",
    cover: "https://via.placeholder.com/200?text=Electric+Horizon",
    year: 2023,
    tracks: [13, 14, 15]
  }
];

export const mockTracks = [
  {
    id: 1,
    title: "Starlight",
    artist: "Luna Echo",
    album: 1,
    duration: 210,
    liked: false
  },
  {
    id: 2,
    title: "Midnight Prayer",
    artist: "Luna Echo",
    album: 1,
    duration: 245,
    liked: false
  },
  {
    id: 3,
    title: "Dreams of You",
    artist: "Luna Echo",
    album: 1,
    duration: 198,
    liked: false
  },
  {
    id: 4,
    title: "Fade Away",
    artist: "Luna Echo",
    album: 1,
    duration: 225,
    liked: false
  },
  {
    id: 5,
    title: "Neon City",
    artist: "Cyber Pulse",
    album: 2,
    duration: 195,
    liked: false
  },
  {
    id: 6,
    title: "Digital Love",
    artist: "Cyber Pulse",
    album: 2,
    duration: 240,
    liked: false
  },
  {
    id: 7,
    title: "Synthetic Heart",
    artist: "Cyber Pulse",
    album: 2,
    duration: 215,
    liked: false
  },
  {
    id: 8,
    title: "Electric Dreams",
    artist: "Cyber Pulse",
    album: 2,
    duration: 205,
    liked: false
  },
  {
    id: 9,
    title: "Wave Dancer",
    artist: "Coastal Sounds",
    album: 3,
    duration: 220,
    liked: false
  },
  {
    id: 10,
    title: "Sea Breeze",
    artist: "Coastal Sounds",
    album: 3,
    duration: 235,
    liked: false
  },
  {
    id: 11,
    title: "Aquatic Symphony",
    artist: "Coastal Sounds",
    album: 3,
    duration: 250,
    liked: false
  },
  {
    id: 12,
    title: "Shoreline",
    artist: "Coastal Sounds",
    album: 3,
    duration: 200,
    liked: false
  },
  {
    id: 13,
    title: "Horizon Rise",
    artist: "Synth Masters",
    album: 4,
    duration: 230,
    liked: false
  },
  {
    id: 14,
    title: "Voltage",
    artist: "Synth Masters",
    album: 4,
    duration: 215,
    liked: false
  },
  {
    id: 15,
    title: "Synth Aurora",
    artist: "Synth Masters",
    album: 4,
    duration: 225,
    liked: false
  }
];

export const mockPlaylists = [
  {
    id: 1,
    name: "My Favorites",
    tracks: [],
    createdAt: new Date()
  },
  {
    id: 2,
    name: "Chill Vibes",
    tracks: [1, 9, 10],
    createdAt: new Date()
  }
];
