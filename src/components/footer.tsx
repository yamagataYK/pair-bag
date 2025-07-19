
import styles from './footer.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHouse, faComment } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (

        <footer className={styles.footer}>

            <Link href="/" className={styles.navItem}>
                <FontAwesomeIcon icon={faHouse} className={styles.icon} />
                <span className={styles.text}>ホーム</span>
            </Link>
            <div className={styles.cameraButtonWrapper}>
                <Link href="/camera" className={styles.cameraButton}>
                    <FontAwesomeIcon icon={faCamera} className={styles.cameraIcon} />
                </Link>
            </div>
            <Link href="/chat" className={styles.navItem}>
                <FontAwesomeIcon icon={faComment} className={styles.icon} />
                <span className={styles.text}>チャット</span>
            </Link>


        </footer>
    )
}
