'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";
import Send from "@/assets/send.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import Image from "next/image";
import { useState } from "react";

export default function Page() {
    const [input, setInput] = useState("");
    const [myMsgs, setMyMsgs] = useState<string[]>([]);

    const send = () => {
        const t = input.trim();
        if (!t) return;
        setMyMsgs(prev => [...prev, t]);
        setInput("");
    };

    return (
        <>
            <Header title='トーク' />
            <Main className={styles.main}>

                <div className={styles.partner}>
                    <FontAwesomeIcon icon={faUser} className={styles.user} />
                    <p>今週買い物おねがいね〜！</p>
                </div>
                <p className={styles.myself}>
                    りょうか~い
                </p>
                <p className={styles.myself}>
                    買っといたよー
                </p>
                <div className={styles.partner}>
                    <FontAwesomeIcon icon={faUser} className={styles.user} />
                    <p>ありがと！</p>
                </div>
                <div className={styles.partner}>
                    <FontAwesomeIcon icon={faUser} className={styles.user} />
                    <p>新しくバック追加した！</p>
                </div>
                {myMsgs.map((m, i) => (
                    <p key={i} className={styles.myself}>{m}</p>
                ))}

                <div className={styles.footer}>
                    <input
                        type="text"
                        placeholder='メッセージを入力'
                        className={styles.textarea}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <button
                        type="button"
                        className={styles.iconWrap}
                        onClick={send}
                    >
                        <Image src={Send} className={styles.icon} alt="送信ボタン画像" />
                    </button>
                </div>
            </Main>
        </>
    );
}
