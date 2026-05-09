
import ProductsGrid from '@/components/products/ProductsGrid'
import React from 'react'

import { Metadata } from "next";


const baseUrl =
process.env.NEXT_PUBLIC_SITE_URL 

export const metadata: Metadata = {
  title: "HomeSense | Designer Furniture & Modern Decor Cavalry Ground",

  description: "Explore HomeSense’s premium collection of luxury furniture and interior accessories in Cavalry Ground, Lahore. From elegant sofa sets to modern dining tables, discover bespoke designs for your home.",

  alternates: {
    canonical: `${baseUrl}/products`,
  },

  openGraph: {
    title: "HomeSense | Luxury Furniture & Home Decor in Cavalry Ground",
    description: "Upgrade your living space with HomeSense. Premium quality, bespoke furniture delivered across Cavalry Ground and Lahore.",
    url: `${baseUrl}/products`,
    siteName: "HomeSense",
    images: [
      {
        url: "/living.jpg", 
        width: 1200,
        height: 630,
        alt: "Modern furniture collection at HomeSense Cavalry Ground showroom",
      },
    ],
    locale: "en_PK",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Shop Modern Furniture | HomeSense Cavalry Ground",
    description: "Transform your home with HomeSense’s exclusive furniture range. Quality craftsmanship and modern designs in the heart of Lahore.",
  },

  keywords: [
    "HomeSense Lahore",
    "furniture shops in Cavalry Ground",
    "buy furniture online Pakistan",
    "modern home furniture Lahore",
    "luxury sofa sets Cavalry Ground",
    "best dining tables Lahore",
    "designer furniture HomeSense",
    "affordable luxury furniture Cavalry Ground"
  ],
};

export default function page() {



  return (
    <div>
      <ProductsGrid />
    </div>
  )
}
