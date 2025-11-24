"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import VideoPlayer from "@/components/player/VideoPlayer";
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

export default function PracticePage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();
    const [phase, setPhase] = useState<Phase>("guessing");
    const [attempts, setAttempts] = useState(0);
    const [feedback, setFeedback] = useState<"success" | "error" | null>(null);
    const [score, setScore] = useState(0);
    const [unitData, setUnitData] = useState<UnitData | null>(null);
    const [loading, setLoading] = useState(true);
    const [showRescue, setShowRescue] = useState(false);
    const supabase = createClient();

    useEffect(() => {
        async function fetchUnit() {
            // For MVP, we just fetch the first unit of the chapter
            const { data: units, error: unitError } = await supabase
                .from('units')
                .select('*')
                .eq('chapter_id', params.chapterId)
                .limit(1);

            if (unitError || !units || units.length === 0) {
                console.error('Error fetching unit:', unitError);
                // Fallback Mock Data
                setUnitData({
                    id: "u1",
                    videoSrc: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
                    correctText: "We need to talk.",
                    options: [
                        { id: "1", text: "He wants to break up", isCorrect: true },
                        { id: "2", text: "He wants to order food", isCorrect: false },
                        { id: "3", text: "He is happy", isCorrect: false },
                    ]
                });
                setLoading(false);
                return;
            }

            const unit = units[0];

            // Fetch options for this unit
            const { data: options, error: optionsError } = await supabase
                .from('options')
                .select('*')
                .eq('unit_id', unit.id);

            if (optionsError) {
                console.error('Error fetching options:', optionsError);
                setLoading(false);
                return;
            }

            setUnitData({
                id: unit.id,
                videoSrc: unit.video_src,
                correctText: unit.correct_text,
                options: options.map((opt: any) => ({
                    id: opt.id,
                    text: opt.text,
                    isCorrect: opt.is_correct
                }))
            });
            setLoading(false);
        }

        fetchUnit();
    }, [params.chapterId]);

    const handleGuess = (isCorrect: boolean) => {
        if (isCorrect) {
            setFeedback("success");
            setTimeout(() => {
                setFeedback(null);
                setPhase("echo");
            }, 1000);
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
            // Mock score based on recording duration (simulated)
            // In a real app, we'd analyze the blob.
            // Here, we assume if the user tried (long recording), they pass.
            // If it's too short (< 1s), they fail.

            // Note: Since we can't easily get duration from blob without decoding,
            // we'll use a random score but weighted towards success for better UX in prototype.
            // 80% chance of passing (>85), 20% chance of failure (<60)
            const isSuccess = Math.random() > 0.2;
            const mockScore = isSuccess
                ? 85 + Math.random() * 15  // 85-100
                : 40 + Math.random() * 20; // 40-60

            setScore(mockScore);

            if (mockScore >= 85) {
                setFeedback("success");
                setTimeout(() => {
                    // Move to next unit or finish
                    // For MVP, just go to Magic Moment
                    router.push(`/learn/${params.chapterId}/magic`);
                }, 1500);
            } else {
                setFeedback("error");
                // Logic for retry or rescue mode would go here
            }
        }, 1500);
    };

    const handleRescueClose = () => {
        setShowRescue(false);
        setFeedback(null);
    };

    const handleWatchClip = () => {
        // For MVP, just close modal and maybe show a hint or different video
        // Ideally this would open a ClipPlayer overlay
        alert("Playing reinforcement clip... (Mock)");
        setShowRescue(false);
        setFeedback(null);
    };

    if (loading || !unitData) {
        return <div className={styles.container}><div className="flex-center full-screen">Loading practice...</div></div>;
    }

    return (
        <main className={styles.container}>
            {/* Top Video Section */}
            <div className={styles.videoSection}>
                <VideoPlayer
                    src={unitData.videoSrc}
                    autoPlay
                    loop
                    className={styles.player}
                />
            </div>

            {/* Bottom Interaction Section */}
            <div className={styles.interactionSection}>
                {/* Feedback Overlay */}
                {feedback && (
                    <div className={`${styles.feedbackOverlay} ${styles[feedback]}`}>
                        {feedback === "success" ? <Check size={48} /> : <X size={48} />}
                    </div>
                )}

                {phase === "guessing" && (
                    <GuessingGame
                        options={unitData.options}
                        onSelect={handleGuess}
                        isFocusMode={attempts >= 2}
                    />
                )}

                {phase === "echo" && (
                    <div className={styles.echoContainer}>
                        <h2 className={styles.targetSentence}>"{unitData.correctText}"</h2>
                        <div className={styles.recorderWrapper}>
                            <AudioRecorder
                                onRecordingComplete={handleRecording}
                                isAnalyzing={!!feedback} // Disable while showing feedback
                            />
                        </div>
                        {score > 0 && score < 85 && (
                            <p className={styles.scoreFeedback}>Score: {Math.round(score)}. Try again!</p>
                        )}
                    </div>
                )}
            </div>

            <RescueModal
                isOpen={showRescue}
                onClose={handleRescueClose}
                onWatchClip={handleWatchClip}
                coachMessage="It seems like you're having trouble with the context. Notice how the character looks away when they speak? That usually indicates hesitation."
            />
        </main>
    );
}
