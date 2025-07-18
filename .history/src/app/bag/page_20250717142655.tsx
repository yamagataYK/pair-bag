'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";



export default function Page() {
    const searchParams = useSearchParams();
    const color = searchParams.get('color');
    const name = searchParams.get('name');



    const handleColor = () => {
        switch (color) {
            case "red":
                return styles.red
            case "blue":
                return styles.blue
            case "green":
                return styles.green

            default:
                return styles.red
        }
    }

    return (
        <>
            <Header title={`${name}のバッグ`} />
            <Main className={styles.main}>
                <div className={`${styles.bagImage} ${handleColor()}`}>
                    <div className={styles.addButtonWrap}>
                        <button type="button" className={styles.addButton}>
                            <FontAwesomeIcon icon={faListUl} className={styles.icon} />
                        </button>
                        <Modal></Modal>
                    </div>
                </div>
            </Main>
            <Footer />
        </>

    );
}
