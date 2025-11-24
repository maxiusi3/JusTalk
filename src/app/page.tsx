"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { Play } from "lucide-react";

export default function SplashScreen() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setTimeout(() => {
      router.push("/onboarding/intro");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <main className={`${styles.container} ${mounted ? styles.visible : ""}`}>
      <div className={styles.content}>
        <div className={styles.logoWrapper}>
          <div className={styles.icon}>
            <Play size={48} fill="currentColor" />
          </div>
          <h1 className={styles.title}>JusTalk</h1>
        </div>
        <p className={styles.tagline}>Don't learn language. Live it.</p>
      </div>
    </main>
  );
}
