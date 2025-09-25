"use client";

import React, { useState } from "react";
import styles from "../IslandCard.module.css";

export default function IslandCard({
  id,
  title,
  friend,
  started,
  difficulty,
  completed,
  onComplete,
  index,
}: {
  id: string;
  title: string;
  friend: { id: string; name: string; emoji: string };
  started: boolean;
  difficulty: string;
  completed: boolean;
  onComplete: () => void;
  index: number;
}) {
  const [busy, setBusy] = useState(false);

  function runTask() {
    if (!started || completed) return;
    setBusy(true);
    // Simulate task duration depending on difficulty
    const ms = difficulty === "9-11" ? 4000 : 2500;
    setTimeout(() => {
      setBusy(false);
      onComplete();
    }, ms);
  }
// console.log(id)
  return (
    <div className={`${styles.island} ${completed ? styles.islandDone : ""}`} style={{backgroundImage: `url(/${id}.webp)`}}>
      <div className={styles.islandHeader}>
        {/* <div className={styles.islandIndex}>{index}</div> */}
        <h3>{title}</h3>
      </div>
      <p className={styles.task}>
        {completed ? (
          <span>Друг знайдений: {friend.name} {friend.emoji}</span>
        ) : (
          <>
            {/* Завдання: {difficulty === "9-11" ? "Складніший режим" : "Простий режим"} */}
          </>
        )}
      </p>
      <div className={styles.cardActions}>
        {/* <button
          className={styles.primary}
          onClick={runTask}
          disabled={!started || busy || completed}
        >
          {completed ? "Виконано" : busy ? "В процесі..." : "Розпочати"}
        </button> */}
      </div>
    </div>
  );
}
