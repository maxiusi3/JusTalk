"use client";

import { useState, useEffect, useRef, use } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import VideoPlayer, { VideoPlayerRef } from "@/components/player/VideoPlayer";
import GuessingGame from "@/components/interaction/GuessingGame";
import AudioRecorder from "@/components/interaction/AudioRecorder";
import RescueModal from "@/components/rescue/RescueModal";
import { Check, X } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Option {
    id: string;
    text: string;
    isCorrect: boolean;
}

interface UnitData {
    id: string;
    videoSrc: string;
    correctText: string;
    options: Option[];
}

type Phase = "guessing" | "echo" | "feedback";

export default function PracticePage({ params }: { params: Promise<{ chapterId: string }> }) {
    const router = useRouter();
    const { chapterId } = use(params);
    const [phase, setPhase] = useState<Phase>("guessing");
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
    const [score, setScore] = useState(0);
    const [unitData, setUnitData] = useState<UnitData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showRescue, setShowRescue] = useState(false);
    const videoRef = useRef<VideoPlayerRef>(null);
    const supabase = createClient();

    // V1.1: Detailed Diagnosis State
    const [showDiagnosis, setShowDiagnosis] = useState(false);
    const [diagnosisData, setDiagnosisData] = useState<{ word: string; score: number }[]>([]);

    useEffect(() => {
        async function fetchUnit() {
            console.log("PracticePage: Starting fetch (using mock data for stability)");

            // Simulate network delay
            await new Promise(resolve => setTimeout(resolve, 500));

            // Force Mock Data for Verification
            setUnitData({
                id: "u1",
                videoSrc: "https://mdaxeupyylagqtjnalyx.supabase.co/storage/v1/object/public/content/drama/chapter_1_coffee.mp4",
                correctText: "I would like an oat milk latte with an extra shot, please.",
                options: [
                    { id: "1", text: "He wants to order a black coffee.", isCorrect: false },
                    { id: "2", text: "He is ordering a latte with oat milk.", isCorrect: true },
                    { id: "3", text: "He is asking for the bathroom code.", isCorrect: false },
                ]
            });
            setLoading(false);

            /* 
            // Original Supabase Logic (Commented out for debugging/verification)
            const { data: units, error: unitError } = await supabase
                .from('units')
                .select('*')
                .eq('chapter_id', chapterId)
                .limit(1);

            if (unitError || !units || units.length === 0) {
                // ... fallback ...
            }
            // ...
            */
        }

        if (chapterId) {
            fetchUnit();
        }
    }, [chapterId]);

    const handleGuess = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback("success");
            setTimeout(() => {
                setFeedback(null);
                setPhase("echo");
                setAttempts(0); // Reset attempts for the new phase
                // Pause video when entering echo phase (user will speak)
                videoRef.current?.pause();
            }, 1500);
        } else {
            setFeedback("error");
            const newAttempts = attempts + 1;
            setAttempts(newAttempts);

            if (newAttempts >= 3) {
                setTimeout(() => setShowRescue(true), 1000);
            } else {
                setTimeout(() => setFeedback(null), 1000);
            }
        }
    };

    const handleRecording = (blob: Blob) => {
        // Simulate API analysis
        setTimeout(() => {
            // Mock score logic for testing Rescue Mode:
            // - Short recordings (< 500ms / < 500 bytes) = low score (40-60) to trigger Rescue
            // - Normal recordings = high score (80-98) for success

            const isShortRecording = blob.size < 5000; // Approximate check for short duration
            const mockScore = isShortRecording
                ? Math.floor(Math.random() * (60 - 40 + 1)) + 40  // 40-60 (failure)
                : Math.floor(Math.random() * (98 - 80 + 1)) + 80; // 80-98 (success)

            setScore(mockScore);

            // V1.1: Generate mock word-level diagnosis
            if (unitData) {
                const words = unitData.correctText.split(" ");
                const mockDiagnosis = words.map(word => ({
                    word,
                    score: mockScore > 80 ? 90 : Math.random() * 100 // High score = mostly green, Low = mixed
                }));
                setDiagnosisData(mockDiagnosis);
            }

            if (mockScore >= 85) {
                setFeedback("success");
                setTimeout(() => {
                    // Move to next unit or finish
                    // For MVP, just go to Magic Moment
                    router.push(`/learn/${chapterId}/magic`);
                }, 1500);
            } else {
                setFeedback("error");
                // Increment attempts for Rescue Mode tracking
                const newAttempts = attempts + 1;
                setAttempts(newAttempts);

                if (newAttempts >= 4) {
                    // Skip to next stage after 4 failures
                    setTimeout(() => {
                        router.push(`/learn/${chapterId}/magic`);
                    }, 1500);
                } else if (newAttempts >= 2) {
                    // Trigger Rescue Mode after 2nd failure
                    setTimeout(() => {
                        setShowRescue(true);
                        // Pause video when rescue modal opens
                        videoRef.current?.pause();
                    }, 1000);
                } else {
                    setTimeout(() => setFeedback(null), 1500);
                }
            }
        }, 1500);
    };

    const handleRescueClose = () => {
        setShowRescue(false);
        setFeedback(null);
    };

    const handleWatchClip = () => {
        // Do nothing, let the modal handle the video playback
        // The modal will stay open so the user can watch
    };

    if (loading) {
        return <div className={styles.container}><div className="flex-center full-screen">Loading practice...</div></div>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button onClick={() => router.back()} className={styles.backButton}>
                    {/* <ArrowRight className="rotate-180" /> */}
                    [Back]
                </button>
                <div className={styles.progress}>
                    <span>Chapter {chapterId}</span>
                </div>
            </div>

            <div className={styles.content}>
                <div className={styles.videoSection}>
                    <VideoPlayer
                        src={unitData?.videoSrc || ""}
                        autoPlay={false}
                        ref={videoRef}
                    />
                </div>

                <div className={styles.interactionSection}>
                    {phase === 'guessing' && (
                        <GuessingGame
                            options={unitData?.options || []}
                            onSelect={handleGuess}
                            isFocusMode={attempts >= 2}
                        />
                    )}

                    {phase === 'echo' && (
                        <div className={styles.echoContainer}>
                            <h2 className={styles.targetSentence}>
                                {showDiagnosis ? (
                                    diagnosisData.map((item, idx) => (
                                        <span
                                            key={idx}
                                            style={{
                                                color: item.score >= 80 ? '#4ade80' : item.score >= 60 ? '#facc15' : '#f87171',
                                                marginRight: '0.25rem'
                                            }}
                                        >
                                            {item.word}
                                        </span>
                                    ))
                                ) : (
                                    `"${unitData?.correctText}"`
                                )}
                            </h2>

                            {feedback && (
                                <div className={styles.feedbackActions}>
                                    <button
                                        className={styles.diagnosisButton}
                                        onClick={() => setShowDiagnosis(!showDiagnosis)}
                                    >
                                        {showDiagnosis ? "Hide Diagnosis" : "View Diagnosis"}
                                    </button>
                                </div>
                            )}

                            <div className={styles.recorderWrapper}>
                                <AudioRecorder
                                    onRecordingComplete={handleRecording}
                                    isAnalyzing={!!feedback}
                                />
                            </div>

                            {feedback && (
                                <div className={`${styles.feedback} ${styles[feedback]}`}>
                                    {feedback === 'success' ? (
                                        <>
                                            [Check]
                                            <span>Excellent!</span>
                                        </>
                                    ) : (
                                        <>
                                            [X]
                                            <span>Try again</span>
                                        </>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <RescueModal
                isOpen={showRescue}
                onClose={handleRescueClose}
                onWatchClip={handleWatchClip}
                coachMessage="It seems like you're having trouble with the context. Notice how the character looks away when they speak? That usually indicates hesitation."
                videoSrc="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4"
            />
        </div>
    );
}
