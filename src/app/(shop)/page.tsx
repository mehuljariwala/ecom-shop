"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "../../components/ui/button";
import { useEffect, useState } from "react";

export default function Home() {
  // Define carousel images with text
  const carouselItems = [
    {
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      title: "Summer Collection 2025",
      description:
        "Discover the latest trends in women's fashion. Elegant designs for every occasion.",
      color: "from-pink-400/60 to-purple-500/60",
    },
    {
      image: "https://images.unsplash.com/photo-1566206091558-7f218b696731",
      title: "Elegance in Every Detail",
      description:
        "Curated collections that celebrate your unique style and personality.",
      color: "from-rose-400/60 to-pink-500/60",
    },
    {
      image: "https://images.unsplash.com/photo-1581044777550-4cfa60707c03",
      title: "Exclusive Fashion",
      description: "Premium quality pieces designed for the modern woman.",
      color: "from-purple-400/60 to-indigo-500/60",
    },
  ];

  // State for the carousel
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [carouselItems.length]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const goToPrevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselItems.length) % carouselItems.length
    );
  };

  const goToNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselItems.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Section */}
      <section className="relative overflow-hidden">
        <div className="relative h-[80vh]">
          {carouselItems.map((item, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
              }`}
            >
              <div className="relative h-full w-full">
                <Image
                  src={item.image}
                  alt={`Fashion model - ${item.title}`}
                  fill
                  className="object-cover"
                  priority
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-r ${item.color}`}
                />

                <div className="absolute inset-0 flex items-center">
                  <div className="container-custom mx-auto">
                    <div className="max-w-xl text-white p-4">
                      <h1 className="font-heading text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                        {item.title}
                      </h1>
                      <p className="text-lg mb-8 drop-shadow-md">
                        {item.description}
                      </p>
                      <div className="flex flex-wrap gap-4">
                        <Button
                          size="lg"
                          className="bg-white text-pink-600 hover:bg-white/90 rounded-full"
                        >
                          <Link href="/shop/new-arrivals">
                            Shop New Arrivals
                          </Link>
                        </Button>
                        <Button
                          size="lg"
                          variant="outline"
                          className="border-white text-white hover:bg-white hover:text-pink-600 rounded-full"
                        >
                          <Link href="/shop">Explore All</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Carousel navigation buttons */}
          <button
            onClick={goToPrevSlide}
            className="absolute left-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>

          <button
            onClick={goToNextSlide}
            className="absolute right-4 top-1/2 z-20 -translate-y-1/2 h-10 w-10 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-md"
          >
            <svg
              className="w-6 h-6"
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
          </button>

          {/* Carousel indicators */}
          <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
            {carouselItems.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? "bg-white scale-110"
                    : "bg-white/50 hover:bg-white/70"
                }`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-20 feminine-gradient">
        <div className="container-custom mx-auto">
          <h2 className="section-title">Shop by Category</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dresses",
                image:
                  "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=783&q=80",
                href: "/shop/dresses",
                color: "from-pink-400/60 to-pink-600/60",
              },
              {
                name: "Tops",
                image:
                  "https://images.unsplash.com/photo-1549062573-edc78a53ffa6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                href: "/shop/tops",
                color: "from-purple-400/60 to-purple-600/60",
              },
              {
                name: "Accessories",
                image:
                  "https://images.unsplash.com/photo-1589782182703-2aaa69037b5b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
                href: "/shop/accessories",
                color: "from-rose-400/60 to-rose-600/60",
              },
            ].map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group relative rounded-2xl overflow-hidden shadow-lg h-96 block feminine-card"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-70 group-hover:opacity-60 transition-opacity duration-300`}
                ></div>
                <div className="absolute inset-0 flex items-end">
                  <div className="p-7 w-full">
                    <h3 className="text-2xl font-medium text-white mb-3 drop-shadow-md">
                      {category.name}
                    </h3>
                    <span className="inline-flex items-center text-white text-sm font-medium bg-white/30 backdrop-blur-sm px-4 py-2 rounded-full">
                      Shop Now
                      <svg
                        className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform"
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
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop">
              <Button
                variant="outline"
                className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50 hover:text-pink-700 px-8"
                size="lg"
              >
                View All Categories
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Sellers Section */}
      <section className="py-20">
        <div className="container-custom mx-auto">
          <h2 className="section-title">Our Top Sellers</h2>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              {
                id: "1",
                name: "Floral Summer Dress",
                price: 79.99,
                image:
                  "https://images.unsplash.com/photo-1623609163859-ca93c646ccd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              },
              {
                id: "2",
                name: "Casual Linen Blouse",
                price: 49.99,
                image:
                  "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              },
              {
                id: "3",
                name: "Bohemian Maxi Dress",
                price: 89.99,
                image:
                  "https://images.unsplash.com/photo-1618375531912-867984bdfd87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              },
              {
                id: "4",
                name: "Statement Earrings",
                price: 29.99,
                image:
                  "https://images.unsplash.com/photo-1615655067369-1a8e71e50194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
              },
            ].map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="relative rounded-xl overflow-hidden aspect-[3/4] mb-4 feminine-card shadow-md group-hover:shadow-lg transition-shadow duration-300">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent h-20"></div>
                </div>
                <h3 className="text-gray-800 font-medium mb-1 group-hover:text-pink-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-pink-600 font-semibold">
                  ${product.price.toFixed(2)}
                </p>
              </Link>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link href="/shop/bestsellers">
              <Button
                variant="outline"
                className="rounded-full border-pink-400 text-pink-600 hover:bg-pink-50 hover:text-pink-700 px-8"
                size="lg"
              >
                View All Bestsellers
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="py-20 feminine-gradient">
        <div className="container-custom mx-auto">
          <h2 className="section-title">New Arrivals</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg feminine-card">
              <Image
                src="https://images.unsplash.com/photo-1581044777550-4cfa60707c03?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt="Summer Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pink-500/70 to-pink-500/20 flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-white mb-3 drop-shadow-md">
                    Summer Collection
                  </h3>
                  <p className="text-white mb-5 drop-shadow-sm">
                    Bright colors and flowing fabrics for the perfect summer
                    look
                  </p>
                  <Link href="/shop/summer-collection">
                    <Button
                      variant="outline"
                      className="rounded-full border-white text-white hover:bg-white hover:text-pink-600"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="relative h-96 rounded-2xl overflow-hidden shadow-lg feminine-card">
              <Image
                src="https://images.unsplash.com/photo-1566206091558-7f218b696731?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                alt="Accessories Collection"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-500/70 to-purple-500/20 flex items-end">
                <div className="p-8">
                  <h3 className="text-2xl font-medium text-white mb-3 drop-shadow-md">
                    Accessories Collection
                  </h3>
                  <p className="text-white mb-5 drop-shadow-sm">
                    Complete your look with our stunning accessories
                  </p>
                  <Link href="/shop/accessories">
                    <Button
                      variant="outline"
                      className="rounded-full border-white text-white hover:bg-white hover:text-purple-600"
                    >
                      Explore Collection
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-pink-600 text-white">
        <div className="container-custom mx-auto text-center">
          <h2 className="font-heading text-3xl md:text-4xl mb-6 drop-shadow-sm">
            Join Our Newsletter
          </h2>
          <p className="max-w-2xl mx-auto mb-10 text-lg">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
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
          <div className="mt-8 text-sm text-white/80">
            By subscribing, you agree to receive marketing emails from us.
          </div>
        </div>
      </section>
    </div>
  );
}
