import MainCard from "../card/card2";
import { ReactElement } from "react";
import React from 'react'
import { Pray, Salat, Quran, Hadith, Story, Crescent } from "../svg/crescent";

const Items = () => {

    type Items = {
        id:number,
        s_title:string,
        b_title:string,
        img:ReactElement,
        alt:string,
        bg:string,
        url:string
    }

    const items:Items[] = [
        {
            id: 1,
            s_title: 'Five Daily',
            b_title: 'Prayers',
            img: <Salat className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-rose-100',
            url:'/'
        },
        {
            id: 2,
            s_title: '99 Names of',
            b_title: 'Allah',
            img: <Crescent className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-pink-100',
            url:'/names-of-Allah'
        },
        {
            id: 3,
            s_title: 'All about',
            b_title: "Al-Qur'an",
            img: <Quran className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-fuchsia-100',
            url:'/'
        },
        {
            id: 4,
            s_title: 'Daily',
            b_title: 'Dua & Dhikr',
            img: <Pray className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-purple-100',
            url:'/'
        },
        {
            id: 5,
            s_title: 'Collection of',
            b_title: 'Hadiths',
            img: <Hadith className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-violet-100',
            url:'/'
        },
        {
            id: 6,
            s_title: 'Story of the',
            b_title: 'Prophets',
            img: <Story className="my-svg" width="100px" height="50px" />,
            alt: 'salat',
            bg:'bg-indigo-100',
            url:'/'
        },
    ]
  return (
    <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 gap-4 px-4">
        {items.map(item=>{
           return(
            <MainCard key={item.id}
                      id={item.id} 
                      s_title={item.s_title}
                      b_title = {item.b_title}
                      img = {item.img}
                      bg={item.bg}
                      alt={item.alt}
                      url={item.url}
                        />
           )
        })}
    </div>
  )
}

export default Items