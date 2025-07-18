'use client'

import styles from "./modal.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";


export default function Modal() {

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
            {isOpen && (
                <div className={`${styles.modalStyle},${styles.modalOpen}`}>
                    <p>モーダルの中身です</p>
                    <button onClick={toggleModal}>Close</button>
                </div>
            )}
        </>
    )
};