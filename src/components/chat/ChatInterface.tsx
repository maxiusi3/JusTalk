"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ChatInterface.module.css";
import { Mic, Send, User, Bot, Volume2, AlertCircle, Keyboard } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: number;
}

interface ChatInterfaceProps {
    initialMessages?: Message[];
    onSendMessage: (content: string) => void;
    isTyping?: boolean;
}

export default function ChatInterface({ initialMessages = [], onSendMessage, isTyping = false }: ChatInterfaceProps) {
    const [messages, setMessages] = useState<Message[]>(initialMessages);
    const [inputValue, setInputValue] = useState("");
    const [showToast, setShowToast] = useState(false);
    const [isRecording, setIsRecording] = useState(false);
    const [showKeyboard, setShowKeyboard] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recordingStartTime = useRef<number>(0);

    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (inputValue.trim()) {
            // Check for off-topic reply (Mock logic: if message is too short)
            if (inputValue.length < 3) {
                setShowToast(true);
                setTimeout(() => setShowToast(false), 3000);
                return;
            }
            onSendMessage(inputValue);
            setInputValue("");
            setShowKeyboard(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleMicPress = () => {
        setIsRecording(true);
        recordingStartTime.current = Date.now();
        // TODO: Start actual audio recording
    };

    const handleMicRelease = () => {
        setIsRecording(false);
        const duration = Date.now() - recordingStartTime.current;

        // Mock: Simulate voice-to-text
        if (duration > 500) {
            const mockText = "Yes, a table in the corner please.";
            // Fill input with recognized text instead of auto-sending
            setInputValue(mockText);
            // Auto-expand keyboard for user to review/edit
            setShowKeyboard(true);
        } else {
            setShowToast(true);
            setTimeout(() => setShowToast(false), 3000);
        }
    };

    const playHint = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            window.speechSynthesis.speak(utterance);
        } else {
            alert(`Playing audio for: ${text}`);
        }
    };

    return (
        <div className={styles.container}>
            {showToast && (
                <div className={styles.toast}>
                    <AlertCircle size={16} />
                    <span>Try using the word "Table"</span>
                </div>
            )}

            <div className={styles.messagesList}>
                {messages.map((msg) => (
                    <div key={msg.id} className={`${styles.messageWrapper} ${msg.role === "user" ? styles.userWrapper : styles.aiWrapper}`}>
                        <div className={styles.avatar}>
                            {msg.role === "user" ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`${styles.messageBubble} ${msg.role === "user" ? styles.userBubble : styles.aiBubble}`}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className={`${styles.messageWrapper} ${styles.aiWrapper}`}>
                        <div className={styles.avatar}>
                            <Bot size={16} />
                        </div>
                        <div className={`${styles.messageBubble} ${styles.aiBubble} ${styles.typing}`}>
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <div className={styles.hints}>
                    {["Yes", "Table", "Morning"].map((hint) => (
                        <button key={hint} className={styles.hintTag} onClick={() => playHint(hint)}>
                            <Volume2 size={12} className={styles.hintIcon} />
                            {hint}
                        </button>
                    ))}
                </div>

                {/* Primary Voice Input */}
                <div className={styles.voiceInputWrapper}>
                    <button
                        className={`${styles.micButton} ${isRecording ? styles.recording : ''}`}
                        onMouseDown={handleMicPress}
                        onMouseUp={handleMicRelease}
                        onTouchStart={handleMicPress}
                        onTouchEnd={handleMicRelease}
                    >
                        <Mic size={32} />
                        {isRecording && <div className={styles.recordingPulse} />}
                    </button>
                    <p className={styles.micHint}>
                        {isRecording ? "🔴 Recording..." : "Hold to speak"}
                    </p>
                </div>

                {/* Auxiliary Keyboard Input */}
                <button
                    className={styles.keyboardToggle}
                    onClick={() => setShowKeyboard(!showKeyboard)}
                >
                    <Keyboard size={16} />
                    <span>{showKeyboard ? "Hide" : "Type"}</span>
                </button>

                {showKeyboard && (
                    <div className={styles.inputWrapper}>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Type a message..."
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            onKeyDown={handleKeyDown}
                        />
                        <button className={styles.sendButton} onClick={handleSend} disabled={!inputValue.trim()}>
                            <Send size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
