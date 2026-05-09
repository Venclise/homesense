import BlurText from "@/components/BlurText";
import { Button } from "@/components/ui/button";
import {
  Armchair,
  Bed,
  ChartBarIcon,
  ChevronRight,
  Lamp,
  Sofa,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Hero() {
  return (
    <div className="h-screen  w-full flex items-center flex-col justify-center  rounded-b-4xl">
      <div className="w-full h-full relative">
        <Image
          src="/sofa.jpg"
          alt="Sofa for living Room"
          fill
          className="w-full h-full brightness-70 object-cover z-[-1]"
        />
        <div className="flex flex-col z-50 gap-6 absolute bottom-10 left-10">
        <BlurText
          text="Homesense"
          delay={50}
          animateBy="letters"
          direction="top"
          className="text-6xl md:text-8xl font-semibold  text-white"
          />
        <div>
          <Link href="/products" className="">
            <Button className="bg-white  hover:bg-gray-200 hover:gap-4 lg:text-lg text-md cursor-pointer transition-all py-5 rounded-xl text-neutral-900 w-max">
              Explore Furniture <ChevronRight />
            </Button>
          </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
