import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";


export default function Page() {
    return (
        <>
            <Header title="かざして検知" />
            <Main className={styles.main}>
                <div className={styles.camera}>

                </div>
                <div className={styles.bagList}>

                </div>
            </Main>
            <Footer />
        </>
    );
}