"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { Button } from "./ui/button";
import {
  ShoppingBagIcon,
  UserIcon,
  MagnifyingGlassIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { HeartIcon } from "@heroicons/react/24/solid";
import { selectCartItemsCount, setCartOpen } from "../store/slices/cartSlice";
import { selectIsAuthenticated } from "../store/slices/authSlice";
import { toggleMobileMenu, toggleSearchOverlay } from "../store/slices/uiSlice";

const categories = [
  { name: "New Arrivals", href: "/shop/new-arrivals" },
  { name: "Dresses", href: "/shop/dresses" },
  { name: "Tops", href: "/shop/tops" },
  { name: "Bottoms", href: "/shop/bottoms" },
  { name: "Accessories", href: "/shop/accessories" },
  { name: "Sale", href: "/shop/sale" },
];

const Header = () => {
  const dispatch = useDispatch();
  const cartCount = useSelector(selectCartItemsCount);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [isScrolled, setIsScrolled] = useState(false);

  // Change header style on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled ? "bg-white shadow-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      {/* Announcement bar */}
      <div className="bg-primary-600 text-white px-4 py-2 text-center text-xs md:text-sm">
        Free shipping on orders over $75 | Use code WELCOME10 for 10% off your
        first order
      </div>

      <div className="container-custom mx-auto">
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu button */}
          <button
            className="lg:hidden p-2"
            onClick={() => dispatch(toggleMobileMenu(true))}
          >
            <Bars3Icon className="h-6 w-6" />
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="font-heading text-2xl font-bold text-primary-600">
              Elegance
            </span>
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.href}
                className="text-sm font-medium text-gray-700 hover:text-primary-600 transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <button
              className="p-2 text-gray-700 hover:text-primary-600"
              onClick={() => dispatch(toggleSearchOverlay(true))}
            >
              <MagnifyingGlassIcon className="h-5 w-5" />
            </button>

            <Link
              href="/wishlist"
              className="p-2 text-gray-700 hover:text-primary-600"
            >
              <HeartIcon className="h-5 w-5" />
            </Link>

            <button
              className="p-2 text-gray-700 hover:text-primary-600 relative"
              onClick={() => dispatch(setCartOpen(true))}
            >
              <ShoppingBagIcon className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </button>

            {isAuthenticated ? (
              <Link
                href="/account"
                className="p-2 text-gray-700 hover:text-primary-600"
              >
                <UserIcon className="h-5 w-5" />
              </Link>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  /* Will be implemented */
                }}
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
