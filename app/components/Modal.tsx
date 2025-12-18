"use client";

import React from "react";
import styles from "./Modal.module.css";

export default function Modal({
  open,
  children,
  onClose,
  backgroundVideo,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
  backgroundVideo?: string;
}) {
  if (!open) return null;
  return (
    <div className={styles.modalBackdrop}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {backgroundVideo && (
          <video
            autoPlay
            loop
            muted
            // poster="/cheer.jpg"
            className={styles.backgroundVideo}
          >
            <source src={`/${backgroundVideo}.mp4`} type="video/mp4" />
            
          </video>
        )}
        <div className={styles.content}>
          {children}
        </div>
      </div>
    </div>
  );
}
