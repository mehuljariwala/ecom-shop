"use client";

import React, { useState, useEffect } from "react";
import {
  EyeIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

// Interface for order items
interface OrderItem {
  productId: string;
  name: string;
  price: number;
  salePrice?: number;
  quantity: number;
  variantColor: string;
  variantSize: string;
}

// Interface for order data
interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  date: string;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  items: OrderItem[];
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
  total: number;
  subtotal: number;
  tax: number;
  shipping: number;
}

// Mock orders data - in a real app this would come from an API/database
const mockOrders: Order[] = [
  {
    id: "ORD-1234",
    customerId: "CUST-001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    date: "2023-06-22",
    status: "delivered",
    items: [
      {
        productId: "1",
        name: "Floral Summer Dress",
        price: 79.99,
        quantity: 1,
        variantColor: "#FADBC0",
        variantSize: "M",
      },
      {
        productId: "4",
        name: "Statement Earrings",
        price: 29.99,
        quantity: 1,
        variantColor: "default",
        variantSize: "OS",
      },
    ],
    shippingAddress: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    total: 119.98,
    subtotal: 109.98,
    tax: 5.0,
    shipping: 5.0,
  },
  {
    id: "ORD-1235",
    customerId: "CUST-002",
    customerName: "Jane Smith",
    customerEmail: "jane.smith@example.com",
    date: "2023-06-22",
    status: "processing",
    items: [
      {
        productId: "2",
        name: "Casual Linen Blouse",
        price: 49.99,
        quantity: 1,
        variantColor: "#FFFFFF",
        variantSize: "S",
      },
      {
        productId: "5",
        name: "Summer Straw Hat",
        price: 34.99,
        salePrice: 24.99,
        quantity: 1,
        variantColor: "default",
        variantSize: "OS",
      },
    ],
    shippingAddress: {
      street: "456 Oak Ave",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "United States",
    },
    paymentMethod: "PayPal",
    total: 84.98,
    subtotal: 74.98,
    tax: 5.0,
    shipping: 5.0,
  },
  {
    id: "ORD-1236",
    customerId: "CUST-003",
    customerName: "Alex Johnson",
    customerEmail: "alex.johnson@example.com",
    date: "2023-06-21",
    status: "shipped",
    items: [
      {
        productId: "8",
        name: "Elegant Jumpsuit",
        price: 99.99,
        quantity: 1,
        variantColor: "default",
        variantSize: "L",
      },
    ],
    shippingAddress: {
      street: "789 Pine St",
      city: "Chicago",
      state: "IL",
      zip: "60007",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    total: 109.99,
    subtotal: 99.99,
    tax: 5.0,
    shipping: 5.0,
  },
  {
    id: "ORD-1237",
    customerId: "CUST-004",
    customerName: "Sarah Williams",
    customerEmail: "sarah.williams@example.com",
    date: "2023-06-20",
    status: "delivered",
    items: [
      {
        productId: "6",
        name: "Designer Handbag",
        price: 129.99,
        quantity: 1,
        variantColor: "default",
        variantSize: "OS",
      },
      {
        productId: "11",
        name: "Pearl Necklace",
        price: 59.99,
        quantity: 1,
        variantColor: "default",
        variantSize: "OS",
      },
    ],
    shippingAddress: {
      street: "321 Elm St",
      city: "Dallas",
      state: "TX",
      zip: "75001",
      country: "United States",
    },
    paymentMethod: "Credit Card",
    total: 199.98,
    subtotal: 189.98,
    tax: 5.0,
    shipping: 5.0,
  },
  {
    id: "ORD-1238",
    customerId: "CUST-005",
    customerName: "Robert Brown",
    customerEmail: "robert.brown@example.com",
    date: "2023-06-19",
    status: "delivered",
    items: [
      {
        productId: "9",
        name: "Cotton T-Shirt",
        price: 29.99,
        quantity: 2,
        variantColor: "#FFFFFF",
        variantSize: "XL",
      },
    ],
    shippingAddress: {
      street: "555 Maple Ave",
      city: "Boston",
      state: "MA",
      zip: "02108",
      country: "United States",
    },
    paymentMethod: "PayPal",
    total: 69.98,
    subtotal: 59.98,
    tax: 5.0,
    shipping: 5.0,
  },
];

const OrdersPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Order | "";
    direction: "ascending" | "descending";
  }>({
    key: "date",
    direction: "descending",
  });

  // Load orders on component mount
  useEffect(() => {
    // In a real app, this would be an API call
    setOrders(mockOrders);
    setFilteredOrders(mockOrders);
  }, []);

  // Filter orders based on search term and status
  useEffect(() => {
    let result = [...orders];

    if (searchTerm) {
      result = result.filter(
        (order) =>
          order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          order.customerEmail.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    // Apply sorting
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (
          a[sortConfig.key as keyof Order] < b[sortConfig.key as keyof Order]
        ) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (
          a[sortConfig.key as keyof Order] > b[sortConfig.key as keyof Order]
        ) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }

    setFilteredOrders(result);
  }, [searchTerm, statusFilter, orders, sortConfig]);

  // Handle sorting
  const requestSort = (key: keyof Order) => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  // Handle order status change
  const handleStatusChange = (orderId: string, newStatus: Order["status"]) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
  };

  // Toggle order details expansion
  const toggleOrderDetails = (orderId: string) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  // Get status badge class
  const getStatusBadgeClass = (status: Order["status"]) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "shipped":
        return "bg-indigo-100 text-indigo-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="px-1">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage customer orders, view details, and update order status.
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative rounded-md shadow-sm flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            placeholder="Search by order ID, customer name, or email..."
          />
        </div>

        <div className="max-w-xs">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("id")}
                    >
                      <div className="flex items-center">
                        <span>Order ID</span>
                        {sortConfig.key === "id" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("customerName")}
                    >
                      <div className="flex items-center">
                        <span>Customer</span>
                        {sortConfig.key === "customerName" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("date")}
                    >
                      <div className="flex items-center">
                        <span>Date</span>
                        {sortConfig.key === "date" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => requestSort("total")}
                    >
                      <div className="flex items-center">
                        <span>Total</span>
                        {sortConfig.key === "total" && (
                          <span className="ml-1">
                            {sortConfig.direction === "ascending" ? (
                              <ChevronUpIcon className="h-4 w-4" />
                            ) : (
                              <ChevronDownIcon className="h-4 w-4" />
                            )}
                          </span>
                        )}
                      </div>
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="relative px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredOrders.map((order) => (
                    <React.Fragment key={order.id}>
                      <tr className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div className="text-sm font-medium text-gray-900">
                            {order.customerName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {order.customerEmail}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {order.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                          ${order.total.toFixed(2)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <select
                            value={order.status}
                            onChange={(e) =>
                              handleStatusChange(
                                order.id,
                                e.target.value as Order["status"]
                              )
                            }
                            className={`px-3 py-1 text-xs leading-5 font-semibold rounded-full ${getStatusBadgeClass(
                              order.status
                            )} border-0 focus:outline-none focus:ring-1 focus:ring-primary-500`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="shipped">Shipped</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                          <button
                            onClick={() => toggleOrderDetails(order.id)}
                            className="text-primary-600 hover:text-primary-900 bg-white rounded-full p-1 hover:bg-primary-50"
                          >
                            <EyeIcon className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                      {expandedOrderId === order.id && (
                        <tr>
                          <td colSpan={6} className="bg-gray-50 px-6 py-4">
                            <div className="border-t border-gray-200 pt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="text-sm font-medium text-gray-900 mb-2">
                                  Order Items
                                </h4>
                                <div className="bg-white rounded-md shadow overflow-hidden">
                                  <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                      <tr>
                                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                                          Product
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                                          Price
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                                          Quantity
                                        </th>
                                        <th className="px-4 py-2 text-right text-xs font-medium text-gray-500">
                                          Total
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                      {order.items.map((item) => (
                                        <tr key={item.productId}>
                                          <td className="px-4 py-2 text-sm text-gray-900">
                                            {item.name}
                                            <div className="text-xs text-gray-500">
                                              Size: {item.variantSize}, Color:{" "}
                                              {item.variantColor === "default"
                                                ? "Default"
                                                : item.variantColor}
                                            </div>
                                          </td>
                                          <td className="px-4 py-2 text-sm text-gray-900 text-right">
                                            $
                                            {(
                                              item.salePrice || item.price
                                            ).toFixed(2)}
                                          </td>
                                          <td className="px-4 py-2 text-sm text-gray-900 text-right">
                                            {item.quantity}
                                          </td>
                                          <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                                            $
                                            {(
                                              (item.salePrice || item.price) *
                                              item.quantity
                                            ).toFixed(2)}
                                          </td>
                                        </tr>
                                      ))}
                                    </tbody>
                                    <tfoot className="bg-gray-50">
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="px-4 py-2 text-sm font-medium text-gray-900 text-right"
                                        >
                                          Subtotal
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                                          ${order.subtotal.toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="px-4 py-2 text-sm font-medium text-gray-900 text-right"
                                        >
                                          Tax
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                                          ${order.tax.toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="px-4 py-2 text-sm font-medium text-gray-900 text-right"
                                        >
                                          Shipping
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900 text-right font-medium">
                                          ${order.shipping.toFixed(2)}
                                        </td>
                                      </tr>
                                      <tr>
                                        <td
                                          colSpan={3}
                                          className="px-4 py-2 text-sm font-bold text-gray-900 text-right"
                                        >
                                          Total
                                        </td>
                                        <td className="px-4 py-2 text-sm text-gray-900 text-right font-bold">
                                          ${order.total.toFixed(2)}
                                        </td>
                                      </tr>
                                    </tfoot>
                                  </table>
                                </div>
                              </div>
                              <div>
                                <div className="mb-4">
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Shipping Address
                                  </h4>
                                  <div className="bg-white p-3 rounded-md shadow text-sm">
                                    <p className="text-gray-900 font-medium">
                                      {order.customerName}
                                    </p>
                                    <p className="text-gray-500">
                                      {order.shippingAddress.street}
                                    </p>
                                    <p className="text-gray-500">
                                      {order.shippingAddress.city},{" "}
                                      {order.shippingAddress.state}{" "}
                                      {order.shippingAddress.zip}
                                    </p>
                                    <p className="text-gray-500">
                                      {order.shippingAddress.country}
                                    </p>
                                  </div>
                                </div>
                                <div>
                                  <h4 className="text-sm font-medium text-gray-900 mb-2">
                                    Payment Information
                                  </h4>
                                  <div className="bg-white p-3 rounded-md shadow text-sm">
                                    <p className="text-gray-900">
                                      <span className="font-medium">
                                        Method:
                                      </span>{" "}
                                      {order.paymentMethod}
                                    </p>
                                    <p className="text-gray-900">
                                      <span className="font-medium">
                                        Status:
                                      </span>{" "}
                                      Paid
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
