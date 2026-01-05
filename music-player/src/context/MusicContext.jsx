import React, { createContext, useState, useCallback, useEffect } from 'react';
import { mockAlbums, mockTracks, mockPlaylists } from '../data/mockData';

export const MusicContext = createContext();

export const MusicProvider = ({ children }) => {
  const [albums, setAlbums] = useState(mockAlbums);
  const [tracks, setTracks] = useState(mockTracks);
  const [playlists, setPlaylists] = useState(mockPlaylists);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // Play a track
  const playTrack = useCallback((trackId) => {
    const track = tracks.find(t => t.id === trackId);
    if (track) {
      setCurrentTrack(track);
      setIsPlaying(true);
      setCurrentTime(0);
    }
  }, [tracks]);

  // Pause/Resume track
  const togglePlayPause = useCallback(() => {
    setIsPlaying(prev => !prev);
  }, []);

  // Like/Unlike a track
  const toggleLike = useCallback((trackId) => {
    setTracks(prevTracks =>
      prevTracks.map(track =>
        track.id === trackId ? { ...track, liked: !track.liked } : track
      )
    );
  }, []);

  // Create a new playlist
  const createPlaylist = useCallback((name) => {
    const newPlaylist = {
      id: Math.max(0, ...playlists.map(p => p.id)) + 1,
      name,
      tracks: [],
      createdAt: new Date()
    };
    setPlaylists(prev => [...prev, newPlaylist]);
    return newPlaylist;
  }, [playlists]);

  // Add track to playlist
  const addTrackToPlaylist = useCallback((playlistId, trackId) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: [...playlist.tracks, trackId] }
          : playlist
      )
    );
  }, []);

  // Remove track from playlist
  const removeTrackFromPlaylist = useCallback((playlistId, trackId) => {
    setPlaylists(prevPlaylists =>
      prevPlaylists.map(playlist =>
        playlist.id === playlistId
          ? { ...playlist, tracks: playlist.tracks.filter(id => id !== trackId) }
          : playlist
      )
    );
  }, []);

  // Delete playlist
  const deletePlaylist = useCallback((playlistId) => {
    setPlaylists(prev => prev.filter(p => p.id !== playlistId));
  }, []);

  // Get tracks in a playlist
  const getPlaylistTracks = useCallback((playlistId) => {
    const playlist = playlists.find(p => p.id === playlistId);
    if (!playlist) return [];
    return playlist.tracks.map(trackId => tracks.find(t => t.id === trackId)).filter(Boolean);
  }, [playlists, tracks]);

  // Get album by ID
  const getAlbumById = useCallback((albumId) => {
    return albums.find(a => a.id === albumId);
  }, [albums]);

  // Get tracks by album
  const getAlbumTracks = useCallback((albumId) => {
    const album = getAlbumById(albumId);
    if (!album) return [];
    return album.tracks.map(trackId => tracks.find(t => t.id === trackId)).filter(Boolean);
  }, [albums, tracks, getAlbumById]);

  // Get liked tracks
  const getLikedTracks = useCallback(() => {
    return tracks.filter(t => t.liked);
  }, [tracks]);

  const value = {
    albums,
    tracks,
    playlists,
    currentTrack,
    isPlaying,
    currentTime,
    setCurrentTime,
    playTrack,
    togglePlayPause,
    toggleLike,
    createPlaylist,
    addTrackToPlaylist,
    removeTrackFromPlaylist,
    deletePlaylist,
    getPlaylistTracks,
    getAlbumById,
    getAlbumTracks,
    getLikedTracks
  };

  return (
    <MusicContext.Provider value={value}>
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = React.useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
};
