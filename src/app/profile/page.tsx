'use client'

import styles from "./page.module.css";
import Main from "@/components/main";
import Footer from "@/components/footer";
import Header from "@/components/header";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faComment, faPen } from '@fortawesome/free-solid-svg-icons'
import { partners, bagTypes } from '@/data/bagTypes'
import Image from 'next/image'


export default function Page() {
    return (
        <>
            <Header title="プロフィール" />
            <Main className={styles.main}>
                <div className={styles.container}>
                    {/* プロフィールリスト */}
                    <section className={styles.profileList}>
                        {partners.map((partner) => {
                            const bag = bagTypes.find((bag) => bag.name === partner.name)
                            return (
                                <div key={partner.id} className={styles.profileCard}>
                                    <section className={styles.profileInfo}>
                                        <div className={styles.user} />
                                        <div className={styles.profileText}>
                                            <span className={styles.name}>
                                                {partner.name}
                                            </span>
                                            <span className={styles.id}>ID{partner.id}</span>
                                        </div>
                                    </section>
                                    <div className={styles.profileAction}>
                                        {bag ? (
                                            <Image
                                                src={bag.image}
                                                alt={`${partner.name}のバッグ`}
                                                width={60}
                                                height={60}
                                                className={styles.bagIcon}
                                            />
                                        ) :
                                            <div className={styles.bagImgPlaceholder} />
                                        }
                                        <button type="button">
                                            <FontAwesomeIcon icon={faEllipsisV} className={styles.ellipsis} />
                                        </button>
                                    </div>
                                </div>
                            )
                        })}
                    </section>
                    <div className={styles.buttonWrap}>
                        <button className={styles.chatButton}>
                            <FontAwesomeIcon icon={faComment} className={styles.penIcon} /> チャット
                        </button>
                        <button className={styles.listButton}>
                            定番アイテム一覧
                        </button>
                    </div>
                    <section className={styles.messageWrap}>
                        <h3 className={styles.messageTitle}>
                            <FontAwesomeIcon icon={faPen} className={styles.penIcon} />
                            パートナーに一言
                        </h3>
                        <div className={styles.messageBox}>
                            <textarea
                                placeholder="ここに入力してください"
                                className={styles.messageText}
                                rows={3}
                            />
                        </div>
                    </section>

                </div>
            </Main>
            <Footer />
        </>
    )
}