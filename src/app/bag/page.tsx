'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";
import DetailForm from "@/components/detailForm";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
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
                    <div className={styles.modalBtnWrap}>
                        <Modal modalTitle='定番アイテム' buttonIcon={faListUl}>
                            <div className={styles.stdListBtnWrap}>
                                <button
                                    type="button"
                                    className={styles.stdListBtn}>
                                    一覧を見る
                                </button>
                            </div>

                        </Modal>

                        <Modal modalTitle='商品詳細'>
                            <DetailForm />
                            <div className={styles.detailFormActions}>
                                <div className={styles.defaultItemWrap}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.defaultItemText}>
                                        定番アイテム<br />
                                        に追加する
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={styles.listAddBtn}>
                                    リストに追加
                                </button>
                            </div>
                        </Modal>
                    </div>


                </div>
            </Main >
            <Footer />
        </>

    );
}
