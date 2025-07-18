'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";
import LoveStamp from "@/assets/loveStamp.svg"
import RepeatStamp from "@/assets/repeatStamp.svg"
import SadStamp from "@/assets/sadStamp.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import { useState } from 'react'



export default function Page() {
    const searchParams = useSearchParams();
    const color = searchParams.get('color');
    const name = searchParams.get('name');



    const handleColor = () => {
        switch (color) {
            case "red":
                return styles.red
            case "blue":
                return styles.blue
            case "green":
                return styles.green

            default:
                return styles.red
        }
    }

    const [qty, setQty] = useState<number>(1)

    return (
        <>
            <Header title={`${name}のバッグ`} />
            <Main className={styles.main}>
                <div className={`${styles.bagImage} ${handleColor()}`}>
                    <div className={styles.addButtonWrap}>
                        <button type="button" className={styles.addButton}>
                            <FontAwesomeIcon icon={faListUl} className={styles.icon} />
                        </button>
                        <Modal modalTitle='商品詳細'>
                            <form className={styles.detailForm}>
                                <div className={styles.formRow}>
                                    <label htmlFor="itemName" className={styles.label}>
                                        名前
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="名前を入力してください"
                                        id="itemName"
                                        className={styles.input} />
                                </div>

                                <div className={styles.formRow}>
                                    <label className={styles.label}>
                                        個数
                                    </label>
                                    <div className={styles.quantityWrap}>
                                        <button
                                            type="button"
                                            onClick={() => setQty(q => Math.max(1, q - 1))}
                                            className={styles.qtyBtn}
                                        >-</button>
                                        <span className={styles.qtyValue}>{qty}</span>
                                        <button
                                            type="button"
                                            className={styles.qtyBtn}
                                            onClick={() => setQty(q => q + 1)}
                                        >+</button>
                                    </div>
                                    <button type="button" className={styles.imgBtn} aria-label="画像追加">
                                        <FontAwesomeIcon icon={faImages} />
                                    </button>
                                </div>

                                <div className={styles.formRow}>
                                    <label htmlFor="unit" className={styles.label}>
                                        単位
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="g"
                                        id="unit"
                                        className={styles.input} />
                                </div>
                                <div className={styles.formRow}>

                                    <label htmlFor="category" className={styles.label}>
                                        カテゴリー
                                    </label>
                                    <select id="category" name="category" className={styles.select}>
                                        <option value="">カテゴリーを選択</option>
                                        <option>食品</option>
                                        <option>調味料</option>
                                        <option>日用品</option>
                                    </select>
                                </div>

                                <div className={styles.formRow}>
                                    <label htmlFor="feeling" className={styles.label} >
                                        気持ち
                                    </label>
                                    <div className={styles.stampWrap}>
                                        <div className={styles.stampItem}>
                                            <Image src={LoveStamp} className={styles.stampImg} alt="顔文字"></Image>
                                            <p>好き</p>
                                        </div>
                                        <div className={styles.stampItem}>
                                            <Image src={RepeatStamp} className={styles.stampImg} alt="顔文字"></Image>
                                            <p>リピ確!</p>
                                        </div>
                                        <div className={styles.stampItem}>
                                            <Image src={SadStamp} className={styles.stampImg} alt="顔文字"></Image>
                                            <p>微妙</p>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div>
                                <div>
                                    <input type="checkbox" />
                                    <p>定番アイテム<br />
                                        に追加する</p>
                                </div>
                                <div>
                                    <button type="button">リストに追加</button>
                                </div>

                            </div>
                        </Modal>
                    </div>
                </div>
            </Main >
            <Footer />
        </>

    );
}
