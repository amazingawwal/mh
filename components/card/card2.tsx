import React from 'react'
import Link from 'next/link'
import Image from 'next/image'


interface Cards  {
    s_title : string,
    b_title : string,
    description?: string,
    src?:string,
    alt:string,
    id: number,
    img: string,
    bg: string,
    url?: string
  }

const MainCard:React.FC<Cards> = ({s_title, b_title, img, alt, bg, id}) => {
  return (
    <div key={id}>
        <Link href={'/'}>
            <div className={`p-2 shadow-md rounded-lg  ${bg}`}>
                <p className="text-xl font-bold">{s_title}</p>
                <p>{b_title}</p>
                <Image width={40} height={7} alt={alt} src={img}/>
            </div>
        </Link>
    </div>
  )
}

export default MainCard