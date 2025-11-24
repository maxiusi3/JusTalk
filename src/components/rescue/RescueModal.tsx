"use client";

import styles from "./RescueModal.module.css";
import { X, Play, Volume2, RefreshCw } from "lucide-react";

interface RescueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWatchClip: () => void;
    coachMessage: string;
}

export default function RescueModal({ isOpen, onClose, onWatchClip, coachMessage }: RescueModalProps) {
    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.bottomSheet} onClick={(e) => e.stopPropagation()}>
                <div className={styles.dragHandle} />

                <div className={styles.header}>
                    <div className={styles.coachInfo}>
                        <div className={styles.coachAvatar}>
                            <span className={styles.coachEmoji}>🤖</span>
                        </div>
                        <div className={styles.coachText}>
                            <h3>AI Coach</h3>
                            <p>Let's fix this together.</p>
                        </div>
                    </div>
                    <button className={styles.closeButton} onClick={onClose}>
                        <X size={20} />
                    </button>
                </div>

                <div className={styles.content}>
                    {/* AI Tip Bubble */}
                    <div className={styles.tipBubble}>
                        <p>{coachMessage}</p>
                        <button className={styles.ttsButton} onClick={() => alert("Playing TTS...")}>
                            <Volume2 size={16} />
                        </button>
                    </div>

                    {/* Clip Player Placeholder */}
                    <div className={styles.clipPlayer} onClick={onWatchClip}>
                        <div className={styles.playOverlay}>
                            <Play size={32} fill="currentColor" />
                            <span>Watch Example Clip</span>
                        </div>
                        {/* Placeholder for video thumbnail */}
                        <div className={styles.thumbnail} />
                    </div>

                    <button className={styles.retryButton} onClick={onClose}>
                        <RefreshCw size={18} />
                        Got it, Try Again
                    </button>
                </div>
            </div>
        </div>
    );
}
