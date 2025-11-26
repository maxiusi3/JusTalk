"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import ChapterNode from "@/components/map/ChapterNode";
import { User } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface Chapter {
    id: string;
    title: string;
    status: "locked" | "unlocked" | "completed";
    stars: number;
    position_x: number;
    position_y: number;
}

function MapContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [chapters, setChapters] = useState<Chapter[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchChapters() {
            const { data, error } = await supabase
                .from('chapters')
                .select('*')
                .order('id');

            if (error) {
                console.error('Error fetching chapters:', error);
                // Fallback to mock data if DB connection fails (e.g. missing env vars)
                setChapters([
                    { id: "1", title: "Cafe Encounter", status: "unlocked", stars: 0, position_x: 50, position_y: 80 },
                    { id: "2", title: "The Lost Key", status: "locked", stars: 0, position_x: 30, position_y: 60 },
                    { id: "3", title: "Subway Talk", status: "locked", stars: 0, position_x: 70, position_y: 40 },
                    { id: "4", title: "Dinner Date", status: "locked", stars: 0, position_x: 50, position_y: 20 },
                ]);
            } else if (data) {
                // Filter out any chapters with missing IDs and ensure correct typing
                const validChapters = (data as any[]).filter(ch => ch.id).map(ch => ({
                    id: String(ch.id),
                    title: ch.title,
                    status: ch.status,
                    stars: ch.stars,
                    position_x: ch.position_x,
                    position_y: ch.position_y
                })) as Chapter[];
                setChapters(validChapters);
            }
            setLoading(false);
        }

        fetchChapters();
    }, []);

    // Handle completion from Chat Page
    useEffect(() => {
        if (searchParams.get('completed') === 'true') {
            // Update Chapter 1 to completed with 2 stars (Booked state)
            setChapters(prev => prev.map(ch =>
                ch.id === '1' ? { ...ch, status: 'completed', stars: 2 } : ch
            ));

            // Also unlock Chapter 2
            setChapters(prev => prev.map(ch =>
                ch.id === '2' ? { ...ch, status: 'unlocked' } : ch
            ));

            // Clean up URL
            router.replace('/dashboard/map');
        }
    }, [searchParams, router]);

    const handleChapterClick = (chapterId: string) => {
        if (!chapterId || chapterId === 'undefined') {
            console.error("Invalid chapter ID:", chapterId);
            return;
        }
        router.push(`/learn/${chapterId}/trailer`);
    };

    if (loading) {
        return <div className={styles.container}><div className="flex-center full-screen">Loading map...</div></div>;
    }

    return (
        <div className={styles.mapContainer}>
            {/* Path SVG Line */}
            <svg className={styles.pathSvg} viewBox="0 0 100 100" preserveAspectRatio="none">
                <path
                    d="M50,80 C50,70 30,70 30,60 C30,50 70,50 70,40 C70,30 50,30 50,20"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                />
            </svg>

            {chapters.map((chapter) => (
                <ChapterNode
                    key={chapter.id}
                    id={chapter.id}
                    title={chapter.title}
                    status={chapter.status}
                    stars={chapter.stars}
                    position={{ x: chapter.position_x, y: chapter.position_y }}
                    onClick={() => handleChapterClick(chapter.id)}
                />
            ))}
        </div>
    );
}

export default function LearningMapPage() {
    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <div className={styles.streak}>🔥 3 Day Streak</div>
                <div className={styles.profile}>
                    <User size={20} />
                </div>
            </header>
            <Suspense fallback={<div>Loading...</div>}>
                <MapContent />
            </Suspense>
        </main>
    );
}
