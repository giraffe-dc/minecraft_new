"use client";

import React from "react";
import styles from "./Modal.module.css";

export default function Modal({
  open,
  children,
  onClose,
}: {
  open: boolean;
  children: React.ReactNode;
  onClose?: () => void;
}) {
  if (!open) return null;
  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
        <div style={{ textAlign: "right", marginTop: 12 }}>
          <button className={styles.secondary} onClick={onClose}>
            Закрити
          </button>
        </div>
      </div>
    </div>
  );
}
