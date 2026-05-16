"use client";

import { ArrowLeft, Trash } from "lucide-react";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import Image from "next/image";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { categories } from "@/lib/constants";
import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group";
import { Spinner } from "../ui/spinner";

export default function AddProduct() {
  const [selectedParent, setSelectedParent] = useState<string>("");
  const [selectedSub, setSelectedSub] = useState<string>("");
  const [productInfo, setProductInfo] = useState<{
    title: string;
    description: string;
    category: string;
    subcategory: string;
  }>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
  });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  const [loading, setIsLoading] = useState(false);

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !productInfo.title ||
      !productInfo.description ||
      !productInfo.category
    ) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", productInfo.title);
    formData.append("description", productInfo.description);
    formData.append("category", productInfo.category);
    formData.append("subcategory", productInfo.subcategory);

    images.forEach((img) => {
      formData.append("images", img);
    });

    try {
      const res = await fetch(`${baseUrl}/api/products`, {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        toast.error("Something went wrong");
        setIsLoading(false);
        return;
      }

      toast.success("Product has been add successfully!");

      setProductInfo({
        title: "",
        description: "",
        category: "",
        subcategory: "",
      });

      setPreviews([]);
      const fileInput = document.getElementById("picture") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (error) {
      toast.error("Failed to submit the product");
    } finally {
      setIsLoading(false);
      router.refresh();
    }
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));

    setActiveIndex((prev) => {
      if (prev > index) return prev - 1;
      if (prev === index) return Math.max(0, prev - 1);
      return prev;
    });

    setTimeout(() => {
      swiperRef.current?.slideTo(Math.max(0, index - 1));
    }, 0);
  };

  const swiperRef = useRef<SwiperType | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="w-full h-max overflow-y-scroll flex flex-col gap-8">
      <div className="flex items-center  gap-4">
        <Button
          className="rounded-full "
          variant="secondary"
          size="icon-lg"
          onClick={() => router.back()}
        >
          <ArrowLeft />
        </Button>
        <h1 className="font-semibold text-2xl lg:text-4xl  ">Add Product</h1>
      </div>

      <form
        className="flex flex-col lg:flex-row items-center justify-between p-5   lg:p-10 "
        onSubmit={handleSubmit}
      >
        {/*  img */}
        <div onSubmit={handleSubmit} className=" flex-1 flex flex-col gap-2">
          <div className="w-full ">
            <h1 className="font-semibold text-2xl p-5 text-neutral-800 ">
              Add image
            </h1>

            <input
              type="file"
              className="hidden"
              id="img"
              multiple
              accept="image/*"
              onChange={(e) => {
                const files = Array.from(e.target.files || []);

                setImages((prev) => [...prev, ...files]);
                setPreviews((prev) => [
                  ...prev,
                  ...files.map((file) => URL.createObjectURL(file)),
                ]);
              }}
            />
          </div>
          <div
            className={`${images.length ? "w-full h-full relative p-5 bg-gray-50 rounded-2xl" : "hidden"}`}
          >
            <Swiper
              className="w-full h-full   min-w-0 "
              modules={[Navigation, Pagination]}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper;
              }}
              onSlideChange={(swiper) => {
                setActiveIndex(swiper.activeIndex);
              }}
            >
              {previews.map((src, i) => {
                return (
                  <SwiperSlide
                    className="!w-full h-full flex items-center justify-center "
                    key={i}
                  >
                    <Image
                      src={src}
                      key={i}
                      alt={`Image${i}`}
                      height={50}
                      width={50}
                      className="w-full h-full object-contain max-w-full max-h-full rounded-xl"
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          <div className="flex items-center gap-4 px-5">
            {previews.map((src, i) => {
              return (
                <div
                  className="h-[5rem] w-[5rem] relative "
                  onClick={() => swiperRef.current?.slideTo(i)}
                  key={i}
                >
                  <Button
                    variant="ghost"
                    className="cursor-pointer transition-all hover:bg-red-200 absolute top-0 right-0  text-red-500 hover:text-red-500 bg-transparent"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeImage(i);
                    }}
                  >
                    <Trash className="text-red-500 w-5 h-5  " />
                  </Button>
                  <Image
                    src={src}
                    alt={`Image${i}`}
                    height={50}
                    width={50}
                    className={`${activeIndex === i ? "border-2 border-blue-400 opacity-100" : "border-0 opacity-70"} h-full w-full object-cover rounded-md`}
                  />
                </div>
              );
            })}
            <label
              htmlFor="img"
              className={` ${images.length ? "w-[5rem]" : "w-full  h-[50vh]"}  bg-gray-50 border-neutral-200 rounded-xl  flex items-center justify-center gap-2 h-[5rem] w-[5rem]`}
            >
              <span className="font-bold text-4xl">+</span>
            </label>
          </div>
        </div>

        <Input
          className="hidden"
          id="img-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => {
            const files = Array.from(e.target.files || []);

            setImages((prev) => [...prev, ...files]);
            setPreviews((prev) => [
              ...prev,
              ...files.map((file) => URL.createObjectURL(file)),
            ]);
          }}
        />

        <div className="w-full lg:w-[40%] p-0 lg:p-5 flex flex-col gap-8 mt-28 lg:mt-0 ">
          <label htmlFor="ProductName" className="text-sm flex flex-col gap-2">
            Name
            <Input
              id="ProductName"
              placeholder="Enter the Product"
              value={productInfo.title}
              onChange={(e) =>
                setProductInfo({ ...productInfo, title: e.target.value })
              }
              required
            />
          </label>

          <label htmlFor="desc" className="text-sm flex flex-col gap-2">
            Description
            <textarea
              id="desc"
              placeholder="Enter description"
              name=""
              value={productInfo.description}
              onChange={(e) =>
                setProductInfo({ ...productInfo, description: e.target.value })
              }
              required
            />
          </label>

          <div className="flex flex-col gap-2">
            <span className="text-sm text-left">Category</span>

            <ToggleGroup
              type="single"
              value={selectedParent}
              onValueChange={(val) => {
                setSelectedParent(val);
                setSelectedSub("");
              }}
            >
              {categories.map((cat) => (
                <ToggleGroupItem
                  key={cat.title}
                  value={cat.title}
                  className="border rounded-full"
                  onClick={(e) =>
                    setProductInfo({ ...productInfo, category: cat.title })
                  }
                >
                  {cat.title}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>

          {selectedParent && (
            <>
              <div className="mt-4">
                <h3 className="text-sm  mb-2">Subcategories</h3>
                <ToggleGroup
                  type="single"
                  value={selectedSub}
                  onValueChange={(val) => setSelectedSub(val)}
                >
                  {categories
                    .find((cat) => cat.title === selectedParent)
                    ?.subCategories.map((sub) => (
                      <ToggleGroupItem
                        key={sub.title}
                        value={sub.title}
                        className="border"
                        onClick={(e) =>
                          setProductInfo({
                            ...productInfo,
                            subcategory: sub.title,
                          })
                        }
                      >
                        {sub.title}
                      </ToggleGroupItem>
                    ))}
                </ToggleGroup>
              </div>

              <Button
                type="submit"
                className="mt-4  w-full mx-auto flex items-center gap-2 rounded-full py-5"
                disabled={loading}
              >
                {loading && <Spinner className="mr-2" />}
                {loading ? "Please wait" : "  Add "}
              </Button>
            </>
          )}
        </div>
      </form>
    </div>
  );
}
