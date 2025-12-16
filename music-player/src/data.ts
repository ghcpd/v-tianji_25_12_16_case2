export interface Track {
  id: string;
  title: string;
  duration: number; // seconds
}

export interface Album {
  id: string;
  title: string;
  artist: string;
  tracks: Track[];
}

export const albums: Album[] = [
  {
    id: "1",
    title: "First Album",
    artist: "Artist A",
    tracks: [
      { id: "t1", title: "Song One", duration: 180 },
      { id: "t2", title: "Song Two", duration: 210 },
    ],
  },
  {
    id: "2",
    title: "Second Album",
    artist: "Artist B",
    tracks: [
      { id: "t3", title: "Another Song", duration: 200 },
      { id: "t4", title: "Last Track", duration: 240 },
    ],
  },
];
