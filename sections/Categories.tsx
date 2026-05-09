"use client"
import { furnitureca } from '@/lib/constants'
import React, { useRef, useState } from 'react'

import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import Image from 'next/image';
import Link from 'next/link';

export default function Categorires() {
    const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <div className='p-5 lg:p-10 flex flex-col lg:flex-row lg:items-center   gap-6'>
       <h1 className='text-3xl lg:text-4xl font-semibold '>
        Explore Categories
       </h1>


    <Swiper
        modules={[A11y]}
        speed={250}
        pagination={{ clickable: true }}
        breakpoints={{
          0: {
            slidesPerView: 2.5,
          },
          640: {
            slidesPerView: 2.1,
          },
          1024: {
            slidesPerView: 4.1,
          },
        }}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
        className="w-full flex items-center justify-center "
      >

       {
         furnitureca.map((item) => (
          <SwiperSlide key={item.id} className="cursor-pointer h-full">
           <Link href={`${item.slug}`} key={item.id} className='bg-gray-100 hover:scale-110 rounded-full transition-all group  w-[8rem] h-[8rem] flex flex-col items-center justify-center'>
{item.icon ? 
            <item.icon className='size-8 hover:scale-100' /> : <Image src={item.img}  alt={item.title} height={40} width={40}/>
}
            <h2 className='capitalize group-hover:underline'>{item.title}</h2>
            </Link>
</SwiperSlide>
        ))
      }
      </Swiper>
    </div>
  )
}
