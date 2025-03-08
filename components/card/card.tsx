import React from 'react'
import Image from 'next/image'

const Card = () => {

    type Article = {
        title : String,
        description: string,
        src:string,
        alt:string,
        key: number,
        bg: string
    }

    const articles : Article[] = [{
      title : 'Ramadan',
      description : "Ramadan is a time of immense blessings, self-improvement, and deepening faith.  🌙✨",
      src:'/icons8.png',
      alt:'Ramadan',
      key: 1,
      bg:'bg-fuchsia-50'
    },
    {
      title : 'Zakat',
      description : "Zakat is not just a duty; it is a blessing that purifies wealth, helps the less fortunate, and brings immense rewards.🤲✨",
      src:'/icons8.png',
      alt:'zakat',
      key: 2,
      bg:'bg-pink-50'
    }
  ]
  return (
    <div className='pr-2'>{
        articles.map(article=>(
      <div key={article.key} className={`flex card lg:card-side mb-2 ${article.bg} shadow-sm`}>
            <figure className='basis-1/3'>
              <Image
                height={20}
                width={60}
                // fill
                // className="object-cover"
                src={article.src}
                alt={article.alt} />
            </figure>
            <div className=" basis-2/3 p-2 card-body">
              <h2 className="card-title">{article.title}</h2>
              <p>{article.description}</p>
              <div className="card-actions justify-end">
                <button className="btn text-white hover:text-blue-500 hover:bg-gray-300 bg-blue-400 btn-xs btn-primary">Read</button>
              </div>
            </div>
      </div>
        ))
      }</div>
  )
}

export default Card