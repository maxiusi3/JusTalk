"use client";

import { useState, useEffect } from "react";
import styles from "./AudioRecorder.module.css";
import { Mic, Square, Loader2 } from "lucide-react";

interface AudioRecorderProps {
    onRecordingComplete: (blob: Blob) => void;
    isAnalyzing?: boolean;
}

export default function AudioRecorder({ onRecordingComplete, isAnalyzing = false }: AudioRecorderProps) {
    const [isRecording, setIsRecording] = useState(false);
    const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);

    useEffect(() => {
        // Cleanup
        return () => {
            if (mediaRecorder && mediaRecorder.state !== "inactive") {
                mediaRecorder.stop();
            }
        };
    }, [mediaRecorder]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const recorder = new MediaRecorder(stream);
            const chunks: BlobPart[] = [];

            recorder.ondataavailable = (e) => chunks.push(e.data);
            recorder.onstop = () => {
                const blob = new Blob(chunks, { type: "audio/webm" });
                onRecordingComplete(blob);
            };

            recorder.start();
            setMediaRecorder(recorder);
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing microphone:", err);
            alert("Microphone access denied. Please enable it to practice speaking.");
        }
    };

    const stopRecording = () => {
        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
            setIsRecording(false);
            mediaRecorder.stream.getTracks().forEach(track => track.stop());
        }
    };

    return (
        <div className={styles.container}>
            <button
                className={`${styles.recordButton} ${isRecording ? styles.recording : ""} ${isAnalyzing ? styles.analyzing : ""}`}
                onMouseDown={startRecording}
                onMouseUp={stopRecording}
                onTouchStart={startRecording}
                onTouchEnd={stopRecording}
                disabled={isAnalyzing}
            >
                {isAnalyzing ? (
                    <Loader2 size={32} className={styles.spinner} />
                ) : isRecording ? (
                    <Square size={32} fill="currentColor" />
                ) : (
                    <Mic size={32} />
                )}
            </button>

            <p className={styles.hint}>
                {isAnalyzing ? "Analyzing..." : isRecording ? "Release to send" : "Hold to speak"}
            </p>
        </div>
    );
}
