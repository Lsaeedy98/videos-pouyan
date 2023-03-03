import { useState, useEffect } from "react";

const useVideoPlayer = (videoRef, item) => {
  const [playerState, setPlayerState] = useState({
    isPlaying: false,
    progress: 0,
    volume: 10,
    isMuted: false,
    reachingEnd: false,
  });

  const togglePlay = () => {
    setPlayerState({
      ...playerState,
      isPlaying: !playerState.isPlaying,
    });
  };

  useEffect(() => {
    playerState.isPlaying
      ? videoRef?.current.play()
      : videoRef?.current.pause();
  }, [playerState.isPlaying, videoRef, item]);

  const handleTimeUpdate = () => {
    const progress =
      (videoRef?.current.currentTime / videoRef?.current.duration) * 100;
    setPlayerState({
      ...playerState,
      progress,
      reachingEnd: progress > 90,
    });
  };

  const handleProgress = (event) => {
    const manualChange = Number(event.target.value);
    videoRef.current.currentTime =
      (videoRef?.current.duration / 100) * manualChange;

    setPlayerState({
      ...playerState,
      progress: manualChange,
    });
  };

  const toggleMute = () => {
    setPlayerState({
      ...playerState,
      isMuted: !playerState.isMuted,
    });
  };

  useEffect(() => {
    playerState.isMuted
      ? (videoRef.current.muted = true)
      : (videoRef.current.muted = false);
  }, [playerState.isMuted, videoRef]);

  const handleVolume = (event) => {
    const manualVolume = Number(event.target.value);

    videoRef.current.volume = manualVolume / 10;

    setPlayerState({
      ...playerState,
      volume: manualVolume,
    });
  };

  return {
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleProgress,
    handleVolume,
    toggleMute,
  };
};

export default useVideoPlayer;
