import React from 'react'
import Image from 'next/image'
import Link from 'next/link'


interface Article  {
  title : string,
  description: string,
  src:string,
  alt:string,
  id: number,
  bg: string,
  url: string
}

const Card: React.FC<Article> = ({title, description, src, alt, id, bg, url}) => {
  return(
    <div key={id} className={`flex card lg:card-side mb-2 mr-2 ${bg} shadow-sm h-36`}>
          <figure className='  basis-1/3 basis-1/3'>
            <Image
              className='hidden md:flex'
              height={10}
              width={100}
              src={src}
              alt={alt} />
          </figure>
          <div className=" basis-2/3 p-2 card-body">
            <h2 className="card-title text-sm ">{title}</h2>
            <p className="hidden text-xs lg:block">{description}</p>
            <Link href={url} className="card-actions justify-end">
              <button className="btn text-white hover:text-blue-500 hover:bg-gray-300 bg-blue-400 btn-xs btn-primary">Read</button>
            </Link>
          </div>
    </div>
  )  
}

export default Card