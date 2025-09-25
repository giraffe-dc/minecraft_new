"use client";

import React, { useState, useRef, useEffect } from 'react';
import styles from './VideoPlayer.module.css';

interface VideoPlayerProps {
  playlist: string[];
}

export default function VideoPlayer({ playlist }: VideoPlayerProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleNext = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % playlist.length);
  };

  const handlePrev = () => {
    setCurrentVideoIndex((prevIndex) => (prevIndex - 1 + playlist.length) % playlist.length);
  };

  const handleVideoClick = (index: number) => {
    setCurrentVideoIndex(index);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [currentVideoIndex]);

  const currentVideo = playlist[currentVideoIndex];

  return (
    <div className={styles.videoContainer}>
      <video ref={videoRef} className={styles.videoPlayer} controls autoPlay onEnded={handleNext}>
        <source src={`/${currentVideo}`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className={styles.controls}>
        <button onClick={handlePrev} className={styles.controlButton}>&#9664;</button>
        <button onClick={handleNext} className={styles.controlButton}>&#9654;</button>
      </div>
      <ul className={styles.playlist}>
        {playlist.map((video, index) => (
          <li
            key={index}
            className={`${styles.track} ${index === currentVideoIndex ? styles.activeTrack : ''}`}
            onClick={() => handleVideoClick(index)}
          >
            {index + 1}. {video}
          </li>
        ))}
      </ul>
    </div>
  );
}