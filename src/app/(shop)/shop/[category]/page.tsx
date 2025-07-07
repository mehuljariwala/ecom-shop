"use client";

import { useParams } from "next/navigation";
import { getProductsByCategory } from "../../../../data/products";
import ProductGrid from "../../../../components/product/ProductGrid";
import Link from "next/link";

// Category metadata for page titles and descriptions
const categoryMeta = {
  "new-arrivals": {
    title: "New Arrivals",
    description:
      "Discover our latest additions - fresh styles that just landed.",
    banner: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
  },
  dresses: {
    title: "Dresses",
    description:
      "Elegant dresses for every occasion, from casual day wear to evening elegance.",
    banner: "https://images.unsplash.com/photo-1623609163859-ca93c646ccd9",
  },
  tops: {
    title: "Tops",
    description:
      "Stylish tops to elevate your everyday look, from casual to formal.",
    banner: "https://images.unsplash.com/photo-1549062573-edc78a53ffa6",
  },
  bottoms: {
    title: "Bottoms",
    description: "Comfortable and stylish bottoms that complete your outfit.",
    banner: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246",
  },
  accessories: {
    title: "Accessories",
    description: "Complete your look with our stunning accessories collection.",
    banner: "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b",
  },
  sale: {
    title: "Sale Items",
    description: "Great styles at reduced prices. Limited time only.",
    banner: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
  },
};

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;

  // Get products for this category
  const products = getProductsByCategory(category);

  // Get metadata for this category
  const meta = categoryMeta[category as keyof typeof categoryMeta] || {
    title:
      category.charAt(0).toUpperCase() + category.slice(1).replace(/-/g, " "),
    description: "Explore our collection.",
    banner: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
  };

  return (
    <div className="min-h-screen">
      {/* Category Banner */}
      <div className="relative h-[40vh] bg-gray-200">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${meta.banner})`,
            position: "relative",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
          <div className="absolute inset-0 flex items-center">
            <div className="container-custom mx-auto px-4">
              <div className="max-w-2xl text-white">
                <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
                  {meta.title}
                </h1>
                <p className="text-lg mb-8 drop-shadow-md max-w-xl">
                  {meta.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom mx-auto py-12">
        {/* Breadcrumbs */}
        <div className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary-600 transition-colors">
            Home
          </Link>{" "}
          /{" "}
          <Link
            href="/shop"
            className="hover:text-primary-600 transition-colors"
          >
            Shop
          </Link>{" "}
          / <span className="text-gray-900">{meta.title}</span>
        </div>

        {/* Products */}
        <ProductGrid
          products={products}
          title={`${meta.title} (${products.length})`}
          infiniteScroll={true}
          initialLimit={12}
        />

        {/* Empty state with suggestions */}
        {products.length === 0 && (
          <div className="text-center py-12">
            <h2 className="text-2xl font-medium mb-4">No products found</h2>
            <p className="text-gray-600 mb-8">
              We couldn&apos;t find any products in this category at the moment.
            </p>
            <Link
              href="/shop"
              className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
              Browse All Products
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
