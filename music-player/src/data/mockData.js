export const mockAlbums = [
  {
    id: 1,
    title: 'Album One',
    artist: 'Artist A',
    cover: 'https://via.placeholder.com/300x300?text=Album+One',
    tracks: [
      { id: 1, title: 'Track 1', artist: 'Artist A', duration: '3:45', url: 'mock-url-1' },
      { id: 2, title: 'Track 2', artist: 'Artist A', duration: '4:12', url: 'mock-url-2' },
      { id: 3, title: 'Track 3', artist: 'Artist A', duration: '2:58', url: 'mock-url-3' },
    ],
  },
  {
    id: 2,
    title: 'Album Two',
    artist: 'Artist B',
    cover: 'https://via.placeholder.com/300x300?text=Album+Two',
    tracks: [
      { id: 4, title: 'Track 4', artist: 'Artist B', duration: '3:22', url: 'mock-url-4' },
      { id: 5, title: 'Track 5', artist: 'Artist B', duration: '5:01', url: 'mock-url-5' },
    ],
  },
  // Add more if needed
];

export const allTracks = mockAlbums.flatMap(album => album.tracks.map(track => ({ ...track, albumId: album.id, albumTitle: album.title })));