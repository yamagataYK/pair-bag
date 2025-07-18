import styles from "./modal.module.css";
import Main from "@/components/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faListUl } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

type ModalProps = {
    buttonLabel: string
}
const ModalComponent = ({ buttonLabel }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
}

const toggleModal = () => {
    setIsOpen(!isOpen)
}

export default function modal() {

    return (
        <>
            <Main>
                <button type="button" className={styles.addButton}>
                    <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                </button>
            </Main>
        </>

    )
};