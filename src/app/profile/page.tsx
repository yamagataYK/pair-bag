'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams();
    const color = searchParams.get('color');
    const name = searchParams.get('name');

    return (
        <>
            <Header title={`${name}のプロフィール`} />
            <Main className={styles.main}>
                <div className={styles.profileWrap}>
                    <article className={styles.card}>
                        <div>画像</div>
                        <p>{`${name}名前が出る予定`}</p>
                        <div>{`${color}バッグの予定`}</div>
                    </article>
                    <article className={styles.card}>

                    </article>
                    <div>
                        <div>
                            <button type="button">チャット</button>
                        </div>
                        <div>
                            <button type="button">定番アイテム一覧</button>
                        </div>
                        <div>
                            <p>パートナーに一言</p>
                            <div><input type="text" /></div>
                        </div>
                    </div>
                </div>
            </Main>
            <Footer />
        </>
    );
}
