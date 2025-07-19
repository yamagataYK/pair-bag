import bagFront from '@/assets/bagFront.png'
import bagFront2 from '@/assets/bagFront2.png'
import bagFront3 from '@/assets/bagFront3.png'
import type { StaticImageData } from 'next/image'


export type BagType = {
    name: string,
    color: 'red' | 'blue' | 'green',
    image: StaticImageData
}

export const bagTypes: BagType[] = [
    {
        name: "やまけん",
        color: "red",
        image: bagFront
    },
    {
        name: "たぬき",
        color: "blue",
        image: bagFront2
    },
    {
        name: "イベント",
        color: "green",
        image: bagFront3
    }
]

export type Partner = {
    name: string
    id: string

}

export const partners: Partner[] = [
    { name: 'やまけん', id: '@kaito_00', },
    { name: 'たぬき', id: '@tanuki_11', },
]