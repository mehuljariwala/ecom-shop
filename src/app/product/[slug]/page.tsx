"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { useDispatch } from "react-redux";
import { getProductBySlug, getRelatedProducts } from "../../../data/products";
import {
  getProductReviews,
  getProductAverageRating,
} from "../../../data/reviews";
import { addToCart } from "../../../store/slices/cartSlice";
import { showToast } from "../../../store/slices/uiSlice";
import ProductGrid from "../../../components/product/ProductGrid";
import ReviewSection from "../../../components/product/ReviewSection";

// Common size options
const sizes = ["XS", "S", "M", "L", "XL"];

export default function ProductPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const relatedProducts = getRelatedProducts(slug);
  const productReviews = getProductReviews(product?.id || "");
  const averageRating = getProductAverageRating(product?.id || "");

  const dispatch = useDispatch();
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || ""
  );
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // If product doesn't exist
  if (!product) {
    return (
      <div className="container-custom mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Product Not Found</h1>
        <p className="text-gray-600 mb-8">
          Sorry, the product you are looking for does not exist or has been
          removed.
        </p>
        <Link
          href="/shop"
          className="inline-block px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.id,
        name: product.name,
        price: product.price,
        salePrice: product.salePrice,
        image: product.image,
        variantColor: selectedColor || "default",
        variantSize: selectedSize,
        quantity,
      })
    );

    dispatch(
      showToast({
        message: `${product.name} added to your cart`,
        type: "success",
      })
    );
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);

    dispatch(
      showToast({
        message: isWishlisted
          ? `${product.name} removed from your wishlist`
          : `${product.name} added to your wishlist`,
        type: "success",
      })
    );
  };

  const handleQuantityChange = (amount: number) => {
    const newQuantity = Math.max(1, quantity + amount);
    setQuantity(newQuantity);
  };

  return (
    <div className="container-custom mx-auto py-12">
      {/* Breadcrumbs */}
      <div className="mb-8 text-sm text-gray-600">
        <Link href="/" className="hover:text-primary-600 transition-colors">
          Home
        </Link>{" "}
        /{" "}
        <Link href="/shop" className="hover:text-primary-600 transition-colors">
          Shop
        </Link>{" "}
        / <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Product Detail */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        {/* Product Image */}
        <div className="aspect-square relative rounded-xl overflow-hidden bg-gray-100">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority
          />
          {/* Sale Badge */}
          {product.isSale && product.salePrice && (
            <span className="absolute top-4 left-4 bg-primary-600 text-white text-sm px-3 py-1 rounded">
              {Math.round(
                ((product.price - product.salePrice) / product.price) * 100
              )}
              % Off
            </span>
          )}
          {/* New Badge */}
          {product.isNew && (
            <span className="absolute top-4 right-4 bg-secondary-600 text-white text-sm px-3 py-1 rounded">
              New
            </span>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {product.name}
          </h1>

          {/* Price */}
          <div className="mb-6">
            {product.salePrice ? (
              <div className="flex items-center">
                <span className="text-2xl font-bold text-primary-600 mr-3">
                  ${product.salePrice.toFixed(2)}
                </span>
                <span className="text-lg text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-2xl font-bold text-gray-900">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          {/* Color Selection */}
          {product.colors && product.colors.length > 0 && (
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3">Color</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "ring-2 ring-primary-500 ring-offset-1"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color }}
                    onClick={() => setSelectedColor(color)}
                    aria-label={`Select ${color} color`}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Size Selection */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-medium text-gray-900">Size</h3>
              <button className="text-sm text-primary-600 underline">
                Size Guide
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  className={`w-12 h-10 flex items-center justify-center border rounded-md text-sm ${
                    selectedSize === size
                      ? "bg-gray-900 text-white border-gray-900"
                      : "border-gray-300 text-gray-900 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Quantity</h3>
            <div className="flex h-10 w-32">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="w-10 flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-50"
              >
                -
              </button>
              <div className="flex-1 flex items-center justify-center border-t border-b border-gray-300">
                {quantity}
              </div>
              <button
                onClick={() => handleQuantityChange(1)}
                className="w-10 flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <button
              onClick={handleAddToCart}
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-full flex items-center justify-center"
            >
              <ShoppingBagIcon className="h-5 w-5 mr-2" />
              Add to Cart
            </button>
            <button
              onClick={toggleWishlist}
              className="flex-grow-0 border border-gray-300 hover:border-gray-400 py-3 px-6 rounded-full flex items-center justify-center"
            >
              {isWishlisted ? (
                <HeartIconSolid className="h-5 w-5 text-primary-600" />
              ) : (
                <HeartIcon className="h-5 w-5" />
              )}
            </button>
          </div>

          {/* Product Description */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-sm font-medium text-gray-900 mb-4">
              Description
            </h3>
            <div className="prose prose-sm text-gray-600">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
                euismod, nisi vel consectetur euismod, nisi nisl consectetur
                nisi, euismod consectetur nisi nisl consectetur. Nullam euismod,
                nisi vel consectetur euismod, nisi nisl consectetur nisi,
                euismod consectetur nisi nisl consectetur.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-gray-200 pt-16">
          <ProductGrid
            products={relatedProducts}
            title="You May Also Like"
            showViewAll={false}
          />
        </div>
      )}

      {/* Customer Reviews */}
      <ReviewSection
        productId={product.id}
        reviews={productReviews}
        averageRating={averageRating}
      />
    </div>
  );
}
