'use client'

import styles from "./detailForm.module.css";
import LoveStamp from "@/assets/loveStamp.svg"
import RepeatStamp from "@/assets/repeatStamp.svg"
import SadStamp from "@/assets/sadStamp.svg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";
import React from "react";


interface Props {
    itemName: string;
    setItemName: (v: string) => void;
    qty: number;
    setQty: (q: number) => void;
    unit: string;
    setUnit: (u: string) => void;
    category: string;
    setCategory: (c: string) => void;
    feeling: "love" | "repeat" | "sad" | "";
    setFeeling: (f: "love" | "repeat" | "sad" | "") => void;
}


export default function DetailForm({

    itemName,
    setItemName,
    qty,
    setQty,
    unit,
    setUnit,
    category,
    setCategory,
    feeling,
    setFeeling,
}: Props) {

    return (
        <>
            <form className={styles.detailForm} onSubmit={(e) => e.preventDefault()}>
                <div className={styles.formRow}>
                    <label htmlFor="itemName" className={styles.label}>
                        名前
                    </label>
                    <input
                        type="text"
                        placeholder="名前を入力してください"
                        id="itemName"
                        className={styles.input}
                        value={itemName}
                        onChange={(e) => setItemName(e.target.value)}
                    />
                </div>

                <div className={styles.formRow}>
                    <label className={styles.label}>
                        個数
                    </label>
                    <div className={styles.quantityWrap}>
                        <button
                            type="button"
                            onClick={() => setQty((q) => Math.max(1, q - 1))}
                            className={styles.qtyBtn}
                        >-</button>
                        <span className={styles.qtyCount}>{qty}</span>
                        <button
                            type="button"
                            className={styles.qtyBtn}
                            onClick={() => setQty((q) => q + 1)}
                        >+</button>
                    </div>
                    <button
                        type="button"
                        className={styles.imgBtn}
                        aria-label="画像追加">
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
                        className={styles.input}
                        value={unit}
                        onChange={(e) => setUnit(e.target.value)}
                    />
                </div>
                <div className={styles.formRow}>

                    <label htmlFor="category" className={styles.label}>
                        カテゴリー
                    </label>
                    <select
                        id="category"
                        name="category"
                        className={styles.select}
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
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
                        <button
                            type="button"
                            className={`${styles.stampItem} 
                            ${feeling === "love" ? styles.active : ""}`}
                            onClick={() => setFeeling("love")}
                        >
                            <Image src={LoveStamp} className={styles.stampImg} alt="顔文字"></Image>
                            <p>好き</p>
                        </button>
                        <button
                            type="button"
                            className={`${styles.stampItem} 
                            ${feeling === "repeat" ? styles.active : ""}`}
                            onClick={() => setFeeling("repeat")}
                        >
                            <Image src={RepeatStamp} className={styles.stampImg} alt="顔文字"></Image>
                            <p>リピ確!</p>
                        </button>
                        <button
                            type="button"
                            className={`${styles.stampItem} 
                            ${feeling === "sad" ? styles.active : ""}`}
                            onClick={() => setFeeling("sad")}
                        >
                            <Image src={SadStamp} className={styles.stampImg} alt="顔文字"></Image>
                            <p>微妙</p>
                        </button>
                    </div>
                </div>
            </form >
        </>
    )
};
