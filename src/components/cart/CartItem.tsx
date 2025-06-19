"use client";

import { MinusIcon, PlusIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import { CartItem as CartItemType } from "../../store/slices/cartSlice";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const {
    productId,
    name,
    price,
    salePrice,
    image,
    variantColor,
    variantSize,
    quantity,
  } = item;

  const displayPrice = salePrice || price;
  const totalPrice = displayPrice * quantity;

  return (
    <div className="flex py-6 border-b border-gray-200">
      {/* Product image */}
      <div className="relative h-24 w-24 flex-shrink-0 rounded-md overflow-hidden">
        <Link href={`/product/${productId}`}>
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover object-center"
          />
        </Link>
      </div>

      {/* Product details */}
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`/product/${productId}`}>{name}</Link>
            </h3>
            <p className="ml-4">${totalPrice.toFixed(2)}</p>
          </div>
          <div className="mt-1 flex text-sm">
            {variantColor && (
              <p className="text-gray-500">
                Color: <span className="capitalize">{variantColor}</span>
              </p>
            )}
            {variantSize && (
              <p className="text-gray-500 pl-4 ml-4 border-l border-gray-200">
                Size: {variantSize}
              </p>
            )}
          </div>
          {salePrice && price > salePrice && (
            <p className="mt-1 text-sm text-gray-500">
              <span className="line-through">${price.toFixed(2)}</span>
              <span className="text-primary-600 ml-1.5">
                Save ${(price - salePrice).toFixed(2)}
              </span>
            </p>
          )}
        </div>

        {/* Quantity controls and remove button */}
        <div className="flex flex-1 items-end justify-between text-sm">
          <div className="flex items-center border border-gray-300 rounded-md">
            <button
              type="button"
              className="p-1.5 text-gray-600 hover:text-gray-900"
              onClick={() => onUpdateQuantity(quantity - 1)}
              disabled={quantity <= 1}
            >
              <MinusIcon className="h-3.5 w-3.5" />
              <span className="sr-only">Decrease quantity</span>
            </button>
            <span className="text-gray-900 px-3">{quantity}</span>
            <button
              type="button"
              className="p-1.5 text-gray-600 hover:text-gray-900"
              onClick={() => onUpdateQuantity(quantity + 1)}
            >
              <PlusIcon className="h-3.5 w-3.5" />
              <span className="sr-only">Increase quantity</span>
            </button>
          </div>

          <button
            type="button"
            className="font-medium text-primary-600 hover:text-primary-700"
            onClick={onRemove}
          >
            <XMarkIcon className="h-5 w-5" />
            <span className="sr-only">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
