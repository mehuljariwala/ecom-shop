import { ShoppingBagIcon } from "@heroicons/react/24/outline";
import { Button } from "../ui/button";
import Link from "next/link";

interface EmptyCartProps {
  onClose: () => void;
}

const EmptyCart = ({ onClose }: EmptyCartProps) => {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-12">
      <div className="rounded-full bg-gray-100 p-6 mb-6">
        <ShoppingBagIcon
          className="h-12 w-12 text-gray-400"
          aria-hidden="true"
        />
      </div>
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        Your cart is empty
      </h3>
      <p className="text-gray-500 text-center mb-8">
        Looks like you haven&apos;t added any items to your cart yet.
      </p>
      <div className="space-y-3 w-full max-w-xs">
        <Button variant="default" fullWidth onClick={onClose}>
          Continue Shopping
        </Button>
        <Link
          href="/shop/new-arrivals"
          onClick={onClose}
          className="block w-full"
        >
          <Button variant="outline" fullWidth>
            Browse New Arrivals
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default EmptyCart;
