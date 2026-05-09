
import { Mail, MapPin, MessageCircle, Phone } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import React from 'react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion'
import { categories } from '@/lib/constants'

export default function Footer() {
  return (
    <>
    <div className='bg-gray-50 border-t lg:p-20 p-10 h-max w-full flex justify-around flex-wrap '>
                 <div className='flex flex-col gap-4 w-max'>
<h4 className='font-normal'>Quick Links</h4>
          {categories.map(({  title, Catslug }) => (
            <Link href={`/products/${Catslug}`} key={title} className="text-sm underline">
              {title}
            </Link>
          ))}
          </div>

                <div className='flex flex-col gap-3 w-max'>

               <h4 className=''>Contact us</h4>
               <a href="tel:+923060675103"
                 className="text-sm underline flex items-center gap-2"
               >

                       <Phone strokeWidth={1} size={15}/>
                       +923060675103
               </a>
                  
                     <Link
  href="https://wa.me/923060675103?text="
  target="_blank"
  rel="noopener noreferrer"
  className="text-sm underline flex items-center gap-2"
>
  <MessageCircle  strokeWidth={1} size={15}/>
   Contact us on Whatsapp
    </Link>
   <a href="mailto:Malik120tayyab@gmail.com"
    className="text-sm underline flex items-center gap-2"
    
    >
    <Mail strokeWidth={1} size={15}/>
  weblifyorg@gmail.com</a>
    <Link href="https://www.instagram.com/thehomesencefurniture/  " 
  target="_blank"
       className="text-sm underline flex items-center gap-2"
       >
        <Image src="/insta.svg" alt="whatsapp" height={15} width={15} />
             Instagram
            </Link> 
                <Link href="https://www.facebook.com/thehomesensefurniture" 
       className="text-sm underline flex items-center gap-2"
       >
        <Image src="/facebook.svg" alt="whatsapp" height={15} width={15} />
             Facebook
            </Link> 
          </div>

             <Accordion type="single" collapsible className='w-max' >
          <AccordionItem
            value="item-2"
            className="  lg:p-5 p-2 rounded-2xl "
            >
            <AccordionTrigger className="flex gap-4 items-center w-max">
              <MapPin />
             Store Location
            </AccordionTrigger>
            <AccordionContent className='text-center'>
           <h4 className='font-semibold'>LAHORE</h4>
           Cavalry ground, Lahore, Pakistan 46000
            </AccordionContent>
          </AccordionItem>
        </Accordion>
    </div>
       <p className='text-center text-sm p-2'>Website made by <Link className='text-blue-500 underline' href="https://weblify-nu.vercel.app/">Weblify</Link></p>
            </>
  )
}
