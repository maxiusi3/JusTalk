"use client";

import styles from "./GuessingGame.module.css";
import { Play } from "lucide-react";

interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface GuessingGameProps {
    options: Option[];
    onSelect: (isCorrect: boolean) => void;
    isFocusMode?: boolean;
}

export default function GuessingGame({ options, onSelect, isFocusMode = false }: GuessingGameProps) {
    const handleSelect = (option: Option) => {
        onSelect(option.isCorrect);
    };

    return (
        <div className={styles.container}>
            <h3 className={styles.prompt}>What is happening?</h3>
            <div className={styles.optionsGrid}>
                {options.map((option) => (
                    <button
                        key={option.id}
                        className={`${styles.optionCard} ${isFocusMode && !option.isCorrect ? styles.dimmed : ""} ${isFocusMode && option.isCorrect ? styles.highlighted : ""}`}
                        onClick={() => handleSelect(option)}
                    >
                        {/* Placeholder for video/image content */}
                        <div className={styles.mediaPlaceholder}>
                            <Play size={24} className={styles.playIcon} />
                        </div>
                        <p className={styles.optionText}>{option.text}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
