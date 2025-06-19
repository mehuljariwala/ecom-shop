"use client";

import Image from "next/image";
import { CartState } from "../../store/types";

interface OrderSummaryProps {
  items: CartState["items"];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const OrderSummary = ({
  items,
  subtotal,
  shipping,
  tax,
  total,
}: OrderSummaryProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-4 py-6 sm:px-6">
        <h2 className="text-lg font-medium text-gray-900">Order Summary</h2>

        <div className="mt-6 border-t border-gray-200">
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {items.map((item) => (
                <li
                  key={`${item.productId}-${item.variantColor}-${item.variantSize}`}
                  className="py-4 flex"
                >
                  <div className="flex-shrink-0 w-16 h-16 border border-gray-200 rounded-md overflow-hidden relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="ml-4 flex-1 flex flex-col">
                    <div>
                      <div className="flex justify-between text-sm font-medium text-gray-900">
                        <h3>{item.name}</h3>
                        <p className="ml-4">
                          $
                          {item.salePrice
                            ? (item.salePrice * item.quantity).toFixed(2)
                            : (item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">
                        {item.variantColor !== "default" && (
                          <span
                            className="inline-block w-3 h-3 rounded-full mr-1"
                            style={{ backgroundColor: item.variantColor }}
                          ></span>
                        )}
                        {item.variantSize}
                      </p>
                    </div>
                    <div className="flex-1 flex items-end justify-between text-sm">
                      <p className="text-gray-500">Qty {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 space-y-4">
          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Subtotal</p>
            <p className="font-medium text-gray-900">${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Shipping</p>
            <p className="font-medium text-gray-900">
              {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
            </p>
          </div>

          <div className="flex justify-between text-sm">
            <p className="text-gray-600">Tax</p>
            <p className="font-medium text-gray-900">${tax.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-base font-medium">
            <p className="text-gray-900">Total</p>
            <p className="text-primary-600">${total.toFixed(2)}</p>
          </div>
        </div>

        <div className="mt-6">
          <div className="rounded-md bg-gray-50 p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-700">
                  {shipping === 0
                    ? "Your order qualifies for free shipping"
                    : `Spend $${(75 - subtotal).toFixed(2)} more to qualify for free shipping`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
