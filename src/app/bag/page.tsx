'use client';

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
import React, { useState, useEffect, useRef, Suspense } from "react";
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
    return (
        <Suspense fallback={<div>Loading…</div>}>
            <PageContent />
        </Suspense>
    )
}


function PageContent() {
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


    const [itemName, setItemName] = useState("");
    const [qty, setQty] = useState(1);
    const [unit, setUnit] = useState("");
    const [category, setCategory] = useState("");
    const [feeling, setFeeling] = useState<"love" | "repeat" | "sad" | "">("");
    const [isDefaultItem, setIsDefaultItem] = useState(false);
    const [defaultItems, setDefaultItems] = useState<Item[]>([]);


    const [items, setItems] = useState<Item[]>([]);


    const didMountRef = useRef(false);


    const categories = ["食品", "調味料", "日用品"] as const;
    type CategoryTab = typeof categories[number];
    const [activeCategory, setActiveCategory] = useState<CategoryTab>("食品");


    useEffect(() => {
        const saved = localStorage.getItem("bagItems");
        if (saved) {
            setItems(JSON.parse(saved));
        }
    }, []);


    useEffect(() => {
        if (didMountRef.current) {
            localStorage.setItem("bagItems", JSON.stringify(items));
        } else {
            didMountRef.current = true;
        }
    }, [items]);


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
            const cat = category || activeCategory;
            setDefaultItems(prev => [...prev, { ...newItem, category: cat }]);
        }

        setItemName("");
        setQty(1);
        setUnit("");
        setCategory("");
        setFeeling("");
        setIsDefaultItem(false);
    };
    const handleDelete = (id: string) => {

        setItems(prev => prev.filter(it => it.id !== id));

        setDefaultItems(prev => prev.filter(it => it.id !== id));
    };

    const handleAddSingleStdItem = (std: Item) => {
        const newItem: Item = {
            ...std,
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
                                    {/* {it.category && <>[{it.category}]</>} */}
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
                                        onClick={() => handleDelete(it.id)}
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
                                    {categories.map((c) => (
                                        <button
                                            key={c}
                                            type="button"
                                            className={`${styles.tab} ${activeCategory === c ? styles.active : ""}`}
                                            onClick={() => setActiveCategory(c)}
                                            aria-pressed={activeCategory === c}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                                <div className={styles.stdItemsContainer}>
                                    {defaultItems.filter(item => item.category === activeCategory)
                                        .map(item => (
                                            <button
                                                key={item.id}
                                                type="button"
                                                className={styles.stdItem}
                                                onClick={() => handleAddSingleStdItem(item)}
                                            >
                                                {item.name}
                                                {item.feeling && (
                                                    <Image src={item.feeling === "love" ? LoveStamp :
                                                        item.feeling === "repeat" ? RepeatStamp :
                                                            SadStamp
                                                    }
                                                        alt={item.feeling === "love" ? "好き" :
                                                            item.feeling === "repeat" ? "リピ確!" :
                                                                "微妙"
                                                        }
                                                        className={styles.stdStamp}
                                                    />
                                                )}
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
