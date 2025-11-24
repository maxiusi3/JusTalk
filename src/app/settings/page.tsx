"use client";

import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { ChevronLeft, Bell, Volume2, Moon, LogOut } from "lucide-react";

export default function SettingsPage() {
    const router = useRouter();

    return (
        <main className={styles.container}>
            <header className={styles.header}>
                <button className={styles.backButton} onClick={() => router.back()}>
                    <ChevronLeft size={24} />
                </button>
                <h1>Settings</h1>
                <div style={{ width: 24 }} /> {/* Spacer */}
            </header>

            <div className={styles.section}>
                <h3>Preferences</h3>
                <div className={styles.menuItem}>
                    <div className={styles.menuIcon}>
                        <Bell size={20} />
                    </div>
                    <span className={styles.menuLabel}>Notifications</span>
                    <div className={styles.toggle}></div>
                </div>
                <div className={styles.menuItem}>
                    <div className={styles.menuIcon}>
                        <Volume2 size={20} />
                    </div>
                    <span className={styles.menuLabel}>Sound Effects</span>
                    <div className={`${styles.toggle} ${styles.active}`}></div>
                </div>
                <div className={styles.menuItem}>
                    <div className={styles.menuIcon}>
                        <Moon size={20} />
                    </div>
                    <span className={styles.menuLabel}>Dark Mode</span>
                    <div className={`${styles.toggle} ${styles.active}`}></div>
                </div>
            </div>

            <div className={styles.section}>
                <h3>Account</h3>
                <button className={styles.logoutButton}>
                    <LogOut size={20} />
                    Log Out
                </button>
            </div>
        </main>
    );
}
