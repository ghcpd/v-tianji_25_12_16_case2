
import { usePlayer } from '../state/PlayerContext';

export default function PlayerControls() {
  const { state, dispatch } = usePlayer();

  if (!state.currentTrack) {
    return <div className="player-controls">No track selected</div>;
  }

  const togglePlay = () =>
    dispatch({ type: state.isPlaying ? 'PAUSE' : 'PLAY', track: state.currentTrack });

  return (
    <div className="player-controls">
      <div>
        Now playing: <strong>{state.currentTrack.title}</strong>
      </div>
      <button onClick={togglePlay}>{state.isPlaying ? 'Pause' : 'Play'}</button>
    </div>
  );
}
