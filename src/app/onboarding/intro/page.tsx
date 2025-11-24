"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ArrowRight, Brain, BookOpen } from "lucide-react";

export default function IntroPage() {
    const router = useRouter();

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.title}>Forget "Learning".<br />Start <span className={styles.highlight}>Living</span> it.</h1>

                <div className={styles.comparison}>
                    <div className={`${styles.card} ${styles.oldWay}`}>
                        <BookOpen size={32} className={styles.icon} />
                        <h3>The Old Way</h3>
                        <p>Memorizing lists, grammar rules, and feeling anxious.</p>
                    </div>

                    <div className={styles.arrow}>
                        <ArrowRight size={24} />
                    </div>

                    <div className={`${styles.card} ${styles.newWay}`}>
                        <Brain size={32} className={styles.icon} />
                        <h3>The JusTalk Way</h3>
                        <p>Immersive stories, natural acquisition, and zero stress.</p>
                    </div>
                </div>

                <p className={styles.description}>
                    We don't teach you language. We let you experience it through cinema-quality stories and AI-powered conversations.
                </p>

                <button className={styles.button} onClick={() => router.push("/onboarding/assessment")}>
                    Start My Journey
                    <ArrowRight size={20} />
                </button>
            </div>
        </main>
    );
}
