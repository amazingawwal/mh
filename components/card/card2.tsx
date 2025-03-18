import React, { ReactElement } from 'react'
import Link from 'next/link'



interface Cards  {
    s_title : string,
    b_title : string,
    description?: string,
    src?:string,
    alt?:string,
    id: number,
    img: ReactElement,
    bg: string,
    url: string
  }

const MainCard:React.FC<Cards> = ({s_title, b_title, img, url, bg, id}) => {
  return (
    <div key={id}>
        <Link href={url}>
            <div className={`p-2 shadow-md rounded-lg flex justify-center items-center h-25 ${bg}`}>
                <p >{s_title} <span className="text-xl sm:text-lg font-bold" >{b_title}</span></p>
                
                {img}
                {/* <Image width={40} height={7} alt={alt} src={img}/> */}
            </div>
        </Link>
    </div>
  )
}

export default MainCard