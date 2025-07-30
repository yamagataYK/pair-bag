import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";
import SummerSale from "@/assets/bannerSummerSale.jpg";
import introduction from "@/assets/introduction.jpg";
import Image from "next/image";

export default function Page() {
    return (
        <>
            <Header title='特集' />
            <Main className={styles.main}>
                <div className={styles.card}>
                    <div className={styles.imageWrap}>
                        <Image className={styles.image} src={SummerSale} alt="バナー写真" />
                    </div>
                    <div className={styles.textWrap}>
                        <h3 className={styles.title}>夏のサマーセール</h3>
                        <p className={styles.desc}>
                            山スーパーで、7月1日から8月1日まで夏のスーパーセールが開催します!
                        </p>
                        <p className={styles.detail}>詳しく見る &gt;</p>
                    </div>
                </div>
                <div className={styles.card}>
                    <div className={styles.imageWrap}>
                        <Image className={styles.image} src={introduction} alt="マカロンバナー写真" />
                    </div>
                    <div className={styles.textWrap}>
                        <h3 className={styles.title}>新発売！マカロン</h3>
                        <p className={styles.desc}>
                            外はサクッと、中はしっとりな食感で大人気マカロン。
                        </p>
                        <p className={styles.detail}>詳しく見る &gt;</p>
                    </div>
                </div>
            </Main>
        </>
    );
}
