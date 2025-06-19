"use client";

import { useState } from "react";
import { products } from "../../data/products";
import ProductGrid from "../../components/product/ProductGrid";

// Category definitions with titles and descriptions
const categories = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    description: "The latest additions to our collection",
    count: products.filter((p) => p.categories?.includes("new-arrivals"))
      .length,
  },
  {
    id: "dresses",
    title: "Dresses",
    description: "Elegant dresses for every occasion",
    count: products.filter((p) => p.categories?.includes("dresses")).length,
  },
  {
    id: "tops",
    title: "Tops",
    description: "Stylish tops to complete your look",
    count: products.filter((p) => p.categories?.includes("tops")).length,
  },
  {
    id: "bottoms",
    title: "Bottoms",
    description: "Comfortable and fashionable bottoms",
    count: products.filter((p) => p.categories?.includes("bottoms")).length,
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Complete your outfit with our accessories",
    count: products.filter((p) => p.categories?.includes("accessories")).length,
  },
  {
    id: "sale",
    title: "Sale",
    description: "Great styles at reduced prices",
    count: products.filter((p) => p.categories?.includes("sale")).length,
  },
];

export default function ShopPage() {
  const [sortOption, setSortOption] = useState("featured");

  // Sort products based on selected option
  const sortedProducts = [...products].sort((a, b) => {
    switch (sortOption) {
      case "price-asc":
        return (a.salePrice || a.price) - (b.salePrice || b.price);
      case "price-desc":
        return (b.salePrice || b.price) - (a.salePrice || a.price);
      case "newest":
        return a.isNew ? -1 : b.isNew ? 1 : 0;
      default: // "featured"
        return 0; // Keep original order
    }
  });

  return (
    <div className="container-custom mx-auto py-12">
      <header className="mb-12 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          Our Collection
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover our carefully curated collection of women&apos;s fashion and
          accessories. From elegant dresses to casual tops, find your perfect
          style here.
        </p>
      </header>

      {/* Category navigation */}
      <div className="flex flex-wrap gap-3 justify-center mb-10">
        {categories.map((category) => (
          <a
            key={category.id}
            href={`/shop/${category.id}`}
            className="bg-white px-4 py-2 rounded-full text-sm border border-gray-200 hover:border-primary-500 hover:text-primary-600 transition-colors"
          >
            {category.title} ({category.count})
          </a>
        ))}
      </div>

      {/* Sort options */}
      <div className="flex justify-end mb-6">
        <div className="relative">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            className="appearance-none bg-white border border-gray-200 rounded-lg py-2 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="featured">Featured</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="newest">Newest</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M19 9l-7 7-7-7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
        </div>
      </div>

      {/* Product grid */}
      <ProductGrid
        products={sortedProducts}
        infiniteScroll={true}
        initialLimit={12}
      />
    </div>
  );
}
