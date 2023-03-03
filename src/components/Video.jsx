import { useRef, useEffect } from "react";
import useVideoPlayer from "../hooks/useVideoPlayer";
import "./video.css";

export default function Video({ item, setDirection }) {
  useEffect(() => {
    videoRef.current?.load();
  }, [item]);

  const videoRef = useRef(null);
  const {
    playerState,
    togglePlay,
    handleTimeUpdate,
    handleProgress,
    handleVolume,
    toggleMute,
  } = useVideoPlayer(videoRef, item);

  const goTonext = () => setDirection("next");
  const goToPrev = () => setDirection("prev");

  const toTimeString = (number) => {
    return (
      String(parseInt(number / 3600)) +
      ":" +
      String(parseInt(number / 60)) +
      ":" +
      String(number % 60)
    );
  };

  return (
    <div className="video-wrapper">
      <video
        muted={false}
        preload="none"
        controls={false}
        ref={videoRef}
        onTimeUpdate={handleTimeUpdate}
      >
        <source src={item?.video_url} type="video/mp4" />
      </video>
      <div className="controls">
        <div className="actions">
          {playerState.reachingEnd && (
            <i class="bx bx-skip-previous control-btn" onClick={goToPrev}></i>
          )}
          <div className="volume-setting">
            <button onClick={toggleMute}>
              {!playerState.isMuted ? (
                <i className="bx bxs-volume-full"></i>
              ) : (
                <i className="bx bxs-volume-mute"></i>
              )}
            </button>
            <input
              className="volume"
              type="range"
              min="0"
              max="10"
              value={playerState.volume}
              onChange={(e) => handleVolume(e)}
            />
          </div>
          <button onClick={togglePlay}>
            {!playerState.isPlaying ? (
              <i className="bx bx-play-circle"></i>
            ) : (
              <i className="bx bx-pause-circle"></i>
            )}
          </button>

          <input
            className="time"
            type="range"
            min="0"
            max="100"
            value={playerState.progress}
            onChange={(e) => handleProgress(e)}
          />

          <span>
            {videoRef.current?.currentTime
              ? toTimeString(parseInt(videoRef.current?.currentTime))
              : item?.time}
          </span>
          <span>{item?.title}</span>
          {playerState.reachingEnd && (
            <i class="bx bx-skip-next control-btn" onClick={goTonext}></i>
          )}
        </div>
      </div>
    </div>
  );
}
