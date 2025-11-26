"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./page.module.css";
import VideoPlayer from "@/components/player/VideoPlayer";
import { ArrowRight } from "lucide-react";

export default function TrailerPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();

    // In a real app, fetch chapter data based on params.chapterId
    const chapterTitle = "Cafe Encounter";
    const trailerSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"; // Placeholder

    useEffect(() => {
        if (!params.chapterId || params.chapterId === 'undefined') {
            router.replace('/dashboard/map');
        }
    }, [params.chapterId, router]);

    const handleStartLearning = () => {
        router.push(`/learn/${params.chapterId}/practice`);
    };

    return (
        <main className={styles.container}>
            <div className={styles.videoWrapper}>
                <VideoPlayer
                    src={trailerSrc}
                    autoPlay
                    className={styles.player}
                    onEnded={() => { }} // Could auto-show button
                />

                <div className={styles.overlayContent}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.chapterTitle}>{chapterTitle}</h1>
                        <p className={styles.subtitle}>Chapter {params.chapterId} • Trailer</p>
                    </div>

                    <button className={styles.startButton} onClick={handleStartLearning}>
                        Start Chapter
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </main>
    );
}
