"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import ProductActions from "./ProductActions"

type ProductData = {
  _id: string
  title: string
  description: string
  category: string
  image: string[]
}



export default function ProductCard({ data }: { data: ProductData }) {
  const pathname = usePathname()
  const isDashboard = pathname === "/dashboard"

  

    

  

  return (
    
    <div 
          className="h-[22rem]  group  relative"
    >

    <Link
      href={`${isDashboard ? "#" : `/products/item/${data._id}`}`}
      className="h-full w-full "

    >

   
      <div className="h-[90%] w-full relative overflow-hidden">
      
        <Image
          src={data.image[0]}
          alt={data.title}
          fill
          className={`object-cover transition-opacity duration-300 ${
            !isDashboard && data.image.length > 1
              ? "group-hover:opacity-0"
              : ""
          }`}
        />

      
        {!isDashboard && data.image.length > 1 && (
          <Image
            src={data.image[1]}
            alt={data.title}
            fill
            className="object-cover opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          />
        )}

        
</div>

      <div className="flex flex-col items-center gap-4 px-5 mt-4">
      

        {
          isDashboard && (
            <ProductActions id={data._id}/>
          )
        }
        
        <h2 className="text-lg  md:text-xl  text-center line-clamp-2">{data.title}</h2>
      </div>

    </Link>
    </div>

  )
}
