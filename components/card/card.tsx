import React from 'react'
import Image from 'next/image'

interface Article  {
  title : String,
  description: string,
  src:string,
  alt:string,
  id: number,
  bg: string
}

const Card: React.FC<Article> = ({title, description, src, alt, id, bg}) => {
  return(
    <div key={id} className={` flex card lg:card-side mb-2 mr-2 ${bg} shadow-sm`}>
          <figure className='basis-1/3'>
            <Image
              height={20}
              width={60}
              src={src}
              alt={alt} />
          </figure>
          <div className=" basis-2/3 p-2 card-body">
            <h2 className="card-title">{title}</h2>
            <p>{description}</p>
            <div className="card-actions justify-end">
              <button className="btn text-white hover:text-blue-500 hover:bg-gray-300 bg-blue-400 btn-xs btn-primary">Read</button>
            </div>
          </div>
    </div>
  )  
}

export default Card