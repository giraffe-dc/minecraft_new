"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './MiniPlayer.module.css';

interface MiniPlayerProps {
  playlist: string[];
}

export default function MiniPlayer({ playlist }: MiniPlayerProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio play failed:", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex + 1) % playlist.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
    setIsPlaying(true);
  };

  const handleTrackClick = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  const currentTrack = playlist[currentTrackIndex];

  return (
    <div className={styles.player}>
      <audio ref={audioRef} src={`/${currentTrack}`} key={currentTrack} onEnded={handleNext} />
      <div className={styles.trackInfo}>
        Now Playing: {currentTrack}
      </div>
      <div className={styles.controls}>
        <button onClick={handlePrev} className={styles.controlButton}>&#9664;</button>
        <button onClick={handlePlayPause} className={styles.controlButton}>
          {isPlaying ? '❚❚' : '▶'}
        </button>
        <button onClick={handleNext} className={styles.controlButton}>&#9654;</button>
      </div>
      <ul className={styles.playlist}>
        {playlist.map((track, index) => (
          <li
            key={index}
            className={`${styles.track} ${index === currentTrackIndex ? styles.activeTrack : ''}`}
            onClick={() => handleTrackClick(index)}
          >
            {index + 1}. {track}
          </li>
        ))}
      </ul>
    </div>
  );
}
''