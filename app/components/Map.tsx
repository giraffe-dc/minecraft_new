"use client";

import React from "react";
import Link from "next/link";
import IslandCard from "./IslandCard";

type Friend = { id: string; name: string; emoji: string };

export default function Map({
  started,
  difficulty,
  found,
  onComplete,
  friends,
  centerTitle,
}: {
  started: boolean;
  difficulty: string;
  found: Record<string, boolean>;
  onComplete: (id: string) => void;
  friends: Friend[];
  centerTitle?: string;
}) {
  const islands = React.useMemo(
    () => [
      { id: "island1", title: "ПАРКУР КРІПЕРА", friend: friends[0] || { id: "", name: "", emoji: "" } },
      { id: "island2", title: "ТАНЕЦЬ БІОМІВ", friend: friends[1] || { id: "", name: "", emoji: "" } },
      { id: "island3", title: "БУДІВНИЦТВО ФОРТЕЦІ", friend: friends[2] || { id: "", name: "", emoji: "" } },
      { id: "island4", title: "КРІПЕРСЬКИЙ СМІХ", friend: friends[3] || { id: "", name: "", emoji: "" } },
      { id: "island5", title: "КВЕСТ ПАМ'ЯТІ", friend: friends[4] || { id: "", name: "", emoji: "" } },
      { id: "island6", title: "ПЕРЕДБАЧЕННЯ З ПЕЧЕР", friend: friends[5] || { id: "", name: "", emoji: "" } },
    ],
    [friends]
  );

  // Defines the position of each island in the 3x4 grid
  const islandPositions = [
    { gridRow: 1, gridColumn: 2 }, // Island 1
    { gridRow: 2, gridColumn: 3 }, // Island 2
    { gridRow: 3, gridColumn: 3 }, // Island 3
    { gridRow: 4, gridColumn: 2 }, // Island 4
    { gridRow: 3, gridColumn: 1 }, // Island 5
    { gridRow: 2, gridColumn: 1 }, // Island 6
  ];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gridTemplateRows: "repeat(4, 1fr)",
        gap: "20px",
        width: "100%",
        height: "100%",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      {islands.map((it, idx) => (
        <Link
          key={it.id}
          href={`/islands/${it.id}`}
          style={{
            ...islandPositions[idx],
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IslandCard
            id={it.id}
            title={it.title}
            friend={it.friend}
            started={started}
            difficulty={difficulty}
            completed={!!found[it.id]}
            onComplete={() => onComplete(it.id)}
            index={idx + 1}
          />
        </Link>
      ))}
      {centerTitle && (
        <div style={{ gridRow: 2, gridColumn: 2, display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center" }}>
          <h2>{centerTitle}</h2>
        </div>
      )}
    </div>
  );
}