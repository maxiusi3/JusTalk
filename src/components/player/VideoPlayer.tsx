"use client";

import { useRef, useState, useEffect } from "react";
import styles from "./VideoPlayer.module.css";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
    loop?: boolean;
    muted?: boolean;
    onEnded?: () => void;
    className?: string;
}

export default function VideoPlayer({
    src,
    poster,
    autoPlay = false,
    loop = false,
    muted = false,
    onEnded,
    className
}: VideoPlayerProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(autoPlay);
    const [isMuted, setIsMuted] = useState(muted);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (videoRef.current) {
            if (autoPlay) {
                videoRef.current.play().catch(() => setIsPlaying(false));
            }
        }
    }, [autoPlay]);

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
            setProgress(progress);
        }
    };

    return (
        <div className={`${styles.container} ${className || ""}`} onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                loop={loop}
                muted={isMuted}
                playsInline
                className={styles.video}
                onTimeUpdate={handleTimeUpdate}
                onEnded={onEnded}
            />

            {!isPlaying && (
                <div className={styles.overlay}>
                    <div className={styles.playButton}>
                        <Play size={32} fill="currentColor" />
                    </div>
                </div>
            )}

            <div className={styles.controls}>
                <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${progress}%` }} />
                </div>

                <button className={styles.muteButton} onClick={toggleMute}>
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
            </div>
        </div>
    );
}
