import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const MainCard = ({s_title, b_title, img, alt, bg}) => {
  return (
    <div>
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