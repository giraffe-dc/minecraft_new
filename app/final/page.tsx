import React from 'react';
import Link from 'next/link';
import styles from './FinalPage.module.css';

export default function FinalPage() {
    // Placeholder YouTube video ID. The user should provide the correct one.
    const youtubeVideoId = 'ltcijiT3YZo';

    return (
        <div className={styles.page}>
            <Link href="/map" className={styles.toMapButton}>НА МАПУ</Link>
            <h1 className={styles.text}>Дякую за допомогу! Час для танцю дружби!</h1>
            <div className={styles.videoWrapper}>
                <iframe
                    src={`https://www.youtube.com/embed/${youtubeVideoId}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                ></iframe>
            </div>
        </div>
    );
}