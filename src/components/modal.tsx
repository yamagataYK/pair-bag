'use client'

import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { ReactNode, useState } from "react";

type Props = {
    modalTitle: string;
    children: ReactNode;
}

export default function Modal({ modalTitle, children }: Props) {

    const [isOpen, setIsOpen] = useState(false);

    const toggleModal = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button type="button" className={styles.addButton}
                onClick={toggleModal}
            >
                <FontAwesomeIcon icon={faPlus} className={styles.icon} />
            </button>
            <div
                className={`${styles.modalStyle}
                ${isOpen ? styles.modalOpen : ''}`}>

                <button type="button" onClick={toggleModal}>戻る</button>
                <h2 className={styles.modalTitle}>{modalTitle}</h2>
                {children}


            </div>

        </>
    )
};
