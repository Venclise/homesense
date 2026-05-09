"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
// import SearchInput from './SearchInput'

import { usePathname } from "next/navigation";
import { categories } from "@/lib/constants";
import SideBar from "./SideBar";
import { Button } from "@/components/ui/button";
import { ChevronRight, Sofa } from "lucide-react";
import SearchInput from "./SearchInput";

export default function Header() {
  const path = usePathname();

  return (
    <div
      className={`w-full p-5 flex items-center justify-between ${path === "/dashboard" || path === "/dashboard/add" ? "hidden" : "flex"}`}
    >
      <div className="flex  gap-4 items-center">
        <Link href="/">
          <Image
            src="/homesense.jpg"
            alt="logo"
            width={50}
            height={50}
            className="rounded-full"
          />
        </Link>
        {categories.map(({ title, Catslug, subCategories }) => (
          <Link
            href={`/products/${Catslug}`}
            className="group transition-all   font-normal relative lg:flex hidden"
            key={title}
          >
            {title}

            <div className="hidden  shadow-md flex-col gap-4 absolute top-5 w-[10rem] p-5 left-0 bg-white z-100 group-hover:flex">
              {subCategories.map(({ title, slug }) => (
                <Link
                  href={`/products/${Catslug}/${slug}`}
                  className="font-normal hover:underline"
                  key={title}
                >
                  {title}
                </Link>
              ))}
            </div>
          </Link>
        ))}
      </div>

      <div className="flex items-center">
        <SearchInput />

        <div className="lg:hidden flex">
          <SideBar />
        </div>
        <Link href="/products" className="lg:flex hidden">
          <Button className="bg-neutral-800 flex items-center gap-2  cursor-pointer text-white transition-all py-5 rounded-xl  w-full">
            Explore Furniture <ChevronRight />
          </Button>
        </Link>
      </div>
    </div>
  );
}
