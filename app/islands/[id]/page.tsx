"use client"

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './IslandPage.module.css';
import Modal from '../../components/Modal';
import MiniPlayer from '../../components/MiniPlayer';
import VideoPlayer from '../../components/VideoPlayer'; // Import the new component

// --- Type Definitions ---
type IslandDetail = {
  title: string;
  hero: string;
  result?: string;
  creeperQuote?: string;
  location?: string;
  goal?: string;
  description?: string[];
  music?: string[]; // New music property
  video?: string[]; // New video property
};

// --- Data ---
const islandDetails: Record<string, IslandDetail> = {
  island1: {
    title: 'Джунглі: «ПАРКУР КРІПЕРА»',
    hero: 'spark',
    
       
  },
  island2: {
    title: '🌴 Сафарі: «ТАНЕЦЬ БІОМІВ»',
    hero: 'joy',    
    music: ['rezinka.mp3', 'rezinka1.mp3', 'rezinka2.mp3', 'rezinka3.mp3','multiplay.mp3'], // Added music
    
     // Added music
  },
  island3: {
    title: '🏜️ Закинута шахта: «БУДІВНИЦТВО ФОРТЕЦІ»',
    hero: 'brave',
    video: ['fonTetris1.mp4', 'TetrisG.mp4'], // Added video
    
  },
  island4: {
    title: '🌵 Дубовий ліс «КРІПЕРСЬКИЙ СМІХ»',
    hero: 'luck',
    
    music: ['snih.mp3', 'gilet.mp3'], // Added music
   
  },
  island5: {
    title: ' Болото: «КВЕСТ ПАМ’ЯТІ»',
    hero: 'peace',
    music: ['chek.mp3'], // Added music
  },
  island6: {
    title: '❄️Печери: «ПЕРЕДБАЧЕННЯ З ПЕЧЕР»',
    hero: 'hope',
    music: ['foresight/foresight1.mp3', 'foresight/foresight2.mp3', 'foresight/foresight3.mp3', 'foresight/foresight4.mp3', 'foresight/foresight5.mp3', 'foresight/foresight6.mp3', 'foresight/foresight7.mp3', 'foresight/foresight8.mp3', 'foresight/foresight9.mp3', 'foresight/foresight10.mp3', 'foresight/foresight11.mp3', 'foresight/foresight12.mp3', 'foresight/foresight13.mp3', 'foresight/foresight14.mp3', 'foresight/foresight15.mp3', 'foresight/foresight16.mp3', 'foresight/foresight17.mp3', 'foresight/foresight18.mp3', 'foresight/foresight19.mp3', 'foresight/foresight20.mp3', 'foresight/foresight21.mp3', 'foresight/foresight22.mp3', 'foresight/foresight23.mp3', 'foresight/foresight24.mp3', 'foresight/foresight25.mp3', 'foresight/foresight26.mp3', 'foresight/foresight27.mp3', 'foresight/foresight28.mp3', 'foresight/foresight29.mp3', 'foresight/foresight30.mp3', 'foresight/foresight31.mp3', 'foresight/foresight32.mp3', 'foresight/foresight33.mp3', 'foresight/foresight34.mp3', 'foresight/foresight35.mp3', 'foresight/foresight36.mp3', 'foresight/foresight37.mp3', 'foresight/foresight38.mp3', 'foresight/foresight39.mp3', 'foresight/foresight40.mp3', 'foresight/foresight41.mp3', 'foresight/foresight42.mp3'], // Added music
  },
};

type IslandID = keyof typeof islandDetails;

function isValidIslandId(id: any): id is IslandID {
  return id in islandDetails;
}

// --- Component ---
export default function IslandPage({ params }: { params: { id: string } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const router = useRouter();

    const islandId = params.id;
    if (!isValidIslandId(islandId)) {
        return <div>Неправильний ID острова</div>;
    }

    const island = islandDetails[islandId];

    useEffect(() => {
        const completedItems: string[] = JSON.parse(localStorage.getItem('completedIslands') || '[]');
        if (completedItems.includes(islandId)) {
            setIsCompleted(true);
        }
    }, [islandId]);

    const handleComplete = () => {
        const completedItems: string[] = JSON.parse(localStorage.getItem('completedIslands') || '[]');
        let newCompleted = [...completedItems];
        if (!completedItems.includes(islandId)) {
            newCompleted.push(islandId);
            localStorage.setItem('completedIslands', JSON.stringify(newCompleted));
        }
        setIsCompleted(true);
        setIsModalOpen(true);

        const audio = new Audio('/style.mp3');
        audio.play();

        if (newCompleted.length === Object.keys(islandDetails).length) {
            setTimeout(() => {
                router.push('/final');
            }, 2000);
        }
    };

    const islandStyle = styles[islandId as keyof typeof styles];

    return (
        <>
            <Link href="/map" className={styles.toMapButton}>НА МАПУ</Link>
            <div className={`${styles.page} ${islandStyle}`}>
                <div className={styles.contentBox}>
                    <h1>{island.title}</h1>
                    {island.location && <p><strong>Локація:</strong> {island.location}</p>}
                    {island.goal && <p><strong>Мета:</strong> {island.goal}</p>}
                    
                    {island.description && (
                        <div>
                            <h3>Опис:</h3>
                            <ul>
                                {island.description.map((item, index) => <li key={index}>{item}</li>)}
                            </ul>
                        </div>
                    )}          
                    {island.result && <>
                    <p><strong>Результат:</strong> {island.result}</p>
                    <p><em>{island.creeperQuote}</em></p></>}         


                     {island.music && island.music.length > 0 && (
                        <MiniPlayer playlist={island.music} />
                    )}

                    {island.video && island.video.length > 0 && (
                        <VideoPlayer playlist={island.video} />
                    )}

                    <div style={{ textAlign: 'center', marginTop: '20px' }}>
                        {!isCompleted && (
                            <button onClick={handleComplete} className={styles.primaryButton}>
                                Виконано
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 style={{textAlign: 'center'}}>Завдання виконано!</h2>
                <p style={{textAlign: 'center'}}>Ви знайшли нового друга!</p>
                <Image src={`/${island.hero}.jpg`} alt={island.hero} width={400} height={400} style={{ margin: 'auto', display: 'block' }} />
            </Modal>
        </>
    );
}
