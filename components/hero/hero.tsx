import AutoPlayCarousel from "./carousel";
import Card from "../card/card";

export default function Hero (){
    type Article = {
        title : String,
        description: string,
        src:string,
        alt:string,
        id: number,
        bg: string
    }

    const articles : Article[] = [{
      title : 'Ramadan',
      description : "Ramadan is a time of immense blessings, self-improvement, and deepening faith.  🌙✨",
      src:'/icons8.png',
      alt:'Ramadan',
      id: 1,
      bg:'bg-fuchsia-50'
    },
    {
      title : 'Zakat',
      description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
      src:'/icons8.png',
      alt:'zakat',
      id: 2,
      bg:'bg-pink-50'
    }
  ]
    return(
        <section className="flex p-5">
            <aside className="basis-1/4">
                <h3 className="">Articles</h3>
                {articles.map(article=>(
                    <Card title={article.title} 
                          description={article.description}
                          src={article.src}
                          alt={article.alt}
                          key={article.id}
                          id={article.id}
                          bg={article.bg} />
                ))}
            </aside>
            <aside className="basis-3/4">
                <AutoPlayCarousel/>
            </aside>
        </section>
    );
};