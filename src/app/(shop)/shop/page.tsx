"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { products } from "../../../data/products";
import ProductGrid from "../../../components/product/ProductGrid";
import { Button } from "../../../components/ui/button";
import { HeartIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";

// Category definitions with enhanced visuals
const categories = [
  {
    id: "new-arrivals",
    title: "New Arrivals",
    description: "The latest additions to our collection",
    count: products.filter((p) => p.categories?.includes("new-arrivals"))
      .length,
    image:
      "https://images.unsplash.com/photo-1612336307429-8a898d10e223?ixlib=rb-4.0.3",
    color: "from-rose-400/70 to-rose-600/70",
  },
  {
    id: "dresses",
    title: "Dresses",
    description: "Elegant dresses for every occasion",
    count: products.filter((p) => p.categories?.includes("dresses")).length,
    image:
      "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3",
    color: "from-pink-400/70 to-pink-600/70",
  },
  {
    id: "tops",
    title: "Tops",
    description: "Stylish tops to complete your look",
    count: products.filter((p) => p.categories?.includes("tops")).length,
    image:
      "https://images.unsplash.com/photo-1552902019-ebcd97aa9aa0?ixlib=rb-4.0.3",
    color: "from-purple-400/70 to-purple-600/70",
  },
  {
    id: "bottoms",
    title: "Bottoms",
    description: "Comfortable and fashionable bottoms",
    count: products.filter((p) => p.categories?.includes("bottoms")).length,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3",
    color: "from-blue-400/70 to-blue-600/70",
  },
  {
    id: "accessories",
    title: "Accessories",
    description: "Complete your outfit with our accessories",
    count: products.filter((p) => p.categories?.includes("accessories")).length,
    image:
      "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-4.0.3",
    color: "from-amber-400/70 to-amber-600/70",
  },
  {
    id: "sale",
    title: "Sale",
    description: "Great styles at reduced prices",
    count: products.filter((p) => p.categories?.includes("sale")).length,
    image:
      "https://images.unsplash.com/photo-1607083206968-13611e3d76db?ixlib=rb-4.0.3",
    color: "from-red-400/70 to-red-600/70",
  },
];

// Featured promotions
const promotions = [
  {
    title: "Summer Collection",
    description: "30% off selected summer styles",
    code: "SUMMER30",
    image:
      "https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3",
    bgColor: "bg-pink-50",
    textColor: "text-pink-600",
    buttonColor: "bg-pink-600 hover:bg-pink-700",
  },
  {
    title: "Free Shipping",
    description: "On all orders over $75",
    code: "FREESHIP",
    image:
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3",
    bgColor: "bg-purple-50",
    textColor: "text-purple-600",
    buttonColor: "bg-purple-600 hover:bg-purple-700",
  },
];

// Testimonials
const testimonials = [
  {
    name: "Sarah J.",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    text: "The quality of the clothes is outstanding. I've received so many compliments on my new dress!",
    rating: 5,
  },
  {
    name: "Emma T.",
    avatar: "https://randomuser.me/api/portraits/women/32.jpg",
    text: "Fast shipping and the fit is perfect. Will definitely be shopping here again.",
    rating: 5,
  },
  {
    name: "Rebecca M.",
    avatar: "https://randomuser.me/api/portraits/women/67.jpg",
    text: "Customer service was exceptional when I needed to exchange sizes. Such a pleasant experience!",
    rating: 4,
  },
];

export default function ShopPage() {
  const [sortOption, setSortOption] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [activePromotion, setActivePromotion] = useState(0);

  // Auto-rotate promotions
  useEffect(() => {
    const interval = setInterval(() => {
      setActivePromotion((prev) => (prev + 1) % promotions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Filter products based on selected category
  const filteredProducts =
    selectedCategory === "all"
      ? products
      : products.filter((p) => p.categories?.includes(selectedCategory));

  // Sort products based on selected option
  const sortedProducts = [...filteredProducts].sort((a, b) => {
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

  // Get trending products (use the first 4 products for demo purposes)
  // In a real app, this would be based on popularity metrics
  const trendingProducts = [...products].slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Banner */}
      <section className="relative h-[50vh] lg:h-[60vh] overflow-hidden">
        <div className="relative h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?ixlib=rb-4.0.3"
            alt="Fashion collection hero"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/60 to-purple-500/60"></div>

          <div className="absolute inset-0 flex items-center">
            <div className="container-custom mx-auto">
              <div className="max-w-xl text-white p-4">
                <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                  Discover Your Style
                </h1>
                <p className="text-lg mb-8 drop-shadow-md">
                  Explore our carefully curated collection of premium fashion
                  pieces designed for the modern woman.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button
                    size="lg"
                    className="bg-white text-pink-600 hover:bg-white/90 rounded-full"
                  >
                    <Link href="/shop/new-arrivals">Shop New Arrivals</Link>
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-pink-600 rounded-full"
                  >
                    <Link href="/shop/sale">View Sale Items</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Current Promotions */}
      <section className="py-10">
        <div className="container-custom mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-lg">
            {promotions.map((promo, index) => (
              <div
                key={index}
                className={`transition-opacity duration-500 ${index === activePromotion ? "opacity-100" : "opacity-0 hidden"}`}
              >
                <div
                  className={`flex flex-col md:flex-row items-center ${promo.bgColor} p-6 md:p-0`}
                >
                  <div className="w-full md:w-1/2 p-6 md:p-12">
                    <h2
                      className={`text-3xl font-bold ${promo.textColor} mb-3`}
                    >
                      {promo.title}
                    </h2>
                    <p className="text-gray-700 mb-4 text-lg">
                      {promo.description}
                    </p>
                    {promo.code && (
                      <div className="mb-6">
                        <span className="inline-block bg-white px-4 py-2 rounded-md font-mono font-bold border border-gray-200">
                          {promo.code}
                        </span>
                      </div>
                    )}
                    <Button
                      className={`${promo.buttonColor} text-white rounded-full`}
                    >
                      Shop Now
                    </Button>
                  </div>
                  <div className="w-full md:w-1/2 h-48 md:h-80 relative">
                    <Image
                      src={promo.image}
                      alt={promo.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {promotions.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActivePromotion(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activePromotion
                      ? "bg-white scale-110 shadow-md"
                      : "bg-white/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Shop Categories with Visual Cards */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-12">
            Shop by Category
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop/${category.id}`}
                className="group relative rounded-xl overflow-hidden shadow-md h-60 block"
                onClick={(e) => {
                  e.preventDefault();
                  setSelectedCategory(category.id);
                  // Scroll to product grid
                  document.getElementById("product-grid")?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
              >
                <Image
                  src={category.image}
                  alt={category.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`}
                ></div>
                <div className="absolute inset-0 flex flex-col justify-between p-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1 drop-shadow-md">
                      {category.title}
                    </h3>
                    <p className="text-white/90 text-sm drop-shadow-sm">
                      {category.description}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center text-white text-sm font-medium">
                      {category.count} Products
                    </span>
                    <span className="inline-flex items-center text-white text-sm font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      Shop Now
                      <svg
                        className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M9 5l7 7-7 7"
                        ></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Now Section */}
      <section className="py-14">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-heading font-bold mb-2 text-center">
            Trending Now
          </h2>
          <p className="text-gray-600 text-center mb-10">
            Our most popular products this week
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {trendingProducts.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-4 shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Quick action buttons */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <ShoppingBagIcon className="h-5 w-5 text-gray-700" />
                    </button>
                    <button className="bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors">
                      <HeartIcon className="h-5 w-5 text-gray-700" />
                    </button>
                  </div>

                  {/* Sale badge */}
                  {product.salePrice && (
                    <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      SALE
                    </div>
                  )}

                  {/* New badge */}
                  {product.isNew && !product.salePrice && (
                    <div className="absolute top-2 left-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                </div>

                <h3 className="text-gray-800 font-medium mb-1 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>

                <div className="flex items-center gap-2">
                  {product.salePrice ? (
                    <>
                      <p className="text-pink-600 font-semibold">
                        ${product.salePrice.toFixed(2)}
                      </p>
                      <p className="text-gray-500 line-through text-sm">
                        ${product.price.toFixed(2)}
                      </p>
                    </>
                  ) : (
                    <p className="text-gray-700 font-semibold">
                      ${product.price.toFixed(2)}
                    </p>
                  )}
                </div>

                {/* Star rating (static 5-star display) */}
                <div className="flex items-center mt-1">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-4 h-4 ${i < (product.isNew ? 5 : 4) ? "text-yellow-400" : "text-gray-300"}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button
              variant="outline"
              className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50 hover:text-pink-700 px-6"
            >
              View All Trending
            </Button>
          </div>
        </div>
      </section>

      {/* Main Product Collection */}
      <section className="py-14" id="product-grid">
        <div className="container-custom mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                {selectedCategory === "all"
                  ? "Our Collection"
                  : categories.find((c) => c.id === selectedCategory)?.title ||
                    "Our Collection"}
              </h2>
              <p className="text-gray-600">
                {selectedCategory === "all"
                  ? "Discover our carefully curated collection"
                  : categories.find((c) => c.id === selectedCategory)
                      ?.description || ""}
              </p>
            </div>

            {/* Category pills & sort options */}
            <div className="mt-6 md:mt-0 flex flex-wrap gap-3 items-center">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                  selectedCategory === "all"
                    ? "bg-pink-600 text-white border-pink-600"
                    : "bg-white border-gray-200 text-gray-700 hover:border-pink-200 hover:text-pink-600"
                }`}
              >
                All
              </button>

              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm border transition-colors ${
                    selectedCategory === category.id
                      ? "bg-pink-600 text-white border-pink-600"
                      : "bg-white border-gray-200 text-gray-700 hover:border-pink-200 hover:text-pink-600"
                  }`}
                >
                  {category.title}
                </button>
              ))}
            </div>
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

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No products found
              </h3>
              <p className="text-gray-500 mb-6">
                Try changing your filter criteria
              </p>
              <Button
                onClick={() => setSelectedCategory("all")}
                variant="outline"
                className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50 hover:text-pink-700"
              >
                View All Products
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-14 bg-gray-50">
        <div className="container-custom mx-auto">
          <h2 className="text-3xl font-heading font-bold text-center mb-2">
            Customer Love
          </h2>
          <p className="text-gray-600 text-center mb-10">
            What our customers say about us
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md">
                <div className="flex items-center mb-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-medium text-gray-800">
                      {testimonial.name}
                    </h4>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400" : "text-gray-300"}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 italic">
                  &ldquo;{testimonial.text}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter section */}
      <section className="py-14 bg-pink-600 text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="font-heading text-3xl mb-4">Join Our VIP List</h2>
          <p className="max-w-xl mx-auto mb-8">
            Subscribe to get special offers, free giveaways, and early access to
            new arrivals.
          </p>
          <form className="max-w-md mx-auto flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-grow px-5 py-3 rounded-full text-gray-900 focus:outline-none focus:ring-2 focus:ring-white shadow-md"
              required
            />
            <Button
              type="submit"
              size="lg"
              className="bg-white text-pink-600 hover:bg-white/90 whitespace-nowrap rounded-full shadow-md"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
