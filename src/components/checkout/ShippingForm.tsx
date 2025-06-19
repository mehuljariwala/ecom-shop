"use client";

import { useState } from "react";
import { Button } from "../ui/button";

interface ShippingFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  sameAsBilling: boolean;
}

interface ShippingFormProps {
  formData: ShippingFormData;
  updateCustomerData: (
    data: Partial<
      Pick<ShippingFormData, "firstName" | "lastName" | "email" | "phone">
    >
  ) => void;
  updateShippingData: (
    data: Partial<
      Omit<ShippingFormData, "firstName" | "lastName" | "email" | "phone">
    >
  ) => void;
  updateBillingData: (
    data: Partial<
      Omit<
        ShippingFormData,
        "firstName" | "lastName" | "email" | "phone" | "sameAsBilling"
      >
    >
  ) => void;
  onNext: () => void;
  onBack: () => void;
}

const ShippingForm = ({
  formData,
  updateCustomerData,
  updateShippingData,
  updateBillingData,
  onNext,
  onBack,
}: ShippingFormProps) => {
  const [errors, setErrors] = useState<Partial<ShippingFormData>>({});

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (["firstName", "lastName", "email", "phone"].includes(name)) {
      updateCustomerData({ [name]: value } as Partial<
        Pick<ShippingFormData, "firstName" | "lastName" | "email" | "phone">
      >);

      // Clear error when user types
      if (errors[name as keyof ShippingFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleShippingChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const isCheckbox =
      e.target instanceof HTMLInputElement && e.target.type === "checkbox";

    if (
      name !== "firstName" &&
      name !== "lastName" &&
      name !== "email" &&
      name !== "phone"
    ) {
      updateShippingData({
        [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
      } as Partial<
        Omit<ShippingFormData, "firstName" | "lastName" | "email" | "phone">
      >);

      // If sameAsBilling is checked, update billing info as well
      if (name !== "sameAsBilling" && formData.sameAsBilling) {
        updateBillingData({ [name]: value } as Partial<
          Omit<
            ShippingFormData,
            "firstName" | "lastName" | "email" | "phone" | "sameAsBilling"
          >
        >);
      }

      // Clear error when user types
      if (errors[name as keyof ShippingFormData]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    }
  };

  const handleSameAsBillingChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const isSameAsBilling = e.target.checked;
    updateShippingData({ sameAsBilling: isSameAsBilling });

    // If checked, copy shipping address to billing address
    if (isSameAsBilling) {
      updateBillingData({
        address1: formData.address1,
        address2: formData.address2,
        city: formData.city,
        state: formData.state,
        zipCode: formData.zipCode,
        country: formData.country,
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<ShippingFormData> = {};

    // Customer info validation
    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    }

    // Shipping address validation
    if (!formData.address1) {
      newErrors.address1 = "Address is required";
    }

    if (!formData.city) {
      newErrors.city = "City is required";
    }

    if (!formData.state) {
      newErrors.state = "State is required";
    }

    if (!formData.zipCode) {
      newErrors.zipCode = "Zip code is required";
    }

    if (!formData.country) {
      newErrors.country = "Country is required";
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

  // States array for dropdown
  const states = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-10">
      <h2 className="text-xl font-semibold mb-6">Shipping Information</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Contact Information */}
        <div>
          <h3 className="text-lg font-medium mb-4">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                First Name*
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleCustomerChange}
                className={`w-full rounded-md border ${
                  errors.firstName ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Last Name*
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleCustomerChange}
                className={`w-full rounded-md border ${
                  errors.lastName ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleCustomerChange}
                className={`w-full rounded-md border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleCustomerChange}
                className={`w-full rounded-md border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
          </div>
        </div>

        {/* Shipping Address */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-lg font-medium mb-4">Shipping Address</h3>

          <div className="space-y-6">
            <div>
              <label
                htmlFor="address1"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Line 1*
              </label>
              <input
                type="text"
                id="address1"
                name="address1"
                value={formData.address1}
                onChange={handleShippingChange}
                className={`w-full rounded-md border ${
                  errors.address1 ? "border-red-500" : "border-gray-300"
                } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
              />
              {errors.address1 && (
                <p className="mt-1 text-sm text-red-600">{errors.address1}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="address2"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Address Line 2 (Optional)
              </label>
              <input
                type="text"
                id="address2"
                name="address2"
                value={formData.address2 || ""}
                onChange={handleShippingChange}
                className="w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="city"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  City*
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formData.city}
                  onChange={handleShippingChange}
                  className={`w-full rounded-md border ${
                    errors.city ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                />
                {errors.city && (
                  <p className="mt-1 text-sm text-red-600">{errors.city}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="state"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  State*
                </label>
                <select
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleShippingChange}
                  className={`w-full rounded-md border ${
                    errors.state ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="">Select a state</option>
                  {states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
                {errors.state && (
                  <p className="mt-1 text-sm text-red-600">{errors.state}</p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  htmlFor="zipCode"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Zip Code*
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleShippingChange}
                  className={`w-full rounded-md border ${
                    errors.zipCode ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                />
                {errors.zipCode && (
                  <p className="mt-1 text-sm text-red-600">{errors.zipCode}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="country"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Country*
                </label>
                <select
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleShippingChange}
                  className={`w-full rounded-md border ${
                    errors.country ? "border-red-500" : "border-gray-300"
                  } px-3 py-2 shadow-sm focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                >
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="UK">United Kingdom</option>
                </select>
                {errors.country && (
                  <p className="mt-1 text-sm text-red-600">{errors.country}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Billing Address Checkbox */}
        <div className="flex items-center">
          <input
            id="sameAsBilling"
            name="sameAsBilling"
            type="checkbox"
            checked={formData.sameAsBilling}
            onChange={handleSameAsBillingChange}
            className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
          />
          <label
            htmlFor="sameAsBilling"
            className="ml-2 block text-sm text-gray-700"
          >
            Billing address is the same as shipping address
          </label>
        </div>

        {/* Action Buttons */}
        <div className="border-t border-gray-200 pt-6 flex justify-between">
          <Button type="button" variant="outline" onClick={onBack}>
            Back
          </Button>

          <Button type="submit">Continue to Payment</Button>
        </div>
      </form>
    </div>
  );
};

export default ShippingForm;
