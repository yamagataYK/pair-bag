import styles from "./page.module.css";
import Main from "@/components/main";
import Header from "@/components/header";

export default function Page() {
    return (
        <>
            <Header title='トーク' />
            <Main className={styles.main}>
                チャット
            </Main>
        </>
    );
}