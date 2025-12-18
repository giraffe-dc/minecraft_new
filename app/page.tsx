"use client";

import { useRef, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./Home.module.css";

export default function Home() {
  const [portalOpen, setPortalOpen] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);
  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const bgRef = useRef<HTMLAudioElement | null>(null);
  const [closing, setClosing] = useState(false);
  const [bgEnded, setBgEnded] = useState(false);
  const router = useRouter();
  const [entered, setEntered] = useState(false);

  function playAlarm() {
    // play alarm audio file from public folder (e.g. /alarm.mp3)
    try {
      if (!alarmRef.current) {
        alarmRef.current = new Audio('/errorin.mp3');
        alarmRef.current.preload = 'auto';
      }
      alarmRef.current.currentTime = 0;
      const p = alarmRef.current.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {
      console.warn('Failed to play alarm audio', e);
    }
  }

  function startBackgroundLoop() {
    try {
      if (!bgRef.current) {
        bgRef.current = new Audio('/login.mp3');
        // do not loop: we want to detect when music ends
        bgRef.current.loop = false;
        bgRef.current.preload = 'auto';
        bgRef.current.volume = 0.55;
        bgRef.current.onended = () => {
          setBgEnded(true);
          localStorage.setItem('creeper_entered','1'); 
          setEntered(true);
          setPortalOpen(false);
        };
      }
      const p = bgRef.current.play();
      if (p && typeof p.catch === 'function') p.catch(() => {});
    } catch (e) {
      console.warn('Failed to start background music', e);
    }
  }

  function stopBackgroundLoop() {
    try {
      if (bgRef.current) {
        bgRef.current.pause();
        bgRef.current.currentTime = 0;
        bgRef.current.onended = null;
        // setBgEnded(false);
      }
    } catch (e) {
      console.warn('Failed to stop background music', e);
    }
  }

  useEffect(() => {
    try {
      const v = localStorage.getItem('creeper_entered');
      if (v === '1') setEntered(true);
    } catch (e) {
      // ignore
    }
  }, []);

  function onPortalClick() {

    if(entered||bgEnded) {
      router.push('/map');
      return;
    }

    playAlarm();
    setClosing(false);
    setPortalOpen(true);
    // slight delay then show login (simulate UI reaction)
    setTimeout(() => setLoginVisible(true), 600);
    // show music player (but do not auto-play heavy background; user can press Play)
  }

  function closePortal() {
    // start closing animation
    setClosing(true);
    // stop bg music immediately
    stopBackgroundLoop();
    // after animation, actually hide portal
    const ANIM_MS = 350;
    setTimeout(() => {
      setPortalOpen(false);
      setLoginVisible(false);
      setClosing(false);
    }, ANIM_MS);
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <header className={styles.header}>
          <h1>Кріпер і загублені друзі — Пригода в біомах</h1>
          {/* <p className={styles.lead}>Ласкаво просимо. Натисніть, щоб увійти в портал.</p> */}
        </header>

        <div className={styles.centerControls}>
          <button className={styles.portalButton} onClick={onPortalClick}>
            ВХІД В ПОРТАЛ
          </button>
         
        </div>


        {portalOpen && (
          <div className={styles.portalOverlay}>
            <div className={`${styles.portalBox} ${closing ? styles.closing : ""}`}>
                <button
                  aria-label="Закрити портал"
                  className={styles.closeBtn}
                  onClick={() => { setPortalOpen(false); setLoginVisible(false); stopBackgroundLoop(); }}
                >
                  ✕
                </button>
                {loginVisible ? (
                <div>
                  <h2>Введіть логін / пароль</h2>
                  

                  <div className={styles.musicPlayer}>
                    {/* <div>Плеєр музики</div> */}
                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                      <button className={styles.primary} onClick={startBackgroundLoop}>Play</button>
                      <button className={styles.secondary} onClick={stopBackgroundLoop}>Pause</button>
                    </div>
                     
                  </div>
                </div>
              ) : (
                <div className={styles.waiting}>Активую портальну зону...</div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
