"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ChevronLeft, User, Settings, Award, Clock, Zap } from "lucide-react";

export default function ProfilePage() {
    const router = useRouter();

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ChevronLeft size={24} />
                </button>
                <h1>Profile</h1>
                <button className={styles.settingsButton} onClick={() => router.push("/settings")}>
                    <Settings size={24} />
                </button>
            </header>

            <div className={styles.profileHeader}>
                <div className={styles.avatar}>
                    <User size={48} />
                </div>
                <h2 className={styles.username}>User</h2>
                <p className={styles.level}>Level A2 • Explorer</p>
            </div>

            <div className={styles.statsGrid}>
                <div className={styles.statCard}>
                    <div className={`${styles.iconWrapper} ${styles.fire}`}>
                        <Zap size={24} />
                    </div>
                    <div className={styles.statValue}>3</div>
                    <div className={styles.statLabel}>Day Streak</div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.iconWrapper} ${styles.time}`}>
                        <Clock size={24} />
                    </div>
                    <div className={styles.statValue}>45m</div>
                    <div className={styles.statLabel}>Total Time</div>
                </div>
                <div className={styles.statCard}>
                    <div className={`${styles.iconWrapper} ${styles.award}`}>
                        <Award size={24} />
                    </div>
                    <div className={styles.statValue}>12</div>
                    <div className={styles.statLabel}>Stars</div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Achievements</h3>
                <div className={styles.achievementsList}>
                    <div className={styles.achievementItem}>
                        <div className={styles.achievementIcon}>🎉</div>
                        <div className={styles.achievementInfo}>
                            <h4>First Steps</h4>
                            <p>Completed the first chapter</p>
                        </div>
                    </div>
                    <div className={styles.achievementItem}>
                        <div className={styles.achievementIcon}>🗣️</div>
                        <div className={styles.achievementInfo}>
                            <h4>Talkative</h4>
                            <p>Completed 5 speaking exercises</p>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
