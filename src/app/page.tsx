import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Main from "@/components/main";
import bagFront from '@/assets/bagFront.png'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/footer";
import TopHeader from "@/components/topHeader";


export default function Page() {
  return (
    <>
      <TopHeader />
      <Main className={styles.main}>
        <section className={styles.shopBagWrap} >
          <h1>買い物バッグ一覧</h1>
          <input type="date" className={styles.date} />
          <span className={styles.border} ></span>
          <div className={styles.boxWrap} >
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
            <div className={styles.box}></div>
          </div>
        </section >
        <section className={styles.shareBagWrap} >
          <h2>共有バッグ</h2>
          <Link href="/bag" >
            <div className={styles.shareBag}>
              <Image className={styles.shareBagImage} src={bagFront} alt="赤いカバン" />
            </div>
          </Link>
          <button type="button" className={styles.addButton}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </section>
      </Main>
      <Footer />
    </>
  );
}
