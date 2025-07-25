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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListUl } from "@fortawesome/free-solid-svg-icons";
import { faTrashCan } from '@fortawesome/free-regular-svg-icons';
import { useSearchParams } from "next/navigation";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";


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
    const [isDefaultItem, setIsDefaultItem] = useState(false);
    const [defaultItems, setDefaultItems] = useState<Item[]>([]);

    // リストの state
    const [items, setItems] = useState<Item[]>([]);

    //マウントガード用フラグ 
    const didMountRef = useRef(false);

    // ①初回マウント時に localStorage から読み込む
    useEffect(() => {
        const saved = localStorage.getItem("bagItems");
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);

    //  items が変わったときだけ保存（初回マウントはスキップ）
    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem("bagItems", JSON.stringify(items));
        } else {
            didMountRef.current = true;
        }
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

        if (isDefaultItem) {
            setDefaultItems(prev => [...prev, newItem]);
        }

        // フォームリセット
        setItemName("");
        setQty(1);
        setUnit("");
        setCategory("");
        setFeeling("");
        setIsDefaultItem(false);
    };
    const handleDelete = (id: string) => {
        // 1) items から除外
        setItems(prev => prev.filter(it => it.id !== id));
        // 2) 定番アイテムにもあれば除外したいならこちらも
        setDefaultItems(prev => prev.filter(it => it.id !== id));
    };


    //定番アイテム

    /** 定番アイテムをまとめて items に追加 */
    const handleAddSingleStdItem = (std: Item) => {
        const newItem: Item = {
            ...std,  // ← 半角ピリオド３つのスプレッド演算子
            id: Date.now().toString() + Math.random().toString(),
        };
        setItems(prev => [...prev, newItem]);
    };



    return (
        <>
            <Header title={`${name}のバッグ`} />
            <Main className={styles.main}>
                <div className={`${styles.bagImage} ${handleColor()}`}>

                    <ul className={styles.savedList}>
                        {items.map((it) => (
                            <li key={it.id} className={styles.savedItem}>
                                <div>
                                    <input type="checkbox" className={styles.checkList} />
                                    {it.name}
                                </div>
                                <div>
                                    {it.qty !== 1 && (<>{it.qty}個,{" "}</>)}{it.unit}
                                    {it.category && <>[{it.category}]</>}
                                    {it.feeling === "love" && (
                                        <Image src={LoveStamp} alt="好き" width={24} height={24} />
                                    )}
                                    {it.feeling === "repeat" && (
                                        <Image src={RepeatStamp} alt="リピ確!" width={24} height={24} />
                                    )}
                                    {it.feeling === "sad" && (
                                        <Image src={SadStamp} alt="微妙" width={24} height={24} />
                                    )}
                                    <button
                                        type="button"
                                        className={styles.deleteBtn}
                                        onClick={() => handleDelete(it.id)}   // ← ここで呼び出し
                                    >
                                        <FontAwesomeIcon icon={faTrashCan} className={styles.deleteBtn} />
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>

                    <div className={styles.modalBtnWrap}>
                        <Modal modalTitle='定番アイテム' buttonIcon={faListUl}>
                            <div className={styles.stdList}>
                                <div className={styles.stdCategory}>
                                    <button>食品</button>
                                    <button>調味料</button>
                                    <button>日用品</button>
                                </div>
                                <div className={styles.stdItemsContainer}>
                                    {defaultItems.map(item => (
                                        <button
                                            key={item.id}
                                            type="button"
                                            className={styles.stdItem}
                                            onClick={() => handleAddSingleStdItem(item)}
                                        >
                                            {item.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
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
                                        checked={isDefaultItem}
                                        onChange={e => setIsDefaultItem(e.target.checked)}
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


                </div >
            </Main >
            <Footer />
        </>

    );
}
