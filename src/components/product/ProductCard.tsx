"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { addToCart } from "../../store/slices/cartSlice";
import { showToast } from "../../store/slices/uiSlice";

export interface ProductCardProps {
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

const ProductCard = ({
  id,
  name,
  slug,
  price,
  salePrice,
  image,
  colors = [],
  isNew = false,
  isSale = false,
}: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0] || "");
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: id,
        name,
        price,
        salePrice,
        image,
        variantColor: selectedColor || "default",
        variantSize: "M", // Default size
        quantity: 1,
      })
    );

    dispatch(
      showToast({
        message: `${name} added to your cart`,
        type: "success",
      })
    );
  };

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);

    dispatch(
      showToast({
        message: isWishlisted
          ? `${name} removed from your wishlist`
          : `${name} added to your wishlist`,
        type: "success",
      })
    );
  };

  const discountPercentage =
    salePrice && price > salePrice
      ? Math.round(((price - salePrice) / price) * 100)
      : 0;

  return (
    <div className="group relative">
      {/* Product image */}
      <div className="relative aspect-[3/4] rounded-lg overflow-hidden bg-gray-100 mb-3">
        <Link href={`/product/${slug}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        </Link>

        {/* Product badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <span className="bg-secondary-600 text-white text-xs px-2 py-1 rounded">
              New
            </span>
          )}
          {isSale && salePrice && (
            <span className="bg-primary-600 text-white text-xs px-2 py-1 rounded">
              {discountPercentage}% Off
            </span>
          )}
        </div>

        {/* Quick actions */}
        <div className="absolute top-2 right-2 flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={toggleWishlist}
            className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary-600 transition-colors"
            aria-label={
              isWishlisted ? "Remove from wishlist" : "Add to wishlist"
            }
          >
            {isWishlisted ? (
              <HeartIconSolid className="h-5 w-5 text-primary-600" />
            ) : (
              <HeartIcon className="h-5 w-5" />
            )}
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-white p-2 rounded-full shadow-md text-gray-700 hover:text-primary-600 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingBagIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Product info */}
      <div>
        <h3 className="text-sm font-medium text-gray-800 mb-1">
          <Link
            href={`/product/${slug}`}
            className="hover:text-primary-600 transition-colors"
          >
            {name}
          </Link>
        </h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            {salePrice ? (
              <>
                <span className="text-primary-600 font-medium mr-2">
                  ${salePrice.toFixed(2)}
                </span>
                <span className="text-gray-500 text-sm line-through">
                  ${price.toFixed(2)}
                </span>
              </>
            ) : (
              <span className="text-gray-700 font-medium">
                ${price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color options */}
          {colors.length > 0 && (
            <div className="flex space-x-1">
              {colors.map((color) => (
                <button
                  key={color}
                  className={`w-4 h-4 rounded-full border ${
                    selectedColor === color
                      ? "ring-2 ring-offset-1 ring-gray-400"
                      : ""
                  }`}
                  style={{ backgroundColor: color }}
                  onClick={() => setSelectedColor(color)}
                  aria-label={`Select ${color} color`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
