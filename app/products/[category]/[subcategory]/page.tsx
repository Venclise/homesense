
import ProductCard from "@/components/products/ProductCard";

  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export async function generateMetadata({ params }: { params: { category?: string, subcategory?: string } }) {
  const { category, subcategory } = await params;
  
  const formattedCategory = slugToCategory(category);
  const formattedSubCategory = slugToCategory(subcategory);
  

  const location = "Cavalry Ground, Lahore";
  const brandName = "HomeSense"; 

  const pageTitle = subcategory 
    ? `Premium ${formattedSubCategory} in ${formattedCategory} | ${brandName} Cavalry Ground`
    : `Luxury ${formattedCategory} Furniture | ${brandName} Cavalry Ground`;

  const description = `Discover high-quality ${formattedSubCategory || formattedCategory} in ${location}. From modern designs to bespoke luxury furniture, find the perfect pieces for your home at ${brandName}.`;

  const path = subcategory ? `${category}/${subcategory}` : `${category}`;

  return {
    title: pageTitle,
    description: description,
    alternates: {
      canonical: `${baseUrl}/products/${path}`,
    },
    openGraph: {
      title: pageTitle,
      description: description,
      url: `${baseUrl}/products/${path}`,
      siteName: brandName,
      locale: "en_PK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: description,
    },
   
    keywords: [
      `${formattedSubCategory} price in Lahore`,
      `${formattedCategory} HomeSense`,
      "furniture shops in Cavalry Ground",
      "luxury interior design Lahore",
      "Cavalry Ground home decor",
      "modern furniture Pakistan",
      "custom made furniture Cavalry Ground"
    ],
  };
}

const slugToCategory = (slug?: string) => {
  if (!slug) return "";
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, char => char.toUpperCase());
};

export default async function Page({
  params,
}: {
  params: { category?: string ,subcategory?:string};
}) {
  const { category,subcategory } = await params;



  const formattedCategory = slugToCategory(category);
   const formattedSubCategory = slugToCategory(subcategory);


    
   const query = new URLSearchParams({
    category: formattedCategory,
    subcategory: formattedSubCategory,
  });




  const res = await fetch(
    `${baseUrl}/api/products?${query.toString()}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    return <p>Failed to fetch products</p>;
  }

  const data = await res.json();



  return (
    <div className="mt-12 p-5 lg:p-10">
      <h1 className="text-xl lg:text-4xl mt-12 p-5">
        Shop {formattedSubCategory} in {" "}
        {formattedCategory}</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-5 gap-y-30 md:gap-y-23 w-full py-10">
        {data.map((product: any) => (
          <ProductCard data={product} key={product._id} />
        ))}
      </div>
    </div>
  );
}
