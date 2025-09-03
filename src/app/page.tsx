'use client'

import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import bagRed from "@/assets/bagRed.png"
import bagBlue from "@/assets/bagBlue.png"
import bagGreen from "@/assets/bagGreen.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import Main from "@/components/main";
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
          <div className={styles.text}>
            <h1>過去のバッグ一覧</h1>
            <p>最新</p>
          </div>
          <span className={styles.border} ></span>
          <div className={styles.bagWrap} >
            <Link href={`/bag?color=${selectedBag.color}&name=${selectedBag.name}`} >
              <Image src={bagRed} className={styles.bag} alt="バッグ" />
            </Link>
            <Link href={`/bag?color=${selectedBag.color}&name=${selectedBag.name}`} >
              <Image src={bagBlue} className={styles.bag} alt="バッグ" />
            </Link>
            <Link href={`/bag?color=${selectedBag.color}&name=${selectedBag.name}`} >
              <Image src={bagGreen} className={styles.bag} alt="バッグ" />
            </Link>
            <Link href={`/bag?color=${selectedBag.color}&name=${selectedBag.name}`} >
              <Image src={bagRed} className={styles.bag} alt="バッグ" />
            </Link>
          </div>
          <div className={styles.date}>
            <p>5/20</p>
            <p>6/8</p>
            <p>6/15</p>
            <p>7/1</p>
          </div>
        </section >
        <section className={styles.shareBagWrap} >
          <h2>{selectedBag.name}のバッグ</h2>
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
                        setOpenBagSelector(false);
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
