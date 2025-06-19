"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface PaymentFormData {
  cardNumber: string;
  nameOnCard: string;
  expiryDate: string;
  cvv: string;
  saveCard: boolean;
}

interface PaymentFormProps {
  formData: PaymentFormData;
  updateData: (data: Partial<PaymentFormData>) => void;
  onNext: () => void;
  onBack: () => void;
}

const PaymentForm = ({
  formData,
  updateData,
  onNext,
  onBack,
}: PaymentFormProps) => {
  const [errors, setErrors] = useState<Partial<PaymentFormData>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const isCheckbox = e.target.type === "checkbox";

    updateData({
      [name]: isCheckbox ? e.target.checked : value,
    } as Partial<PaymentFormData>);

    // Clear error when user types
    if (errors[name as keyof PaymentFormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  // Format expiry date as MM/YY
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");

    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }

    return v;
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatCardNumber(e.target.value);
    updateData({ cardNumber: formattedValue });

    // Clear error when user types
    if (errors.cardNumber) {
      setErrors((prev) => ({ ...prev, cardNumber: undefined }));
    }
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedValue = formatExpiryDate(e.target.value);
    updateData({ expiryDate: formattedValue });

    // Clear error when user types
    if (errors.expiryDate) {
      setErrors((prev) => ({ ...prev, expiryDate: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentFormData> = {};

    // Card number validation (simple check for demo)
    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (formData.cardNumber.replace(/\s/g, "").length < 16) {
      newErrors.cardNumber = "Card number must be 16 digits";
    }

    // Name validation
    if (!formData.nameOnCard) {
      newErrors.nameOnCard = "Name on card is required";
    }

    // Expiry date validation
    if (!formData.expiryDate) {
      newErrors.expiryDate = "Expiry date is required";
    } else if (!/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format";
    } else {
      // Check if the card is not expired
      const [month, year] = formData.expiryDate.split("/");
      const expiryDate = new Date();
      expiryDate.setFullYear(
        2000 + parseInt(year, 10),
        parseInt(month, 10) - 1,
        1
      );

      if (expiryDate < new Date()) {
        newErrors.expiryDate = "Card is expired";
      }
    }

    // CVV validation
    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^\d{3,4}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onNext();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
      <h2 className="text-xl font-semibold mb-6">Payment Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Card details */}
        <div>
          <div className="mb-8">
            <div className="flex items-center space-x-4 mb-6">
              <span className="text-gray-700 text-sm">We accept:</span>
              <div className="flex space-x-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                  Visa
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                  Mastercard
                </span>
                <span className="px-2 py-1 bg-gray-100 rounded text-sm font-medium">
                  Amex
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Card Number*
                </label>
                <input
                  type="text"
                  id="cardNumber"
                  name="cardNumber"
                  value={formData.cardNumber}
                  onChange={handleCardNumberChange}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                  className={`w-full rounded-md border ${
                    errors.cardNumber ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                />
                {errors.cardNumber && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.cardNumber}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="nameOnCard"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name on Card*
                </label>
                <input
                  type="text"
                  id="nameOnCard"
                  name="nameOnCard"
                  value={formData.nameOnCard}
                  onChange={handleChange}
                  className={`w-full rounded-md border ${
                    errors.nameOnCard ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                />
                {errors.nameOnCard && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.nameOnCard}
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="expiryDate"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Expiry Date (MM/YY)*
                  </label>
                  <input
                    type="text"
                    id="expiryDate"
                    name="expiryDate"
                    value={formData.expiryDate}
                    onChange={handleExpiryDateChange}
                    placeholder="MM/YY"
                    maxLength={5}
                    className={`w-full rounded-md border ${
                      errors.expiryDate ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  />
                  {errors.expiryDate && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.expiryDate}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    CVV*
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    name="cvv"
                    value={formData.cvv}
                    onChange={handleChange}
                    placeholder="123"
                    maxLength={4}
                    className={`w-full rounded-md border ${
                      errors.cvv ? "border-red-500" : "border-gray-300"
                    } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                  />
                  {errors.cvv && (
                    <p className="mt-1 text-sm text-red-600">{errors.cvv}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="saveCard"
              name="saveCard"
              type="checkbox"
              checked={formData.saveCard}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
            />
            <label
              htmlFor="saveCard"
              className="ml-2 block text-sm text-gray-700"
            >
              Save this card for future purchases
            </label>
          </div>
        </div>

        {/* Security Notice */}
        <div className="rounded-md bg-gray-50 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1.944A11.954 11.954 0 0 1 2.166 5C2.056 5.649 2 6.319 2 7c0 5.225 3.34 9.67 8 11.317C14.66 16.67 18 12.225 18 7c0-.682-.057-1.35-.166-2.001A11.954 11.954 0 0 1 10 1.944zM11 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0zm0-7a1 1 0 1 0-2 0v3a1 1 0 1 0 2 0V7z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-gray-700">
                Your payment information is secure. We use industry-standard
                encryption to protect your data.
              </p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back to Shipping
          </Button>

          <Button type="submit">Place Order</Button>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;
