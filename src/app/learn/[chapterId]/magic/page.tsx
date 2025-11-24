"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import VideoPlayer from "@/components/player/VideoPlayer";
import { Star, ArrowRight, Sparkles } from "lucide-react";

export default function MagicMomentPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();
    const [videoEnded, setVideoEnded] = useState(false);
    const [showCelebration, setShowCelebration] = useState(false);

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

    return (
        <main className={styles.container}>
            {!showCelebration ? (
                <div className={styles.theaterMode}>
                    <VideoPlayer
                        src={videoSrc}
                        autoPlay
                        className={styles.player}
                        onEnded={handleVideoEnd}
                    />
                    <div className={styles.controlsOverlay}>
                        {!videoEnded && (
                            <div className={styles.theaterHint}>
                                <Sparkles size={16} className={styles.sparkleIcon} />
                                Magic Moment: No Subtitles
                            </div>
                        )}
                        <button className={styles.skipButton} onClick={handleSkip}>
                            Skip <ArrowRight size={16} />
                        </button>
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
