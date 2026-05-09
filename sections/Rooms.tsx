import { rooms } from '@/lib/constants'
import { ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Rooms() {
  return (
    <div className='w-full h-max p-2 lg:p-5 mt-12 flex flex-col gap-8'>
                <h1 className="text-4xl lg:text-6xl font-semibold ">Shop by rooms.</h1>
    <div className=' grid grid-cols-2 gap-2 items-center  flex-wrap   '>
        {
            rooms.map(({id,title,img,slug}) => (
                <Link href={`/products/${slug}`} className='h-[70vh] lg:h-[120vh] group transition-all  relative ' key={id}>
                    <Image src={img} alt={title} fill className='w-full z-[-1] h-full object-cover rounded-lg brightness-80' />
               <h3 className='text-white underline transition-all flex items-center group-hover:gap-1 text-md lg:text-xl z-100 absolute bottom-5 left-5 ' >
                   {title}  <ChevronRight className='lg:size-8 size-4' />
               </h3>
                    </Link>
            ))
        }
      
    </div>
    </div>
  )
}
