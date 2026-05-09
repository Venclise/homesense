
import RecommendProducts from "@/components/products/RecommendedProducts";
import SingleProduct from "@/components/products/SingleProduct";
import type { Metadata, ResolvingMetadata } from "next";

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ;


export async function generateMetadata(
  { params, searchParams }: any,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { productid } = await params;



  const res = await fetch(`${baseUrl}/api/products/${productid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return {
      title: "Product Not Found ",
    };
  }

  const product = await res.json();


  const storeLocation = "Lahore, Pakistan";
  const productTitle = `${product.title} | Premium Furniture Lahore`;
  const productDescription = `${product.description.slice(0, 150)}... Buy ${product.title} at the best price in ${storeLocation}. Custom sizes and fabric options available.`;

  return {
    title: productTitle,
    description: productDescription,
    alternates: {
      canonical: `${baseUrl}/product/${productid}`,
    },
  openGraph: {
      title: productTitle,
      description: productDescription,
      url: `${baseUrl}/product/${productid}`,
      siteName: "HomeSense",
      images: [
        {
          url: product.image[0],
          width: 1200,
          height: 630,
          alt: `View of ${product.title} - Luxury Furniture Lahore`,
        },
      ],
      locale: "en_PK",
      type: "website", 
    },
    twitter: {
      card: "summary_large_image",
      title: productTitle,
      description: productDescription,
      images: [product.image[0]],
    },

    keywords: [
      `${product.title} price in Pakistan`,
      `${product.title} Lahore`,
      "luxury furniture DHA Lahore",
      "best interior store Gulberg",
      "customized furniture Lahore",
    ],
  };
}

export default async function page({
  params,
}: {
  params: Promise<{ productid: string }>;
}) {
  const { productid } = await params;

  const res = await fetch(`${baseUrl}/api/products/${productid}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch the product");
  }

  const product = await res.json();

  const recommendres = await fetch(
    `${baseUrl}/api/products/related?category=${product.category}&productId=${product._id}&sort=newest&limit=6`,
  );

  if (!recommendres.ok) {
    throw new Error("Failed to fetch the product");
  }

  const data = await recommendres.json();

  return (
    <div>
      <SingleProduct product={product} />

      {data.length > 0 && <RecommendProducts data={data} />}
    </div>
  );
}
