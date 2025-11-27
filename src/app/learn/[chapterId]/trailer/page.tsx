"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, use } from "react";
import styles from "./page.module.css";
import VideoPlayer from "@/components/player/VideoPlayer";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function TrailerPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const router = useRouter();
    const { chapterId } = use(params);

    const [chapter, setChapter] = useState<{ title: string; description: string } | null>(null);
    const [unit, setUnit] = useState<{ video_src: string } | null>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        async function fetchData() {
            if (!chapterId) return;

            // Fetch Chapter
            const { data: chapterData } = await supabase
                .from('chapters')
                .select('title, description')
                .eq('id', chapterId)
                .single();

            // Fetch First Unit (for trailer video)
            const { data: unitData } = await supabase
                .from('units')
                .select('video_src')
                .eq('chapter_id', chapterId)
                .limit(1)
                .single();

            if (chapterData) setChapter(chapterData);
            if (unitData) setUnit(unitData);
            setLoading(false);
        }
        fetchData();
    }, [chapterId]);

    const handleStartLearning = () => {
        router.push(`/learn/${chapterId}/practice`);
    };

    if (loading) return <div className={styles.container}><div className="flex-center full-screen">Loading trailer...</div></div>;

    // Fallback if data missing
    const title = chapter?.title || "Chapter " + chapterId;
    const src = unit?.video_src || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

    return (
        <main className={styles.container}>
            <div className={styles.videoWrapper}>
                <VideoPlayer
                    src={src}
                    autoPlay
                    className={styles.player}
                    onEnded={() => { }}
                />

                <div className={styles.overlayContent}>
                    <div className={styles.textContainer}>
                        <h1 className={styles.chapterTitle}>{title}</h1>
                        <p className={styles.subtitle}>Chapter {chapterId} • Trailer</p>
                    </div>

                    <button className={styles.startButton} onClick={handleStartLearning}>
                        Start Chapter
                        <ArrowRight size={20} />
                    </button>
                </div>
            </div>
        </main>
    );
}
