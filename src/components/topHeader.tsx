import styles from "./topHeader.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faBullhorn, faUser } from '@fortawesome/free-solid-svg-icons';
import Link from "next/link";
import logo from '@/assets/logo.png'
import Image from "next/image";


export default function TopHeader() {
    return (
        <header className={styles.header}>
            <div className={`${styles.headerItem} ${styles.left}`}>
                <Link href="/profile" className={styles.navItem}>
                    <FontAwesomeIcon icon={faUser} className={styles.icon} />
                </Link>
            </div>
            <div className={styles.headerItem}>
                <Image className={styles.logo} src={logo} alt="ペアバッグ" />
            </div>
            <div className={`${styles.headerItem} ${styles.right}`}>
                <Link href="/notice" className={styles.navItem}>
                    <FontAwesomeIcon icon={faBullhorn} className={styles.icon} />
                </Link>
                <Link href="/notification" className={styles.navItem}>
                    <FontAwesomeIcon icon={faBell} className={styles.icon} />
                </Link>
            </div>
        </header>
    );
};

