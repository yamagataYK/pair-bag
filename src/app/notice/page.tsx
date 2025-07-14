import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";
import introduction from "@/assets/introduction.png";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <Header title='特集' />
            <Main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.imageWrap}>
                        <Image className={styles.image} src={introduction} alt="レモンサワー" />
                    </div>
                    <div className={styles.textWrap}>
                        <h3 className={styles.title}>21時のレモネードサワー</h3>
                        <p className={styles.desc}>
                            爽やかな酸味と炭酸が弾ける、大人のレモネードサワー。
                        </p>
                        <a className={styles.link}>詳しく見る &gt;</a>
                    </div>
                </div>
            </Main>
        </>
    );
}
