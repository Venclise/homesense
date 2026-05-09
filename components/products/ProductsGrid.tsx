"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function ProductsGrid() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL 

  const currentSort = searchParams.get("sort") || "";

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const params = new URLSearchParams();
   
      if (currentSort) params.set("sort", currentSort);

      const url = `${baseUrl}/api/products${params.toString() ? `?${params.toString()}` : ""}`;

      try {
        const res = await fetch(url, { cache: "no-store" });
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Failed to fetch products", error);
      }
    }

    fetchProducts();
  }, [currentSort]); 

  return (
    <div className="mt-12 p-2 lg:p-10">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl lg:text-4xl">
          Shop {currentSort === "newest" ? "New Arrivals" : "Furniture"}
        </h1>

        <Select
          value={currentSort}
          onValueChange={(newValue) => {

            const params = new URLSearchParams(searchParams.toString());
       
            if (newValue) {
              params.set("sort", newValue);
            } else {
              params.delete("sort");
            }

            router.push(`/products?${params.toString()}`);
          }}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="ascending">Alphabetically A-Z</SelectItem>
            <SelectItem value="descending">Alphabetically Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 gap-y-13 py-10">
        {products.length > 0 ? (
          products.map((item) => <ProductCard key={item._id} data={item} />)
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}