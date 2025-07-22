'use client'

import styles from "./objectDetection.module.css";
import { detectObjects } from "@/data/detect";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useEffect, useRef, useState } from "react";


const TRANSLATIONS: Record<string, string> = {
    person: "人",
    banana: "バナナ",
    apple: "リンゴ",
    orange: "オレンジ",
    broccoli: "ブロッコリー",
    carrot: "ニンジン",
    bottle: "ボトル",
    cell_phone: "スマホ",
    laptop: "ノートPC",


};

export default function objectDetection() {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [names, setNames] = useState<string[]>([]);

    // カメラ映像の取得
    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: { facingMode: "environment" } })
            .then(stream => {
                if (videoRef.current) videoRef.current.srcObject = stream;
            })
            .catch(console.error);
    }, []);

    // 0.5秒ごとにフレーム送信＆検知
    useEffect(() => {
        let timer: number;
        const loop = async () => {
            const video = videoRef.current;
            if (!video) return;
            const { videoWidth: w, videoHeight: h } = video;
            if (w === 0 || h === 0) {
                timer = window.setTimeout(loop, 500);
                return;
            }
            // オフスクリーン canvas へ描画
            const off = document.createElement("canvas");
            off.width = w; off.height = h;
            off.getContext("2d")!.drawImage(video, 0, 0, w, h);
            const blob: Blob | null = await new Promise(res => off.toBlob(res, "image/jpeg", 0.8));
            if (blob) {
                try {
                    const result = await detectObjects(blob);
                    setNames(prev => {
                        const merged = new Set(prev);
                        result.forEach(n => merged.add(n));
                        return Array.from(merged);
                    });
                    // ←ここまで

                } catch {
                    // 通信失敗は無視
                }
            }
            timer = window.setTimeout(loop, 500);
        };
        loop();
        return () => clearTimeout(timer);
    }, []);

    return (
        <>
            <video
                ref={videoRef}
                autoPlay
                muted
                playsInline
                className={styles.camera}
            />
            <div className={styles.detectionWrap}>
                {names.length > 0 ? (
                    <ul className={styles.detectionList}>
                        {Array.from(new Set(names)).map((n) => {
                            const label = TRANSLATIONS[n] ?? n;
                            return (
                                <li className={styles.detectionItem} key={n}>
                                    {label}
                                    <button
                                        onClick={() =>
                                            setNames((prev) => prev.filter((x) => x !== n))
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className={styles.deleteBtn} />
                                    </button>
                                </li>
                            );
                        })}
                    </ul>
                ) : (
                    <p>検知中…</p>
                )}
                <button
                    type="button"
                    className={styles.listAddBtn}>
                    リストに追加
                </button>
            </div>
        </>
    );
}
