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
  title : 'Ramadan',
  description : "Ramadan is a time of immense blessings, self-improvement, and deepening faith.  🌙✨",
  src:'/ramadan-hero.png',
  alt:'Ramadan',
  id: 1,
  bg:'bg-fuchsia-50',
  url: '/vendors/ramadan'
},
{
  title : 'Zakat',
  description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
  src:'/zakat-hero.png',
  alt:'zakat',
  id: 2,
  bg:'bg-pink-50',
  url: '/vendors/zakat'
},
{
    title : 'Shahada',
    description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
    src:'/zakat-hero.png',
    alt:'zakat',
    id: 3,
    bg:'bg-pink-50',
    url: '/vendors/zakat'
  },
{
    title : 'Salat',
    description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
    src:'/zakat-hero.png',
    alt:'zakat',
    id: 4,
    bg:'bg-pink-50',
    url: '/vendors/zakat'
  },  
{
    title : 'Hajj',
    description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
    src:'/hajj-hero.png',
    alt:'Hajj',
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