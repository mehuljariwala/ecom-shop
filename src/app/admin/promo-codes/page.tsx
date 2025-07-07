"use client";

import React, { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Interface for promo codes
interface PromoCode {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minPurchaseAmount: number;
  maxUses: number;
  currentUses: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  description: string;
  appliesTo: "all" | "specific_categories" | "specific_products";
  applicableCategories?: string[];
  applicableProducts?: string[];
  createdAt?: string; // For sorting/filtering
}

// Mock promo codes data - in a real app this would come from an API/database
const mockPromoCodes: PromoCode[] = [
  {
    id: "PROMO-001",
    code: "SUMMER25",
    discountType: "percentage",
    discountValue: 25,
    minPurchaseAmount: 50,
    maxUses: 1000,
    currentUses: 342,
    startDate: "2023-06-01",
    endDate: "2023-08-31",
    isActive: true,
    description: "Summer sale - 25% off orders over $50",
    appliesTo: "all",
    createdAt: "2023-05-15",
  },
  {
    id: "PROMO-002",
    code: "WELCOME10",
    discountType: "fixed",
    discountValue: 10,
    minPurchaseAmount: 0,
    maxUses: 0, // unlimited
    currentUses: 587,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    isActive: true,
    description: "Welcome discount - $10 off any order",
    appliesTo: "all",
    createdAt: "2023-01-01",
  },
  {
    id: "PROMO-003",
    code: "ACCESSORIES15",
    discountType: "percentage",
    discountValue: 15,
    minPurchaseAmount: 0,
    maxUses: 500,
    currentUses: 123,
    startDate: "2023-05-15",
    endDate: "2023-07-15",
    isActive: true,
    description: "15% off all accessories",
    appliesTo: "specific_categories",
    applicableCategories: ["accessories"],
    createdAt: "2023-05-10",
  },
  {
    id: "PROMO-004",
    code: "FREESHIP",
    discountType: "fixed",
    discountValue: 5,
    minPurchaseAmount: 25,
    maxUses: 2000,
    currentUses: 876,
    startDate: "2023-04-01",
    endDate: "2023-12-31",
    isActive: true,
    description: "Free shipping on orders over $25",
    appliesTo: "all",
    createdAt: "2023-03-25",
  },
  {
    id: "PROMO-005",
    code: "FLASH50",
    discountType: "percentage",
    discountValue: 50,
    minPurchaseAmount: 100,
    maxUses: 100,
    currentUses: 100,
    startDate: "2023-05-01",
    endDate: "2023-05-03",
    isActive: false,
    description: "Flash sale - 50% off orders over $100",
    appliesTo: "all",
    createdAt: "2023-04-28",
  },
  {
    id: "PROMO-006",
    code: "NEWYEAR2023",
    discountType: "percentage",
    discountValue: 20,
    minPurchaseAmount: 75,
    maxUses: 500,
    currentUses: 245,
    startDate: "2023-12-26",
    endDate: "2024-01-10",
    isActive: true,
    description: "New Year sale - 20% off orders over $75",
    appliesTo: "all",
    createdAt: "2023-12-20",
  },
  {
    id: "PROMO-007",
    code: "SHOES15",
    discountType: "percentage",
    discountValue: 15,
    minPurchaseAmount: 0,
    maxUses: 300,
    currentUses: 78,
    startDate: "2023-06-15",
    endDate: "2023-07-30",
    isActive: true,
    description: "15% off all shoes",
    appliesTo: "specific_categories",
    applicableCategories: ["shoes", "footwear"],
    createdAt: "2023-06-10",
  },
];

// Define sort and filter types
type SortField =
  | "code"
  | "discountValue"
  | "startDate"
  | "endDate"
  | "currentUses"
  | "createdAt";
type SortDirection = "asc" | "desc";
type FilterStatus = "all" | "active" | "inactive" | "expiring-soon";
type FilterType = "all" | "percentage" | "fixed";

const PromoCodesPage = () => {
  const [promoCodes, setPromoCodes] = useState<PromoCode[]>([]);
  const [filteredPromoCodes, setFilteredPromoCodes] = useState<PromoCode[]>([]);
  const [displayedPromoCodes, setDisplayedPromoCodes] = useState<PromoCode[]>(
    []
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPromoCode, setCurrentPromoCode] = useState<PromoCode | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  // Sorting state
  const [sortField, setSortField] = useState<SortField>("code");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");

  // Filtering state
  const [statusFilter, setStatusFilter] = useState<FilterStatus>("all");
  const [typeFilter, setTypeFilter] = useState<FilterType>("all");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  // Form state
  const [formData, setFormData] = useState<PromoCode>({
    id: "",
    code: "",
    discountType: "percentage",
    discountValue: 0,
    minPurchaseAmount: 0,
    maxUses: 0,
    currentUses: 0,
    startDate: "",
    endDate: "",
    isActive: true,
    description: "",
    appliesTo: "all",
    applicableCategories: [],
    applicableProducts: [],
    createdAt: new Date().toISOString().split("T")[0],
  });

  // Form validation
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Load promo codes on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setPromoCodes(mockPromoCodes);
    setFilteredPromoCodes(mockPromoCodes);
  }, []);

  // Apply search filter
  useEffect(() => {
    let result = promoCodes;

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(
        (promoCode) =>
          promoCode.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
          promoCode.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply status filter
    if (statusFilter !== "all") {
      const today = new Date();
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      if (statusFilter === "active") {
        result = result.filter((code) => code.isActive);
      } else if (statusFilter === "inactive") {
        result = result.filter((code) => !code.isActive);
      } else if (statusFilter === "expiring-soon") {
        result = result.filter((code) => {
          const endDate = new Date(code.endDate);
          return (
            code.isActive && endDate <= thirtyDaysFromNow && endDate >= today
          );
        });
      }
    }

    // Apply type filter
    if (typeFilter !== "all") {
      result = result.filter((code) => code.discountType === typeFilter);
    }

    setFilteredPromoCodes(result);
  }, [searchTerm, promoCodes, statusFilter, typeFilter]);

  // Apply sorting and pagination
  useEffect(() => {
    // Sort the filtered codes
    const sortedCodes = [...filteredPromoCodes].sort((a, b) => {
      if (sortField === "code") {
        return sortDirection === "asc"
          ? a.code.localeCompare(b.code)
          : b.code.localeCompare(a.code);
      } else if (sortField === "discountValue") {
        return sortDirection === "asc"
          ? a.discountValue - b.discountValue
          : b.discountValue - a.discountValue;
      } else if (sortField === "currentUses") {
        return sortDirection === "asc"
          ? a.currentUses - b.currentUses
          : b.currentUses - a.currentUses;
      } else if (
        sortField === "startDate" ||
        sortField === "endDate" ||
        sortField === "createdAt"
      ) {
        const dateA = new Date(a[sortField] || "");
        const dateB = new Date(b[sortField] || "");
        return sortDirection === "asc"
          ? dateA.getTime() - dateB.getTime()
          : dateB.getTime() - dateA.getTime();
      }
      return 0;
    });

    // Apply pagination
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedCodes = sortedCodes.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    setDisplayedPromoCodes(paginatedCodes);
  }, [filteredPromoCodes, sortField, sortDirection, currentPage, itemsPerPage]);

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target as HTMLInputElement;

    if (type === "checkbox") {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else if (
      name === "applicableCategories" ||
      name === "applicableProducts"
    ) {
      // Handle arrays
      const values = value.split(",").map((item) => item.trim());
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else if (
      name === "discountValue" ||
      name === "minPurchaseAmount" ||
      name === "maxUses"
    ) {
      // Handle numeric inputs
      setFormData((prev) => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open modal for adding a new promo code
  const handleAddNew = () => {
    setCurrentPromoCode(null);
    setEditMode(false);
    const today = new Date().toISOString().split("T")[0];
    const nextMonth = new Date();
    nextMonth.setMonth(nextMonth.getMonth() + 1);

    setFormData({
      id: `PROMO-${String(promoCodes.length + 1).padStart(3, "0")}`,
      code: "",
      discountType: "percentage",
      discountValue: 10,
      minPurchaseAmount: 0,
      maxUses: 0,
      currentUses: 0,
      startDate: today,
      endDate: nextMonth.toISOString().split("T")[0],
      isActive: true,
      description: "",
      appliesTo: "all",
      applicableCategories: [],
      applicableProducts: [],
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing promo code
  const handleEdit = (promoCode: PromoCode) => {
    setCurrentPromoCode(promoCode);
    setEditMode(true);
    setFormData({
      ...promoCode,
      applicableCategories: promoCode.applicableCategories || [],
      applicableProducts: promoCode.applicableProducts || [],
    });
    setIsModalOpen(true);
  };

  // Handle promo code deletion
  const handleDelete = (promoId: string) => {
    if (window.confirm("Are you sure you want to delete this promo code?")) {
      const updatedPromoCodes = promoCodes.filter((p) => p.id !== promoId);
      setPromoCodes(updatedPromoCodes);
    }
  };

  // Toggle promo code active status
  const toggleActiveStatus = (promoId: string) => {
    const updatedPromoCodes = promoCodes.map((p) => {
      if (p.id === promoId) {
        return { ...p, isActive: !p.isActive };
      }
      return p;
    });
    setPromoCodes(updatedPromoCodes);
  };

  // Handle form validation
  const validateForm = (): boolean => {
    const errors: { [key: string]: string } = {};

    // Validate code (required, no spaces, alphanumeric)
    if (!formData.code.trim()) {
      errors.code = "Promo code is required";
    } else if (!/^[A-Za-z0-9_-]+$/.test(formData.code)) {
      errors.code =
        "Code must contain only letters, numbers, underscores and hyphens";
    }

    // Validate discount value
    if (formData.discountValue <= 0) {
      errors.discountValue = "Discount value must be greater than zero";
    } else if (
      formData.discountType === "percentage" &&
      formData.discountValue > 100
    ) {
      errors.discountValue = "Percentage discount cannot exceed 100%";
    }

    // Validate dates
    const startDate = new Date(formData.startDate);
    const endDate = new Date(formData.endDate);

    if (isNaN(startDate.getTime())) {
      errors.startDate = "Start date is required";
    }

    if (isNaN(endDate.getTime())) {
      errors.endDate = "End date is required";
    } else if (startDate > endDate) {
      errors.endDate = "End date must be after start date";
    }

    // Check for duplicate code (only for new codes)
    if (!editMode && promoCodes.some((p) => p.code === formData.code)) {
      errors.code = "This promo code already exists";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Don't submit if validation fails
    }

    if (editMode && currentPromoCode) {
      // Update existing promo code
      const updatedPromoCodes = promoCodes.map((p) =>
        p.id === currentPromoCode.id ? formData : p
      );
      setPromoCodes(updatedPromoCodes);
    } else {
      // Add new promo code with current date as createdAt
      const newPromoCode = {
        ...formData,
        createdAt: new Date().toISOString().split("T")[0],
      };
      setPromoCodes([...promoCodes, newPromoCode]);
    }

    setIsModalOpen(false);
    setFormErrors({});
  };

  // Handle sorting
  const handleSortChange = (field: SortField) => {
    if (sortField === field) {
      // Toggle direction if same field clicked
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new field and default to ascending
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Get sort indicator arrow
  const getSortIndicator = (field: SortField) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? " ↑" : " ↓";
  };

  // Handle pagination
  const totalPages = Math.ceil(filteredPromoCodes.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Check if a promo code is expiring soon (within 30 days)
  const isExpiringSoon = (endDate: string): boolean => {
    const today = new Date();
    const expiryDate = new Date(endDate);
    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(today.getDate() + 30);

    return expiryDate <= thirtyDaysFromNow && expiryDate >= today;
  };

  return (
    <div className="px-1">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Promo Codes</h1>
          <p className="mt-2 text-sm text-gray-700">
            Create and manage promotional codes and discounts.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Promo Code
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              placeholder="Search promo codes..."
            />
          </div>

          {/* Status Filter */}
          <div>
            <label
              htmlFor="status-filter"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Status
            </label>
            <select
              id="status-filter"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as FilterStatus)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="all">All Statuses</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="expiring-soon">Expiring Soon</option>
            </select>
          </div>

          {/* Type Filter */}
          <div>
            <label
              htmlFor="type-filter"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Discount Type
            </label>
            <select
              id="type-filter"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value as FilterType)}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="all">All Types</option>
              <option value="percentage">Percentage</option>
              <option value="fixed">Fixed Amount</option>
            </select>
          </div>

          {/* Items per page */}
          <div>
            <label
              htmlFor="items-per-page"
              className="block text-xs font-medium text-gray-700 mb-1"
            >
              Items per page
            </label>
            <select
              id="items-per-page"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1); // Reset to first page when changing items per page
              }}
              className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {/* Promo Codes Table */}
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("code")}
                    >
                      Code {getSortIndicator("code")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("discountValue")}
                    >
                      Discount {getSortIndicator("discountValue")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("endDate")}
                    >
                      Validity {getSortIndicator("endDate")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                      onClick={() => handleSortChange("currentUses")}
                    >
                      Usage {getSortIndicator("currentUses")}
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedPromoCodes.map((promoCode) => (
                    <tr
                      key={promoCode.id}
                      className={`hover:bg-gray-50 ${isExpiringSoon(promoCode.endDate) && promoCode.isActive ? "bg-amber-50" : ""}`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {promoCode.code}
                            </div>
                            <div className="text-xs text-gray-500">
                              {promoCode.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {promoCode.discountType === "percentage"
                            ? `${promoCode.discountValue}%`
                            : `$${promoCode.discountValue.toFixed(2)}`}
                        </div>
                        <div className="text-xs text-gray-500">
                          {promoCode.minPurchaseAmount > 0
                            ? `Min. purchase: $${promoCode.minPurchaseAmount.toFixed(2)}`
                            : "No minimum"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="text-sm text-gray-900">
                            {promoCode.startDate} to {promoCode.endDate}
                          </div>
                          {isExpiringSoon(promoCode.endDate) &&
                            promoCode.isActive && (
                              <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
                                Expiring Soon
                              </span>
                            )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {promoCode.currentUses} used
                        </div>
                        <div className="text-xs text-gray-500">
                          {promoCode.maxUses > 0
                            ? `Max: ${promoCode.maxUses}`
                            : "Unlimited uses"}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleActiveStatus(promoCode.id)}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            promoCode.isActive
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          {promoCode.isActive ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(promoCode)}
                            className="text-primary-600 hover:text-primary-900 bg-white rounded-full p-1 hover:bg-primary-50"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(promoCode.id)}
                            className="text-red-600 hover:text-red-900 bg-white rounded-full p-1 hover:bg-red-50"
                          >
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button
                    onClick={() =>
                      handlePageChange(Math.max(1, currentPage - 1))
                    }
                    disabled={currentPage === 1}
                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() =>
                      handlePageChange(Math.min(totalPages, currentPage + 1))
                    }
                    disabled={currentPage === totalPages}
                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm text-gray-700">
                      Showing{" "}
                      <span className="font-medium">
                        {(currentPage - 1) * itemsPerPage + 1}
                      </span>{" "}
                      to{" "}
                      <span className="font-medium">
                        {Math.min(
                          currentPage * itemsPerPage,
                          filteredPromoCodes.length
                        )}
                      </span>{" "}
                      of{" "}
                      <span className="font-medium">
                        {filteredPromoCodes.length}
                      </span>{" "}
                      results
                    </p>
                  </div>
                  <div>
                    <nav
                      className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                      aria-label="Pagination"
                    >
                      <button
                        onClick={() =>
                          handlePageChange(Math.max(1, currentPage - 1))
                        }
                        disabled={currentPage === 1}
                        className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Previous</span>
                        &laquo;
                      </button>

                      {/* Page numbers */}
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => handlePageChange(page)}
                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                              currentPage === page
                                ? "z-10 bg-primary-50 border-primary-500 text-primary-600"
                                : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}

                      <button
                        onClick={() =>
                          handlePageChange(
                            Math.min(totalPages, currentPage + 1)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <span className="sr-only">Next</span>
                        &raquo;
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Promo Code Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>

            <span
              className="hidden sm:inline-block sm:align-middle sm:h-screen"
              aria-hidden="true"
            >
              &#8203;
            </span>

            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <form onSubmit={handleSubmit}>
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      {editMode ? "Edit Promo Code" : "Add New Promo Code"}
                    </h3>
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="text-gray-400 hover:text-gray-500"
                    >
                      <XMarkIcon className="h-6 w-6" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label
                        htmlFor="code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Code
                      </label>
                      <input
                        type="text"
                        name="code"
                        id="code"
                        value={formData.code}
                        onChange={handleInputChange}
                        required
                        className={`mt-1 block w-full border ${
                          formErrors.code ? "border-red-300" : "border-gray-300"
                        } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                      />
                      {formErrors.code && (
                        <p className="mt-1 text-sm text-red-600">
                          {formErrors.code}
                        </p>
                      )}
                    </div>

                    <div>
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Description
                      </label>
                      <textarea
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        rows={2}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="discountType"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Discount Type
                        </label>
                        <select
                          name="discountType"
                          id="discountType"
                          value={formData.discountType}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        >
                          <option value="percentage">Percentage</option>
                          <option value="fixed">Fixed Amount</option>
                        </select>
                      </div>
                      <div>
                        <label
                          htmlFor="discountValue"
                          className="block text-sm font-medium text-gray-700"
                        >
                          {formData.discountType === "percentage"
                            ? "Percentage (%)"
                            : "Amount ($)"}
                        </label>
                        <input
                          type="number"
                          name="discountValue"
                          id="discountValue"
                          min="0"
                          step={
                            formData.discountType === "percentage"
                              ? "1"
                              : "0.01"
                          }
                          value={formData.discountValue}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 block w-full border ${
                            formErrors.discountValue
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                        />
                        {formErrors.discountValue && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.discountValue}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="minPurchaseAmount"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Minimum Purchase Amount ($)
                      </label>
                      <input
                        type="number"
                        name="minPurchaseAmount"
                        id="minPurchaseAmount"
                        min="0"
                        step="0.01"
                        value={formData.minPurchaseAmount}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="startDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          name="startDate"
                          id="startDate"
                          value={formData.startDate}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 block w-full border ${
                            formErrors.startDate
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                        />
                        {formErrors.startDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.startDate}
                          </p>
                        )}
                      </div>
                      <div>
                        <label
                          htmlFor="endDate"
                          className="block text-sm font-medium text-gray-700"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          name="endDate"
                          id="endDate"
                          value={formData.endDate}
                          onChange={handleInputChange}
                          required
                          className={`mt-1 block w-full border ${
                            formErrors.endDate
                              ? "border-red-300"
                              : "border-gray-300"
                          } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm`}
                        />
                        {formErrors.endDate && (
                          <p className="mt-1 text-sm text-red-600">
                            {formErrors.endDate}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="maxUses"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Maximum Uses (0 for unlimited)
                      </label>
                      <input
                        type="number"
                        name="maxUses"
                        id="maxUses"
                        min="0"
                        value={formData.maxUses}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="appliesTo"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Applies To
                      </label>
                      <select
                        name="appliesTo"
                        id="appliesTo"
                        value={formData.appliesTo}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      >
                        <option value="all">All Products</option>
                        <option value="specific_categories">
                          Specific Categories
                        </option>
                        <option value="specific_products">
                          Specific Products
                        </option>
                      </select>
                    </div>

                    {formData.appliesTo === "specific_categories" && (
                      <div>
                        <label
                          htmlFor="applicableCategories"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Applicable Categories (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="applicableCategories"
                          id="applicableCategories"
                          value={formData.applicableCategories?.join(", ")}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    )}

                    {formData.appliesTo === "specific_products" && (
                      <div>
                        <label
                          htmlFor="applicableProducts"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Applicable Product IDs (comma-separated)
                        </label>
                        <input
                          type="text"
                          name="applicableProducts"
                          id="applicableProducts"
                          value={formData.applicableProducts?.join(", ")}
                          onChange={handleInputChange}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>
                    )}

                    <div className="flex items-center">
                      <input
                        id="isActive"
                        name="isActive"
                        type="checkbox"
                        checked={formData.isActive}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="isActive"
                        className="ml-2 block text-sm text-gray-700"
                      >
                        Active
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editMode ? "Update Promo Code" : "Add Promo Code"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromoCodesPage;
