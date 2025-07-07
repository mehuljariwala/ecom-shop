"use client";

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  selectCartItems,
  selectCartTotal,
  clearCart,
  addToCart,
} from "../../../store/slices/cartSlice";
import { selectIsAuthenticated } from "../../../store/slices/authSlice";
import { showToast } from "../../../store/slices/uiSlice";
import CheckoutSteps from "../../../components/checkout/CheckoutSteps";
import OrderSummary from "../../../components/checkout/OrderSummary";
import LoginForm from "../../../components/checkout/LoginForm";
import GuestForm from "../../../components/checkout/GuestForm";
import ShippingForm from "../../../components/checkout/ShippingForm";
import PaymentForm from "../../../components/checkout/PaymentForm";
import OrderConfirmation from "../../../components/checkout/OrderConfirmation";

// Checkout steps
const STEPS = {
  AUTH: 0,
  SHIPPING: 1,
  PAYMENT: 2,
  CONFIRMATION: 3,
};

export default function CheckoutPage() {
  // const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const cartTotal = useSelector(selectCartTotal);
  const isAuthenticated = useSelector(selectIsAuthenticated);

  // Checkout state
  const [currentStep, setCurrentStep] = useState(STEPS.AUTH);
  const [isGuest, setIsGuest] = useState(false);
  const [checkoutData, setCheckoutData] = useState({
    customer: {
      email: "",
      firstName: "",
      lastName: "",
      phone: "",
    },
    shipping: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
      sameAsBilling: true,
    },
    billing: {
      address1: "",
      address2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "US",
    },
    payment: {
      cardNumber: "",
      nameOnCard: "",
      expiryDate: "",
      cvv: "",
      saveCard: false,
    },
    orderNotes: "",
  });

  // Calculate order totals
  const shipping = cartTotal >= 75 ? 0 : 5.99;
  const tax = cartTotal * 0.0825;
  const orderTotal = cartTotal + shipping + tax;

  // Add mock items to cart for testing purposes
  useEffect(() => {
    // Only add mock items if cart is empty and not in confirmation step
    if (cartItems.length === 0 && currentStep !== STEPS.CONFIRMATION) {
      // Add mock items to the cart
      dispatch(
        addToCart({
          productId: "1",
          name: "Floral Summer Dress",
          price: 79.99,
          image:
            "https://images.unsplash.com/photo-1623609163859-ca93c646ccd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          variantColor: "#FADBC0",
          variantSize: "M",
          quantity: 1,
        })
      );

      dispatch(
        addToCart({
          productId: "4",
          name: "Statement Earrings",
          price: 29.99,
          image:
            "https://images.unsplash.com/photo-1615655067369-1a8e71e50194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
          variantColor: "default",
          variantSize: "OS",
          quantity: 1,
        })
      );
    }
  }, [cartItems.length, currentStep, dispatch]);

  // Skip auth step if user is already authenticated
  useEffect(() => {
    if (isAuthenticated && currentStep === STEPS.AUTH) {
      setCurrentStep(STEPS.SHIPPING);
    }
  }, [isAuthenticated, currentStep]);

  // Define the checkout data structure
  type CustomerData = {
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
  };

  type ShippingData = {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    sameAsBilling: boolean;
  };

  type BillingData = {
    address1: string;
    address2: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };

  type PaymentData = {
    cardNumber: string;
    nameOnCard: string;
    expiryDate: string;
    cvv: string;
    saveCard: boolean;
  };

  type CheckoutData = {
    customer: CustomerData;
    shipping: ShippingData;
    billing: BillingData;
    payment: PaymentData;
    orderNotes: string;
  };

  // Define the checkout data sections
  type CheckoutDataSection = keyof CheckoutData;

  // Handle form data updates
  const updateCheckoutData = (
    section: CheckoutDataSection,
    data: Record<string, unknown>
  ) => {
    setCheckoutData((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] as Record<string, unknown>),
        ...data,
      },
    }));
  };

  // Handle moving to next step
  const goToNextStep = () => {
    setCurrentStep((prev) => prev + 1);
    window.scrollTo(0, 0);
  };

  // Handle moving to previous step
  const goToPreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
    window.scrollTo(0, 0);
  };

  // Handle order submission
  const submitOrder = () => {
    // In a real app, this would send the order to a backend API
    // For now, we'll just simulate a successful order

    // Clear the cart
    dispatch(clearCart());

    // Show success message
    dispatch(
      showToast({
        message: "Your order has been placed successfully!",
        type: "success",
      })
    );

    // Move to confirmation step
    setCurrentStep(STEPS.CONFIRMATION);
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case STEPS.AUTH:
        return isGuest ? (
          <GuestForm
            formData={checkoutData.customer}
            updateData={(data: Record<string, unknown>) =>
              updateCheckoutData("customer", data)
            }
            onNext={goToNextStep}
          />
        ) : (
          <LoginForm
            onLoginSuccess={() => goToNextStep()}
            onContinueAsGuest={() => {
              setIsGuest(true);
            }}
          />
        );

      case STEPS.SHIPPING:
        return (
          <ShippingForm
            formData={{
              ...checkoutData.customer,
              ...checkoutData.shipping,
            }}
            updateCustomerData={(data: Record<string, unknown>) =>
              updateCheckoutData("customer", data)
            }
            updateShippingData={(data: Record<string, unknown>) =>
              updateCheckoutData("shipping", data)
            }
            updateBillingData={(data: Record<string, unknown>) =>
              updateCheckoutData("billing", data)
            }
            onNext={goToNextStep}
            onBack={goToPreviousStep}
          />
        );

      case STEPS.PAYMENT:
        return (
          <PaymentForm
            formData={checkoutData.payment}
            updateData={(data: Record<string, unknown>) =>
              updateCheckoutData("payment", data)
            }
            onNext={submitOrder}
            onBack={goToPreviousStep}
          />
        );

      case STEPS.CONFIRMATION:
        return (
          <OrderConfirmation
            orderNumber={`ORD-${Date.now().toString().substring(5)}`}
            orderData={checkoutData}
            orderTotal={orderTotal}
          />
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="container-custom mx-auto py-12">
        {/* Breadcrumbs */}
        <nav className="mb-8 text-sm text-gray-600">
          <ol className="flex items-center space-x-2">
            <li>
              <Link
                href="/"
                className="hover:text-primary-600 transition-colors"
              >
                Home
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <Link
                href="/shop"
                className="hover:text-primary-600 transition-colors"
              >
                Shop
              </Link>
            </li>
            <li className="flex items-center space-x-2">
              <span>/</span>
              <span className="text-gray-900">Checkout</span>
            </li>
          </ol>
        </nav>

        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          {currentStep === STEPS.CONFIRMATION
            ? "Order Confirmation"
            : "Checkout"}
        </h1>

        {currentStep !== STEPS.CONFIRMATION && (
          <CheckoutSteps
            currentStep={currentStep}
            isAuthenticated={isAuthenticated || isGuest}
          />
        )}

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          {/* Main checkout form */}
          <div className="lg:col-span-7">{renderStep()}</div>

          {/* Order summary */}
          <div className="mt-10 lg:mt-0 lg:col-span-5">
            {currentStep !== STEPS.CONFIRMATION && (
              <OrderSummary
                items={cartItems}
                subtotal={cartTotal}
                shipping={shipping}
                tax={tax}
                total={orderTotal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
