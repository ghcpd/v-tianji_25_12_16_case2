import React, { createContext, useContext, useState } from 'react';

const MusicContext = createContext();

export const useMusic = () => useContext(MusicContext);

export const MusicProvider = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playlists, setPlaylists] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const playTrack = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const pauseTrack = () => {
    setIsPlaying(false);
  };

  const resumeTrack = () => {
    if (currentTrack) setIsPlaying(true);
  };

  const addToPlaylist = (playlistName, track) => {
    setPlaylists(prev => {
      const existing = prev.find(p => p.name === playlistName);
      if (existing) {
        if (!existing.tracks.find(t => t.id === track.id)) {
          return prev.map(p => p.name === playlistName ? { ...p, tracks: [...p.tracks, track] } : p);
        }
        return prev;
      } else {
        return [...prev, { name: playlistName, tracks: [track] }];
      }
    });
  };

  const createPlaylist = (name) => {
    if (!playlists.find(p => p.name === name)) {
      setPlaylists(prev => [...prev, { name, tracks: [] }]);
    }
  };

  const toggleFavorite = (track) => {
    setFavorites(prev => {
      const isFav = prev.find(t => t.id === track.id);
      if (isFav) {
        return prev.filter(t => t.id !== track.id);
      } else {
        return [...prev, track];
      }
    });
  };

  const isFavorite = (trackId) => favorites.some(t => t.id === trackId);

  return (
    <MusicContext.Provider value={{
      currentTrack,
      isPlaying,
      playlists,
      favorites,
      playTrack,
      pauseTrack,
      resumeTrack,
      addToPlaylist,
      createPlaylist,
      toggleFavorite,
      isFavorite,
    }}>
      {children}
    </MusicContext.Provider>
  );
};