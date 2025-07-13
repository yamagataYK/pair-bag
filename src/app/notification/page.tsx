import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";

export default function Page() {
    return (
        <>
            <Header title='おしらせ' />
            <Main className={styles.main}>
                通知
            </Main>
            <Footer />
        </>
    );
}
