"use client";

import styles from "./ChapterNode.module.css";
import { Lock, Star, Play, Check } from "lucide-react";

interface ChapterNodeProps {
    id: string;
    title: string;
    status: "locked" | "unlocked" | "completed";
    stars?: number; // 0-3
    position: { x: number; y: number }; // Percentage relative to container
    onClick: () => void;
}

export default function ChapterNode({ id, title, status, stars = 0, position, onClick }: ChapterNodeProps) {
    return (
        <div
            className={`${styles.nodeWrapper} ${styles[status]}`}
            style={{ left: `${position.x}%`, top: `${position.y}%` }}
            onClick={status !== "locked" ? onClick : undefined}
        >
            <div className={styles.nodeCircle}>
                {status === "locked" && <Lock size={20} />}
                {status === "unlocked" && <Play size={24} fill="currentColor" className={styles.playIcon} />}
                {status === "completed" && <Check size={24} strokeWidth={3} />}
            </div>

            <div className={styles.nodeInfo}>
                <span className={styles.title}>{title}</span>
                {status === "completed" && (
                    <div className={styles.stars}>
                        {[1, 2, 3].map((i) => {
                            // Logic for "Booked" star (3rd star)
                            // If user has 2 stars, the 3rd one is "booked" (pre-ordered)
                            const isBooked = i === 3 && stars === 2;

                            return (
                                <Star
                                    key={i}
                                    size={12}
                                    fill={i <= stars ? "var(--gold)" : "none"}
                                    color={i <= stars ? "var(--gold)" : (isBooked ? "var(--primary)" : "var(--border)")}
                                    className={isBooked ? styles.bookedStar : undefined}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
}
