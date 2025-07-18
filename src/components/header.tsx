
'use client'

import styles from './header.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';

type Props = {
    title: string
}

export default function Header(props: Props) {

    const router = useRouter()

    return (
        <header className={styles.header}>
            <button onClick={() => router.back()}>
                <FontAwesomeIcon icon={faChevronLeft} className={styles.icon} />
            </button>
            <h2 className={styles.title}>{props.title}</h2>
        </header>
    );
};