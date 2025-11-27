"use client";

import styles from "./RescueModal.module.css";
import { X, Play, Volume2, RefreshCw } from "lucide-react";
import { useState } from "react";
import VideoPlayer from "@/components/player/VideoPlayer";

interface RescueModalProps {
    isOpen: boolean;
    onClose: () => void;
    onWatchClip: () => void;
    coachMessage: string;
}

export default function RescueModal({ isOpen, onClose, onWatchClip, coachMessage, videoSrc }: RescueModalProps & { videoSrc?: string }) {
    const [isPlaying, setIsPlaying] = useState(false);

    if (!isOpen) return null;

    const handlePlay = () => {
        setIsPlaying(true);
        onWatchClip();
    };

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

                    {/* Clip Player */}
                    <div className={styles.clipPlayer} onClick={!isPlaying ? handlePlay : undefined}>
                        {isPlaying && videoSrc ? (
                            <VideoPlayer
                                src={videoSrc}
                                autoPlay
                                className={styles.video}
                            />
                        ) : (
                            <>
                                <div className={styles.playOverlay}>
                                    <Play size={32} fill="currentColor" />
                                    <span>Watch Example Clip</span>
                                </div>
                                <div className={styles.thumbnail} />
                            </>
                        )}
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
