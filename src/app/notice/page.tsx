import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Page() {
    return (
        <>
            <Header title='特集' />
            <Main className={styles.main}>
                特集
            </Main>
            <Footer />
        </>
    );
}
