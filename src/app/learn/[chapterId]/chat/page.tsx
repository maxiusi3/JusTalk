"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ChatInterface from "@/components/chat/ChatInterface";
import { ChevronLeft, MoreHorizontal } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: number;
}

export default function ChatPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([
        { id: "1", role: "ai", content: "So, did you finish the report?", timestamp: Date.now() }
    ]);
    const [isTyping, setIsTyping] = useState(false);

    const handleSendMessage = (content: string) => {
        // Add user message
        const newMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content,
            timestamp: Date.now(),
        };
        setMessages((prev) => [...prev, newMessage]);

        // Simulate AI response
        setIsTyping(true);
        setTimeout(() => {
            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: "Great! Please leave it on my table.",
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);

            // End conversation after one turn for MVP
            setTimeout(() => {
                router.push("/dashboard/map?completed=true");
            }, 2000);
        }, 1500);
    };

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ChevronLeft size={24} />
                </button>
                <div className={styles.headerTitle}>
                    <h1>Sam (Boss)</h1>
                    <span className={styles.status}>Online</span>
                </div>
                <button className={styles.menuButton}>
                    <MoreHorizontal size={24} />
                </button>
            </header>

            <div className={styles.chatContainer}>
                <ChatInterface
                    initialMessages={messages}
                    onSendMessage={handleSendMessage}
                    isTyping={isTyping}
                />
            </div>
        </main>
    );
}
