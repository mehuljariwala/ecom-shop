"use client";

import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useSelector, useDispatch } from "react-redux";
import Link from "next/link";
import {
  selectCartItems,
  selectCartTotal,
  selectIsCartOpen,
  setCartOpen,
  removeFromCart,
  updateQuantity,
} from "../../store/slices/cartSlice";
import { Button } from "../ui/Button";
import CartItem from "./CartItem";
import EmptyCart from "./EmptyCart";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isOpen = useSelector(selectIsCartOpen);

  const closeCart = () => {
    dispatch(setCartOpen(false));
  };

  const handleRemoveItem = (
    productId: string,
    variantColor: string,
    variantSize: string
  ) => {
    dispatch(removeFromCart({ productId, variantColor, variantSize }));
  };

  const handleUpdateQuantity = (
    productId: string,
    variantColor: string,
    variantSize: string,
    quantity: number
  ) => {
    if (quantity > 0) {
      dispatch(
        updateQuantity({
          productId,
          variantColor,
          variantSize,
          quantity,
        })
      );
    } else {
      handleRemoveItem(productId, variantColor, variantSize);
    }
  };

  // Calculate shipping (free over $75)
  const shipping = cartTotal >= 75 ? 0 : 5.99;
  // Calculate estimated tax (8.25%)
  const estimatedTax = cartTotal * 0.0825;
  // Calculate order total
  const orderTotal = cartTotal + shipping + estimatedTax;

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeCart}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-in-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in-out duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
        </Transition.Child>

        {/* Slide-in panel */}
        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-300"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-300"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-6 sm:px-6">
                      <Dialog.Title className="text-lg font-medium text-gray-900">
                        Shopping Cart{" "}
                        {cartItems.length > 0 && `(${cartItems.length})`}
                      </Dialog.Title>
                      <button
                        type="button"
                        className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500"
                        onClick={closeCart}
                      >
                        <span className="sr-only">Close</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </button>
                    </div>

                    {/* Cart Content */}
                    {cartItems.length === 0 ? (
                      <EmptyCart onClose={closeCart} />
                    ) : (
                      <>
                        {/* Cart items */}
                        <div className="flex-1 overflow-y-auto px-4 sm:px-6">
                          <div className="space-y-6 pb-6">
                            {cartItems.map((item) => (
                              <CartItem
                                key={`${item.productId}-${item.variantColor}-${item.variantSize}`}
                                item={item}
                                onRemove={() =>
                                  handleRemoveItem(
                                    item.productId,
                                    item.variantColor,
                                    item.variantSize
                                  )
                                }
                                onUpdateQuantity={(quantity: number) =>
                                  handleUpdateQuantity(
                                    item.productId,
                                    item.variantColor,
                                    item.variantSize,
                                    quantity
                                  )
                                }
                              />
                            ))}
                          </div>
                        </div>

                        {/* Cart summary */}
                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                          <div className="space-y-4">
                            <div className="flex justify-between text-base font-medium text-gray-900">
                              <p>Subtotal</p>
                              <p>${cartTotal.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <p>Shipping</p>
                              <p>
                                {shipping === 0
                                  ? "Free"
                                  : `$${shipping.toFixed(2)}`}
                              </p>
                            </div>
                            <div className="flex justify-between text-sm text-gray-500">
                              <p>Estimated Tax</p>
                              <p>${estimatedTax.toFixed(2)}</p>
                            </div>
                            <div className="flex justify-between text-base font-semibold text-gray-900">
                              <p>Order Total</p>
                              <p>${orderTotal.toFixed(2)}</p>
                            </div>
                          </div>

                          <div className="mt-6">
                            <Link href="/checkout">
                              <Button
                                variant="default"
                                fullWidth
                                size="lg"
                                onClick={closeCart}
                              >
                                Checkout
                              </Button>
                            </Link>
                          </div>

                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or{" "}
                              <button
                                type="button"
                                className="font-medium text-primary-600 hover:text-primary-700"
                                onClick={closeCart}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Cart;
