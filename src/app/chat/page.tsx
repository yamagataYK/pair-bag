import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";
import Image from "next/image";
import Send from "@/assets/send.png";


export default function Page() {
    return (
        <>
            <Header title='トーク' />
            <Main className={styles.main}>
                チャット
                <div className={styles.footer}>
                    <input type="text" placeholder='メッセージを入力' className={styles.textarea} />
                    <button type="button" className={styles.iconWrap}>
                        <Image src={Send} className={styles.icon} alt="送信ボタン画像" />
                    </button>
                </div>
            </Main>
        </>
    );
}