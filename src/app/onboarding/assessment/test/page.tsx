"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Volume2, CheckCircle, ArrowRight } from "lucide-react";

const QUESTIONS = [
    {
        id: 1,
        type: "listening",
        audio: "Where is the library?",
        options: [
            { id: "a", text: "It's on the table.", correct: false },
            { id: "b", text: "Go straight and turn left.", correct: true },
            { id: "c", text: "I like reading books.", correct: false },
        ],
    },
    {
        id: 2,
        type: "listening",
        audio: "What time is it?",
        options: [
            { id: "a", text: "It's 5 o'clock.", correct: true },
            { id: "b", text: "I have a watch.", correct: false },
            { id: "c", text: "Yes, please.", correct: false },
        ],
    },
];

export default function AssessmentTestPage() {
    const router = useRouter();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isFinished, setIsFinished] = useState(false);

    const handleOptionSelect = (optionId: string) => {
        setSelectedOption(optionId);
    };

    const handleNext = () => {
        if (currentQuestion < QUESTIONS.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedOption(null);
        } else {
            setIsFinished(true);
        }
    };

    const handleFinish = () => {
        // Simulate analyzing results
        router.push("/dashboard/map?level=A2");
    };

    if (isFinished) {
        return (
            <main className={styles.container}>
                <div className={styles.resultCard}>
                    <div className={styles.successIcon}>
                        <CheckCircle size={48} />
                    </div>
                    <h1>Assessment Complete!</h1>
                    <p>Based on your results, we recommend starting at:</p>
                    <div className={styles.levelBadge}>Level A2</div>
                    <p className={styles.levelDesc}>You have a good foundation. Let's build on it.</p>
                    <button className={styles.button} onClick={handleFinish}>
                        Start Learning
                        <ArrowRight size={20} />
                    </button>
                </div>
            </main>
        );
    }

    const question = QUESTIONS[currentQuestion];

    return (
        <main className={styles.container}>
            <div className={styles.progress}>
                Question {currentQuestion + 1} of {QUESTIONS.length}
            </div>

            <div className={styles.card}>
                <div className={styles.audioSection}>
                    <button className={styles.audioButton}>
                        <Volume2 size={32} />
                    </button>
                    <p>Listen and choose the best response</p>
                </div>

                <div className={styles.options}>
                    {question.options.map((option) => (
                        <button
                            key={option.id}
                            className={`${styles.option} ${selectedOption === option.id ? styles.selected : ""}`}
                            onClick={() => handleOptionSelect(option.id)}
                        >
                            {option.text}
                        </button>
                    ))}
                </div>

                <button
                    className={styles.nextButton}
                    disabled={!selectedOption}
                    onClick={handleNext}
                >
                    Next
                </button>
            </div>
        </main>
    );
}
