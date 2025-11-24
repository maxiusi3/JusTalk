"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Sparkles, ChevronRight } from "lucide-react";

export default function AssessmentChoicePage() {
    const router = useRouter();

    const handleStartAssessment = () => {
        // In a real app, this would go to the actual test.
        // For MVP, we'll simulate a short test flow or just skip to map for now
        // based on the plan, we need to implement the flow.
        // Let's route to a test page we'll build next.
        router.push("/onboarding/assessment/test");
    };

    const handleSkip = () => {
        // Default to A1 and go to map
        router.push("/dashboard/map?level=A1");
    };

    return (
        <main className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Let's find your starting point.</h1>
                <p className={styles.subtitle}>We'll tailor the experience to your current level.</p>
            </div>

            <div className={styles.options}>
                <button className={styles.primaryOption} onClick={handleStartAssessment}>
                    <div className={styles.optionIcon}>
                        <Sparkles size={24} />
                    </div>
                    <div className={styles.optionText}>
                        <h3>Quick 3-min Assessment</h3>
                        <p>Recommended. We'll analyze your listening and speaking.</p>
                    </div>
                    <ChevronRight className={styles.chevron} />
                </button>

                <button className={styles.secondaryOption} onClick={handleSkip}>
                    <div className={styles.optionText}>
                        <h3>Skip, I'm a beginner</h3>
                        <p>Start from the very first story.</p>
                    </div>
                    <ChevronRight className={styles.chevron} />
                </button>
            </div>
        </main>
    );
}
