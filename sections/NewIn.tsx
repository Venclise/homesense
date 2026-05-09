"use client";

import ProductCard from "@/components/products/ProductCard";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import { A11y, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/pagination";
import Loading from "@/components/products/loading";

type item = {
  _id: string;
  title: string;
  description: string;
  category: string;
  image: string[];
};

export default function NewIn() {
  const [data, setData] = useState<item[]>([]);
  const [loading, setLoading] = useState(true);

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch("/api/products?limit=8&sort=newest");
        if (!res.ok) throw new Error("failed to fetch products");

        const result = await res.json();

        console.log(result);

        setData(Array.isArray(result) ? result : result.products || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    }
    getProducts();
  }, []);

  return (
    <div className="lg:p-10 p-2 py-10 w-full h-max flex flex-col gap-12">
      <div className="w-full flex items-center justify-between">
        <h1 className="text-4xl lg:text-6xl font-semibold ">New in</h1>
        <Link
          href="/products?sort=newest"
          className="text-sm flex font-normal items-center text-black underline"
        >
          Explore all <ChevronRight size={20} />
        </Link>
      </div>

      {loading ? (
        <Loading length={4} />
      ) : (
        <Swiper
          modules={[A11y]}
          speed={250}
          spaceBetween={10}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.1,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          className="w-full"
        >
          {data.map((product) => (
            <SwiperSlide className="h-full flex py-10">
              <ProductCard data={product} key={product._id} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
}
