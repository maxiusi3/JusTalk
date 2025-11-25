"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Star, ArrowRight, Sparkles, Play, Pause } from "lucide-react";

export default function MagicMomentPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();
    const [videoEnded, setVideoEnded] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);
    const [isPlaying, setIsPlaying] = useState(true);
    const [progress, setProgress] = useState(0);
    const videoRef = useRef<HTMLVideoElement>(null);

    // Full chapter video (no subtitles)
    const videoSrc = "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    const handleVideoEnd = () => {
        setVideoEnded(true);
        setTimeout(() => setShowCelebration(true), 500);
    };

    const handleFinish = () => {
        // Navigate to Micro-Chat (v1.1) or back to map
        router.push(`/learn/${params.chapterId}/chat`);
    };

    // Fallback: Show continue button after 10s if video fails or is skipped
    const handleSkip = () => {
        setVideoEnded(true);
        setShowCelebration(true);
    };

    // Helper function to format time for display
    const formatTime = (seconds: number) => {
        if (isNaN(seconds)) return "00:00";
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    };

    return (
        <main className={styles.container}>
            {!showCelebration ? (
                <div className={styles.theaterMode}>
                    <div className={styles.theaterHint}>
                        <Sparkles size={16} className={styles.sparkleIcon} />
                        Magic Moment: No Subtitles
                    </div>

                    {/* Video Player with Custom Controls */}
                    <div className={styles.videoWrapper}>
                        <video
                            ref={videoRef}
                            className={styles.video}
                            src={videoSrc}
                            autoPlay
                            playsInline
                            onEnded={handleVideoEnd}
                            onTimeUpdate={() => {
                                if (videoRef.current) {
                                    setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
                                }
                            }}
                            onPlay={() => setIsPlaying(true)}
                            onPause={() => setIsPlaying(false)}
                        />

                        <div className={styles.controlsOverlay}>
                            <button
                                className={styles.playPauseButton}
                                onClick={() => {
                                    if (videoRef.current) {
                                        if (videoRef.current.paused) {
                                            videoRef.current.play();
                                        } else {
                                            videoRef.current.pause();
                                        }
                                    }
                                }}
                            >
                                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                            </button>

                            <div className={styles.progressContainer}>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={progress}
                                    className={styles.progressBar}
                                    onChange={(e) => {
                                        const newProgress = parseFloat(e.target.value);
                                        setProgress(newProgress);
                                        if (videoRef.current) {
                                            videoRef.current.currentTime = (newProgress / 100) * videoRef.current.duration;
                                        }
                                    }}
                                />
                            </div>

                            <div className={styles.timeDisplay}>
                                {formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={styles.celebration}>
                    <div className={styles.starsContainer}>
                        <Star size={48} className={`${styles.star} ${styles.star1}`} fill="var(--gold)" color="var(--gold)" />
                        <Star size={64} className={`${styles.star} ${styles.star2}`} fill="var(--gold)" color="var(--gold)" />
                        <div className={styles.lockedStarWrapper}>
                            <Star size={48} className={`${styles.star} ${styles.star3}`} color="var(--border)" />
                            <div className={styles.lockedBadge}>Tomorrow</div>
                        </div>
                    </div>

                    <h1 className={styles.title}>Unbelievable!</h1>
                    <p className={styles.subtitle}>You just watched the whole scene without subtitles.</p>

                    <div className={styles.feedback}>
                        <p>How did it feel?</p>
                        <div className={styles.emojis}>
                            <button className={styles.emojiBtn}>🤯</button>
                            <button className={styles.emojiBtn}>😲</button>
                            <button className={styles.emojiBtn}>🙂</button>
                        </div>
                    </div>

                    <button className={styles.finishButton} onClick={handleFinish}>
                        Continue to Chat
                        <ArrowRight size={20} />
                    </button>
                </div>
            )}
        </main>
    );
}
