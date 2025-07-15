import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";



export default function Page() {
    return (
        <>
            <Header title='おしらせ' />
            <Main className={styles.main}>
                <article className={styles.card}>
                    <div className={styles.meta}>
                        <time className={styles.date}>2025年06月29日</time>
                        <span className={styles.newBadge}>new</span>
                    </div>
                    <p className={styles.message}>そろそろ醤油なくなっていませんか？</p>
                </article>
                <article className={styles.card}>
                    <div className={styles.meta}>
                        <time className={styles.date}>2025年06月29日</time>
                        <span className={styles.newBadge}>new</span>
                    </div>
                    <p className={styles.message}>そろそろ醤油なくなっていませんか？</p>
                </article>
            </Main>
        </>
    );
}
