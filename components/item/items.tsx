import MainCard from "../card/card2";

import React from 'react'

const Items = () => {

    type Items = {
        id:number,
        s_title:string,
        b_title:string,
        img:string,
        alt:string,
        bg:string
    }

    const items:Items[] = [
        {
            id: 1,
            s_title: 'Five Daily',
            b_title: 'Prayers',
            img: '/',
            alt: 'salat',
            bg:'bg-rose-100'
        },
        {
            id: 2,
            s_title: '99 Names of',
            b_title: 'Allah',
            img: '/',
            alt: 'salat',
            bg:'bg-pink-100'
        },
        {
            id: 3,
            s_title: 'All about',
            b_title: "Al-Qur'an",
            img: '/',
            alt: 'salat',
            bg:'bg-fuchsia-100'
        },
        {
            id: 4,
            s_title: 'Daily',
            b_title: 'Dua & Dhikr',
            img: '/',
            alt: 'salat',
            bg:'bg-purple-100'
        },
        {
            id: 5,
            s_title: 'Collection of',
            b_title: 'Hadiths',
            img: '/',
            alt: 'salat',
            bg:'bg-violet-100'
        },
        {
            id: 6,
            s_title: 'Story of the',
            b_title: 'Prophets',
            img: '/',
            alt: 'salat',
            bg:'bg-indigo-100'
        },
    ]
  return (
    <div>
        {items.map(item=>{
           return(
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            <MainCard key={item.id} 
                      s_title={item.s_title}
                      b_title = {item.b_title}
                      img = {item.img}
                      bg={item.bg}
                      alt={item.alt}
                        />
        </div>
           )
        })}
    </div>
  )
}

export default Items