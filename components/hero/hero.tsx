"use client"
import AutoPlayCarousel from "./carousel";
import Card from "../card/card";

import { useState, useEffect } from 'react';

type Article = {
    title : string,
    description: string,
    src:string,
    alt:string,
    id: number,
    bg: string,
    url: string
}

const articles : Article[] = [{
  title : 'Ramadan🌙: The Month of Transformation',
  description : "Ramadan is a time of immense blessings, self-improvement, and deepening faith.  🌙✨",
  src:'/ramadan-hero.png',
  alt:'Ramadan',
  id: 1,
  bg:'bg-fuchsia-50',
  url: '/vendors/ramadan'
},
{
  title : 'Zakat💛: Purifying Wealth, Elevating Souls',
  description : "What if true wealth wasn’t about how much you keep, but how much you give?🤲✨",
  src:'/zakat-hero.png',
  alt:'zakat',
  id: 2,
  bg:'bg-pink-50',
  url: '/vendors/zakat'
},
{
    title :'Shahada☝️: The Foundation of Faith',
    description : "The testimony that there is no god but Allah, and Muhammad (ﷺ) is His Messenger.🤲✨",
    src:'/shahada-hero.jpg',
    alt:'shahada',
    id: 3,
    bg:'bg-violet-50',
    url: '/vendors/zakat'
  },
{
    title : 'Salat🕋: The Daily Connection with Allah',
    description : "It’s more than just movements; it’s a spiritual recharge, a moment of peace in a busy world.🤲✨",
    src:'/salat-hero.jpg',
    alt:'salat',
    id: 4,
    bg:'bg-purple-50',
    url: '/vendors/zakat'
  },  
{
    title : 'Hajj🕋: The Journey of a Lifetime',
    description : "Standing among millions, with no status or wealth separating you—just you and Allah.🤲✨",
    src:'/hajj-hero.png',
    alt:'hajj',
    id: 5,
    bg:'bg-rose-50',
  url: '/'
  }
]

export default function Hero (){


    const [displayedArticles, setDisplayedArticles] = useState<Article[]>([]);

  // Function to shuffle and select 3 random articles
  const shuffleArticles = () => {
    const shuffled = [...articles].sort(() => 0.5 - Math.random()); // Randomize array
    setDisplayedArticles(shuffled.slice(0, 3)); // Pick first 3
  };

  useEffect(() => {
    shuffleArticles(); // Initially select articles

    const interval = setInterval(() => {
      shuffleArticles(); // Shuffle articles every 5 seconds
    }, 10000);

    return () => clearInterval(interval); // Cleanup on unmount
        }, []);

    return(
        <section className="flex p-5">
            <aside className=" hidden lg:block basis-1/3">
                <h3 className="mb-2 mr-2 text-center text-lg bg-sky-100 rounded-sm">Pillars of Islam</h3>
                {displayedArticles.map(article=>(
                    <Card title={article.title} 
                          description={article.description}
                          src={article.src}
                          alt={article.alt}
                          key={article.id}
                          id={article.id}
                          bg={article.bg}
                          url={article.url} />
                ))}
            </aside>
            <aside className="basis-4/4">
                <AutoPlayCarousel/>
            </aside>
        </section>
    );
};