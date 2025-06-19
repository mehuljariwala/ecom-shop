import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

// Social Media Icons
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaPinterest,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 pt-16 pb-8">
      <div className="container-custom mx-auto">
        {/* Newsletter Section */}
        <div className="mb-12 text-center md:max-w-xl md:mx-auto">
          <h3 className="font-heading text-2xl mb-3">Join Our Newsletter</h3>
          <p className="text-gray-600 mb-6">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <form className="flex flex-col sm:flex-row gap-2">
            <Input
              type="email"
              placeholder="Your email address"
              className="flex-grow"
              aria-label="Email for newsletter"
              required
            />
            <Button
              type="submit"
              variant="default"
              className="whitespace-nowrap"
            >
              Subscribe
            </Button>
          </form>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Shop Column */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/shop/new-arrivals"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/bestsellers"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/dresses"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Dresses
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/tops"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Tops
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/accessories"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Accessories
                </Link>
              </li>
              <li>
                <Link
                  href="/shop/sale"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Sale
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Customer Service
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Shipping & Delivery
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Size Guide
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/sustainability"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Sustainability
                </Link>
              </li>
              <li>
                <Link
                  href="/sell"
                  className="text-gray-600 hover:text-primary-600 transition-colors"
                >
                  Sell With Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">
              Connect With Us
            </h4>
            <div className="flex gap-4 mb-6">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebook className="text-gray-600 hover:text-primary-600 text-xl transition-colors" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaTwitter className="text-gray-600 hover:text-primary-600 text-xl transition-colors" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram className="text-gray-600 hover:text-primary-600 text-xl transition-colors" />
              </a>
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <FaPinterest className="text-gray-600 hover:text-primary-600 text-xl transition-colors" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube className="text-gray-600 hover:text-primary-600 text-xl transition-colors" />
              </a>
            </div>
            <p className="text-gray-600 text-sm">
              Customer Service Hours:
              <br />
              Monday-Friday: 9am-6pm EST
              <br />
              Saturday: 10am-4pm EST
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <p className="text-sm text-gray-500">
                &copy; {currentYear} Elegance. All rights reserved.
              </p>
            </div>
            <div className="flex gap-4 text-sm">
              <Link
                href="/privacy-policy"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms-of-service"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-500 hover:text-primary-600 transition-colors"
              >
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
