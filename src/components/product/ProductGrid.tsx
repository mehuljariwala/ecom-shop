"use client";

import { useState } from "react";
import ProductCard from "./ProductCard";
import { Button } from "../ui/Button";

export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  salePrice?: number;
  image: string;
  colors?: string[];
  isNew?: boolean;
  isSale?: boolean;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  showViewAll?: boolean;
  viewAllLink?: string;
  isLoading?: boolean;
  columns?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  infiniteScroll?: boolean;
  initialLimit?: number;
}

const ProductGrid = ({
  products = [],
  title,
  showViewAll = false,
  viewAllLink = "/shop",
  isLoading = false,
  columns = { sm: 2, md: 3, lg: 4 },
  infiniteScroll = false,
  initialLimit = 8,
}: ProductGridProps) => {
  const [displayLimit, setDisplayLimit] = useState(initialLimit);

  // Generate classes for grid columns based on props
  const getGridClasses = () => {
    const { sm = 2, md = 3, lg = 4, xl } = columns;
    return `grid grid-cols-${sm} md:grid-cols-${md} lg:grid-cols-${lg} ${
      xl ? `xl:grid-cols-${xl}` : ""
    } gap-4 md:gap-6`;
  };

  const loadMore = () => {
    setDisplayLimit((prev) => prev + initialLimit);
  };

  const displayedProducts = products.slice(0, displayLimit);
  const hasMore = displayLimit < products.length;

  if (isLoading) {
    return (
      <div className="py-8">
        <div className={getGridClasses()}>
          {Array.from({ length: initialLimit }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 aspect-[3/4] rounded-lg mb-3"></div>
              <div className="bg-gray-200 h-4 w-3/4 mb-2 rounded"></div>
              <div className="bg-gray-200 h-4 w-1/4 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-xl font-medium text-gray-700 mb-2">
          No products found
        </h3>
        <p className="text-gray-500 mb-6">
          Try adjusting your filters or search criteria.
        </p>
        <Button
          variant="outline"
          rounded="full"
          onClick={() => window.history.back()}
        >
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="py-4">
      {title && (
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-heading font-medium">{title}</h2>
          {showViewAll && (
            <a
              href={viewAllLink}
              className="text-primary-600 hover:underline flex items-center"
            >
              View All
              <svg
                className="w-4 h-4 ml-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </a>
          )}
        </div>
      )}

      <div className={getGridClasses()}>
        {displayedProducts.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>

      {infiniteScroll && hasMore && (
        <div className="mt-10 text-center">
          <Button
            variant="outline"
            size="lg"
            rounded="full"
            onClick={loadMore}
            className="mx-auto"
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
};

export default ProductGrid;
