'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Modal from "@/components/modal";
import DetailForm from "@/components/detailForm";
import LoveStamp from "@/assets/loveStamp.svg";
import RepeatStamp from "@/assets/repeatStamp.svg";
import SadStamp from "@/assets/sadStamp.svg";
import Image from "next/image";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect } from "react";


interface Item {
    id: string;
    name: string;
    qty: number;
    unit: string;
    category: string;
    feeling: "love" | "repeat" | "sad" | "";
}


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

    // フォームの state
    const [itemName, setItemName] = useState("");
    const [qty, setQty] = useState(1);
    const [unit, setUnit] = useState("");
    const [category, setCategory] = useState("");
    const [feeling, setFeeling] = useState<"love" | "repeat" | "sad" | "">("");

    // リストの state
    const [items, setItems] = useState<Item[]>([]);

    // localStorage からロード
    useEffect(() => {
        const saved = localStorage.getItem("bagItems");
        if (saved) setItems(JSON.parse(saved));
    }, []);

    // items が変わるたび保存
    useEffect(() => {
        localStorage.setItem("bagItems", JSON.stringify(items));
    }, [items]);

    // 追加ハンドラ
    const handleAdd = () => {
        if (!itemName.trim()) return;
        const newItem: Item = {
            id: Date.now().toString(),
            name: itemName,
            qty,
            unit,
            category,
            feeling,
        };
        setItems(prev => [...prev, newItem]);
        // フォームリセット
        setItemName("");
        setQty(1);
        setUnit("");
        setCategory("");
        setFeeling("");
    };

    return (
        <>
            <Header title={`${name}のバッグ`} />
            <Main className={styles.main}>
                <div className={`${styles.bagImage} ${handleColor()}`}>
                    <ul className={styles.savedList}>
                        {items.map((it) => (
                            <li key={it.id} className={styles.savedItem}>
                                <input type="checkbox" className={styles.checkList} />
                                {it.name}
                                {it.qty}個,{it.unit}
                                [{it.category}]
                                {it.feeling === "love" && (
                                    <Image src={LoveStamp} alt="好き" width={24} height={24} />
                                )}
                                {it.feeling === "repeat" && (
                                    <Image src={RepeatStamp} alt="リピ確!" width={24} height={24} />
                                )}
                                {it.feeling === "sad" && (
                                    <Image src={SadStamp} alt="微妙" width={24} height={24} />
                                )}
                            </li>
                        ))}
                    </ul>
                    <div className={styles.modalBtnWrap}>
                        <Modal modalTitle='定番アイテム' buttonIcon={faListUl}>
                            <div className={styles.stdListBtnWrap}>
                                <button
                                    type="button"
                                    className={styles.stdListBtn}>
                                    一覧を見る
                                </button>
                            </div>
                        </Modal>
                        <Modal modalTitle='商品詳細'>
                            <DetailForm
                                itemName={itemName}
                                setItemName={setItemName}
                                qty={qty}
                                setQty={setQty}
                                unit={unit}
                                setUnit={setUnit}
                                category={category}
                                setCategory={setCategory}
                                feeling={feeling}
                                setFeeling={setFeeling}
                            />

                            <div className={styles.detailFormActions}>
                                <div className={styles.defaultItemWrap}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                    />
                                    <span className={styles.defaultItemText}>
                                        定番アイテム<br />
                                        に追加する
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    className={styles.listAddBtn}
                                    onClick={handleAdd}
                                >
                                    リストに追加
                                </button>
                            </div>
                        </Modal>

                    </div>


                </div>
            </Main >
            <Footer />
        </>

    );
}
