import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {  Menu, Phone } from "lucide-react"

import Image from "next/image"
import Link from "next/link"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { categories } from "@/lib/constants"
import { Button } from "@/components/ui/button"


export default function SideBar() {
  return (
   <Sheet >
  <SheetTrigger asChild>
    <Button size="icon-lg"  className="rounded-full" variant="ghost">
    <Menu />
    </Button>
  </SheetTrigger>
  <SheetContent side="right" className="overflow-x-scroll">
    <SheetHeader>
      <SheetTitle>    
             <Link href="/" >
            <Image
                 src="/homesense.jpg"
              alt="logo"
              width={50}
              height={50}
              className='rounded-full'
              />
      </Link>

        </SheetTitle>
      <SheetDescription className="flex flex-col  items-start justify-between py-10 px-2 gap-8  ">
        <Accordion type="single" collapsible defaultValue={`items-1`}  className='w-full border-0 bg-white flex flex-col gap-8 text-center rounded-md'>
  {
      categories.map(({Catslug,title,subCategories}) => (
  <AccordionItem value={`item-${title}`} className='w-full '>
    <div className="flex items-center w-full justify-between ">
<Link href={`/products/${Catslug}`} className="font-semibold text-black text-2xl">
<SheetClose className="cursor-pointer hover:underline">
{title}
</SheetClose>
</Link>
    <AccordionTrigger className='w-max cursor-pointer  '></AccordionTrigger>
    </div>
    <AccordionContent className='flex flex-col items-start justify-start gap-4 p-5'>
       {subCategories.map(({title,slug}) => (
         <Link
           href={`/products/${Catslug}/${slug}`}
         key={title}>
         <SheetClose  className="hover:underline cursor-pointer text-neutral-800">
          {title}

        </SheetClose>
          </Link>
       ))}
     
    </AccordionContent>
  </AccordionItem>

))
}
</Accordion>


  <div className="w-full flex flex-col gap-2 ">
          <Button className="bg-green-500 flex-1 py-4 flex items-center justify-center rounded-full">
            <Link
              href={`https://wa.me/923060675103?text=`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center gap-2 justify-center "
            >
            <Image
                src="/whatsapp.svg"
                alt="Whatsapp"
                height={20}
                width={20}
                priority
              />
              <span>Whatsapp us</span>
            </Link>
          </Button>

          <Button className=" py-4 flex flex-1 items-center justify-center rounded-full">
            <a
              href="tel:+923060675103"
              className="w-full flex items-center gap-2 justify-center "
            >
              <Phone /> Call us
            </a>
          </Button>
        </div>
      </SheetDescription>
    </SheetHeader>
  </SheetContent>
</Sheet>
  )
}
