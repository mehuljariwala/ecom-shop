"use client";

import Link from "next/link";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { Button } from "../ui/button";
import { formatDate } from "../../utils/formatters";

interface OrderData {
  customer: {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };
  shipping: {
    address1: string;
    address2?: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
}

interface OrderConfirmationProps {
  orderNumber: string;
  orderData: OrderData;
  orderTotal: number;
}

const OrderConfirmation = ({
  orderNumber,
  orderData,
  orderTotal,
}: OrderConfirmationProps) => {
  const estimatedDelivery = formatDate(
    new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-3xl mx-auto">
      <div className="text-center mb-10">
        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
          <CheckCircleIcon
            className="h-10 w-10 text-green-600"
            aria-hidden="true"
          />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Thank You for Your Order!
        </h1>
        <p className="text-lg text-gray-600">
          Your order has been received and is being processed.
        </p>
      </div>

      <div className="border-t border-gray-200 pt-6 mb-8">
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-4">Order Information</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-gray-600">Order Number:</p>
              <p className="font-medium">{orderNumber}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Date:</p>
              <p className="font-medium">{formatDate(new Date())}</p>
            </div>
            <div>
              <p className="text-gray-600">Order Total:</p>
              <p className="font-medium">${orderTotal.toFixed(2)}</p>
            </div>
            <div>
              <p className="text-gray-600">Estimated Delivery:</p>
              <p className="font-medium">{estimatedDelivery}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="font-medium mb-3">Shipping Information</h3>
            <div className="text-sm text-gray-700">
              <p className="mb-1">
                {orderData.customer.firstName} {orderData.customer.lastName}
              </p>
              <p className="mb-1">{orderData.shipping.address1}</p>
              {orderData.shipping.address2 && (
                <p className="mb-1">{orderData.shipping.address2}</p>
              )}
              <p className="mb-1">
                {orderData.shipping.city}, {orderData.shipping.state}{" "}
                {orderData.shipping.zipCode}
              </p>
              <p className="mb-1">{orderData.shipping.country}</p>
              <p className="mb-1">{orderData.customer.phone}</p>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">Contact Information</h3>
            <div className="text-sm text-gray-700">
              <p className="mb-1">
                {orderData.customer.firstName} {orderData.customer.lastName}
              </p>
              <p className="mb-1">{orderData.customer.email}</p>
              <p>{orderData.customer.phone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6 mb-8">
          <h3 className="font-medium mb-3">Delivery Updates</h3>
          <p className="text-sm text-gray-600 mb-2">
            We&apos;ll send you shipping and delivery updates to:
          </p>
          <p className="text-sm font-medium">{orderData.customer.email}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-8">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                A confirmation email has been sent to{" "}
                <span className="font-medium">{orderData.customer.email}</span>.
                If you don&apos;t see it in your inbox, please check your spam
                folder.
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <Link href="/" className="w-full sm:w-auto">
            <Button variant="outline" className="w-full">
              Continue Shopping
            </Button>
          </Link>

          <Link href={`/orders/${orderNumber}`} className="w-full sm:w-auto">
            <Button className="w-full">View Order Details</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
