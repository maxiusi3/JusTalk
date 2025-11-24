"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./ChatInterface.module.css";
import { Mic, Send, User, Bot } from "lucide-react";

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
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setMessages(initialMessages);
    }, [initialMessages]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (inputValue.trim()) {
            onSendMessage(inputValue);
            setInputValue("");
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className={styles.container}>
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
                    <span className={styles.hintTag}>Yes</span>
                    <span className={styles.hintTag}>Table</span>
                    <span className={styles.hintTag}>Morning</span>
                </div>
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
                <button className={styles.micButton}>
                    <Mic size={24} />
                </button>
            </div>
        </div>
    );
}
