import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Home() {
    return (
        <>
            <Header title='プロフィール' />
            <Main className={styles.main}>
                profile
            </Main>
            <Footer />
        </>
    );
}
