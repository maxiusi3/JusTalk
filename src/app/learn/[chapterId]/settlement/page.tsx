"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Star, ArrowRight, Home } from "lucide-react";

export default function SettlementPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const router = useRouter();

    const handleFinish = () => {
        router.push("/dashboard/map?completed=true");
    };

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Chapter Complete!</h1>
                <p className={styles.subtitle}>You've mastered "The Coffee Shop Meet-Cute"</p>

                <div className={styles.starsContainer}>
                    {/* Experience Star - Always earned for finishing */}
                    <div className={styles.starWrapper}>
                        <Star size={64} className={`${styles.star} ${styles.earned}`} fill="#FFD700" color="#FFD700" />
                        <span className={styles.starLabel}>Experience</span>
                    </div>

                    {/* Action Star - Earned for Micro-Chat */}
                    <div className={styles.starWrapper}>
                        <Star size={64} className={`${styles.star} ${styles.earned}`} fill="#FFD700" color="#FFD700" />
                        <span className={styles.starLabel}>Action</span>
                    </div>

                    {/* Booked Star - Always locked for tomorrow */}
                    <div className={styles.starWrapper}>
                        <div className={styles.lockedStar}>
                            <Star size={64} className={styles.star} color="#ccc" />
                            <div className={styles.bookedBadge}>Booked</div>
                        </div>
                        <span className={styles.starLabel}>Mastery</span>
                    </div>
                </div>

                <div className={styles.messageBox}>
                    <h3>Mastery Star Booked!</h3>
                    <p>Come back tomorrow to review and unlock your final star.</p>
                </div>

                <button className={styles.finishButton} onClick={handleFinish}>
                    Back to Map
                    <Home size={20} />
                </button>
            </div>
        </main>
    );
}
