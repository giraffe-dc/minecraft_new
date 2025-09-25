"use client";

import { useState, useEffect } from "react";
import MapComp from "../components/Map";
import pageStyles from "../MapPage.module.css";
import mapStyles from "../Map.module.css";
import { useRouter } from "next/navigation";

export default function MapPage() {
  const router = useRouter();
  const [foundIslands, setFoundIslands] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const completed = JSON.parse(localStorage.getItem('completedIslands') || '[]');
    const foundMap: Record<string, boolean> = {};
    for (const islandId of completed) {
      foundMap[islandId] = true;
    }
    setFoundIslands(foundMap);

    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'completedIslands') {
        const newCompleted = JSON.parse(event.newValue || '[]');
        const newFoundMap: Record<string, boolean> = {};
        for (const islandId of newCompleted) {
          newFoundMap[islandId] = true;
        }
        setFoundIslands(newFoundMap);
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const friends = [
    { id: "spark", name: "SPARK", emoji: "✨" },
    { id: "joy", name: "JOY", emoji: "🎉" },
    { id: "brave", name: "BRAVE", emoji: "🛡️" },
    { id: "luck", name: "LUCK", emoji: "🍀" },
    { id: "peace", name: "PEACE", emoji: "☮️" },
    { id: "hope", name: "HOPE", emoji: "🌟" },
  ];

  function resetProgress() {
    try {
      localStorage.removeItem('creeper_entered');
      localStorage.removeItem('completedIslands'); // Also clear island progress
    } catch (e) {}
    router.push('/');
  }

  return (
    <div className={pageStyles.page}>
      <main className={pageStyles.main}>
        <section className={mapStyles.mapWrap}>
          <MapComp
            started={true}
            difficulty={"5-8"}
            found={foundIslands}
            onComplete={(id) => {
              // Re-check storage when returning to the map page or when this is called
              const completed = JSON.parse(localStorage.getItem('completedIslands') || '[]');
              const foundMap: Record<string, boolean> = {};
              for (const islandId of completed) {
                foundMap[islandId] = true;
              }
              setFoundIslands(foundMap);
            }}
            friends={friends}
            centerTitle={""}
          />
        </section>
        <button className={pageStyles.resetBtn} onClick={resetProgress}>Очистка</button>
      </main>
    </div>
  );
}
''