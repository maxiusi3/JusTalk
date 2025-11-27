"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import ChatInterface from "@/components/chat/ChatInterface";
import { ChevronLeft, MoreHorizontal } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Message {
    id: string;
    role: "user" | "ai";
    content: string;
    timestamp: number;
}

interface ChatScenario {
    id: string;
    roleName: string;
    initialMessage: string;
}

export default function ChatPage({ params }: { params: { chapterId: string } }) {
    const router = useRouter();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [scenario, setScenario] = useState<ChatScenario | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchScenario() {
            const { data, error } = await supabase
                .from('chat_scenarios')
                .select('*')
                .eq('chapter_id', params.chapterId)
                .single();

            if (error || !data) {
                console.error('Error fetching chat scenario:', error);
                // Fallback Mock Data
                setScenario({
                    id: "c1",
                    roleName: "Sam (Boss)",
                    initialMessage: "So, did you finish the report?"
                });
                setMessages([{
                    id: "1",
                    role: "ai",
                    content: "So, did you finish the report?",
                    timestamp: Date.now()
                }]);
            } else {
                setScenario({
                    id: data.id,
                    roleName: data.role_name,
                    initialMessage: data.initial_message
                });
                setMessages([{
                    id: "1",
                    role: "ai",
                    content: data.initial_message,
                    timestamp: Date.now()
                }]);
            }
            setLoading(false);
        }

        fetchScenario();
    }, [params.chapterId]);

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
            // V1.1: Fuzzy Matching Logic
            // Check if user used any key words: "table", "corner", "please"
            const lowerContent = content.toLowerCase();
            const hasKeywords = lowerContent.includes("table") || lowerContent.includes("corner");

            let aiContent = "Great! Please leave it on my table.";
            let isSuccess = true;

            if (!hasKeywords) {
                aiContent = "I didn't quite catch that. Could you mention where you left it? (Try using 'table')";
                isSuccess = false;
            }

            const aiResponse: Message = {
                id: (Date.now() + 1).toString(),
                role: "ai",
                content: aiContent,
                timestamp: Date.now(),
            };
            setMessages((prev) => [...prev, aiResponse]);
            setIsTyping(false);

            // End conversation if success
            if (isSuccess) {
                setTimeout(() => {
                    // Redirect to Settlement Page
                    router.push(`/learn/${params.chapterId}/settlement`);
                }, 2000);
            }
        }, 1500);
    };

    if (loading || !scenario) {
        return <div className={styles.container}><div className="flex-center full-screen">Loading chat...</div></div>;
    }

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ChevronLeft size={24} />
                </button>
                <div className={styles.headerTitle}>
                    <h1>{scenario.roleName}</h1>
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
