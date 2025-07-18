import styles from "./modal.module.css";
import Main from "@/components/main";
import { useState } from "react";

type ModalProps = {
    buttonLabel: string
}
const ModalComponent = ({ buttonLabel }: ModalProps) => {
    const [isOpen, setIsOpen] = useState(false)
}

export default function modal() {

    return (
        <>
            <Main>

            </Main>
        </>

    )
};