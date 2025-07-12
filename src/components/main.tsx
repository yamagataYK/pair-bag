import { ReactNode } from "react";
import styles from "./main.module.css";

type Props = {
    children?: ReactNode,
    className: string
}

export default function Main(props: Props) {
    return (
        <main className={`${styles.main} ${props.className}`}>
            {props.children}
        </main>
    );
}