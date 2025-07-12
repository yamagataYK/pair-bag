
import styles from './footer.module.css';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHouse, faMessage } from '@fortawesome/free-solid-svg-icons';

export default function Footer() {
    return (

        <footer className={styles.footer}>

            <Link href="/" className={styles.navItem}>
                <FontAwesomeIcon icon={faHouse} />
                <span className={styles.text}>ホーム</span>
            </Link>
            <div className={styles.cameraButtonWrapper}>
                <Link href="/camera" className={styles.cameraButton}>
                    <FontAwesomeIcon icon={faCamera} />
                </Link>
            </div>
            <Link href="/chat" className={styles.navItem}>
                <FontAwesomeIcon icon={faMessage} />
                <span className={styles.text}>トーク</span>
            </Link>


        </footer>
    )
}
