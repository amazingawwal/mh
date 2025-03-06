"use client"; 

import { useEffect, useRef } from "react";
import Image from "next/image";

const AutoPlayCarousel = () => {
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        carouselRef.current.scrollBy({ left: 300, behavior: "smooth" });
        
        // If at the end, go back to the start
        if (
          carouselRef.current.scrollLeft + carouselRef.current.clientWidth >=
          carouselRef.current.scrollWidth
        ) {
          carouselRef.current.scrollTo({ left: 0, behavior: "smooth" });
        }
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

type User = {src:string,
    id:number,
    alt:string}

const images : User[] = [
    {
        src:'/masjid.jpg',
        id:1,
        alt:'Masjid'
    },
    {
        src:"/Qur'an.jpg",
        id:2,
        alt:"Qur'an"
    },
    {
        src:"/sujud.jpg",
        id:3,
        alt:"sajdah"
    }
]

  return (
    <div className="carousel rounded-box overflow-x-auto scroll-smooth flex" ref={carouselRef}>
      
      {images.map(
        (image)=>(
            <div  key={image.id} className="carousel-item">
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={100}
              sizes="(max-width: 768px) 100vw, 700px"
              

            />
            </div>
        )
      )}
    </div>
  );
};

export default AutoPlayCarousel;
