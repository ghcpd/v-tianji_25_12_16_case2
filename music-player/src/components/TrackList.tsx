
import type { Track } from '../data';
import { usePlayer } from '../state/PlayerContext';

interface Props {
  tracks: Track[];
}

const TrackList: React.FC<Props> = ({ tracks }) => {
  const { state, dispatch } = usePlayer();

  const play = (track: Track) => dispatch({ type: 'PLAY', track });
  const toggleLike = (id: string) => dispatch({ type: 'TOGGLE_LIKE', trackId: id });

  return (
    <ul className="track-list">
      {tracks.map((track) => (
        <li key={track.id} className="track">
          <button onClick={() => play(track)}>
            {state.currentTrack?.id === track.id && state.isPlaying ? '⏸' : '▶️'}
          </button>
          <span>{track.title}</span>
          <span>
            ({Math.floor(track.duration / 60)}:{String(track.duration % 60).padStart(2, '0')})
          </span>
          <button onClick={() => toggleLike(track.id)}>
            {state.likedTrackIds.has(track.id) ? '❤️' : '🤍'}
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TrackList;
