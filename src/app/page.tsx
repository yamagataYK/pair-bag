'use client'

import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";
import Main from "@/components/main";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Footer from "@/components/footer";
import TopHeader from "@/components/topHeader";
import { useState } from "react";
import { bagTypes, type BagType } from '@/data/bagTypes'

export default function Page() {
  const [openBagSelector, setOpenBagSelector] = useState<boolean>(false)
  const [selectedBag, setSelectedBag] = useState<BagType>(bagTypes[0])

  return (
    <>
      <TopHeader />
      <Main className={styles.main}>
        <section className={styles.shopBagWrap} >
          <h1>買い物バッグ一覧</h1>
          <input type="month" className={styles.date} />
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
          <Link href={`/bag?color=${selectedBag.color}&name=${selectedBag.name}`} >
            <div className={styles.shareBag}>
              <Image className={styles.shareBagImage} src={selectedBag.image} alt={selectedBag?.color} />
            </div>
          </Link>
          <div className={styles.addButtonWrap}>
            <div className={styles.addButton}
              onClick={() => {
                setOpenBagSelector(!openBagSelector)
              }}>
              <FontAwesomeIcon icon={faPlus} className={styles.icon} />
              {openBagSelector &&
                <div className={styles.bagSelector}>
                  {bagTypes.map((bagType, idx) => (
                    <div key={idx} className={styles.bagSelectorItem}
                      onClick={() => {
                        setSelectedBag(bagType)
                      }}>
                      <Image src={bagType.image} alt={bagType.color} className={styles.bagSelectorItemImage} />
                      <p className={styles.bagSelectorItemName}>{bagType.name}</p>
                    </div>
                  ))}
                </div>
              }
            </div>
          </div>
        </section>
      </Main>
      <Footer />
    </>
  );
}
