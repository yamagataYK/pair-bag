import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import ObjectDetector from "@/components/ObjectDetection";





export default function Page() {
    return (
        <>
            <Header title="かざして検知" />
            <Main className={styles.main}>
                <div className={styles.container}>

                    <ObjectDetector />
                </div>
            </Main>
            <Footer />
        </>
    );
}