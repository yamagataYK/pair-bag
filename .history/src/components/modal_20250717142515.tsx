'use client'

import styles from "./modal.module.css";
import Main from "@/components/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type ModalProps = {
    buttonLabel: string
}

export default function Modal() {
    // フックはコンポーネント本体のトップレベルで呼び出す
    const [isOpen, setIsOpen] = useState(false);

    // トグル関数も同じスコープ内に
    const toggleModal = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <Main>
                <button type="button" className={styles.addButton}
                    onClick={toggleModal}
                >
                    <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                </button>
                {isOpen && (
                    <div className={styles.modalStyle}>
                        <p>モーダルの中身です</p>
                        <button onClick={toggleModal}>Close</button>
                    </div>
                )}
            </Main>
        </>

    )
};