"use client";

import { useState } from "react";
import {
  ChartBarIcon,
  CurrencyDollarIcon,
  ShoppingCartIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { products } from "../../data/products";

// Placeholder data - in a real app this would come from an API/database
interface DashboardData {
  totalSales: number;
  totalIncome: number;
  ordersPaid: number;
  totalVisitors: number;
  recentOrders: Array<{
    id: string;
    customer: string;
    date: string;
    amount: number;
    status: string;
  }>;
  topCountries: Array<{
    name: string;
    sales: number;
  }>;
}

const dashboardData: DashboardData = {
  totalSales: 284,
  totalIncome: 24680,
  ordersPaid: 237,
  totalVisitors: 1843,
  recentOrders: [
    {
      id: "ORD-1234",
      customer: "John Doe",
      date: "2023-06-22",
      amount: 159.99,
      status: "Delivered",
    },
    {
      id: "ORD-1235",
      customer: "Jane Smith",
      date: "2023-06-22",
      amount: 89.99,
      status: "Processing",
    },
    {
      id: "ORD-1236",
      customer: "Alex Johnson",
      date: "2023-06-21",
      amount: 124.5,
      status: "Shipped",
    },
    {
      id: "ORD-1237",
      customer: "Sarah Williams",
      date: "2023-06-20",
      amount: 249.99,
      status: "Delivered",
    },
    {
      id: "ORD-1238",
      customer: "Robert Brown",
      date: "2023-06-19",
      amount: 79.99,
      status: "Delivered",
    },
  ],
  topCountries: [
    { name: "United States", sales: 142 },
    { name: "United Kingdom", sales: 47 },
    { name: "Canada", sales: 38 },
    { name: "Australia", sales: 29 },
    { name: "Germany", sales: 21 },
  ],
};

// Get top 5 products - in a real app this would be based on sales data
const topProducts = products.slice(0, 5).map((product) => ({
  ...product,
  sales: Math.floor(Math.random() * 50) + 10, // Random sales number for demo
}));

const DashboardCard = ({
  title,
  value,
  icon: Icon,
  change,
}: {
  title: string;
  value: string | number;
  icon: React.ElementType;
  change?: { value: number; positive: boolean };
}) => (
  <div className="bg-white rounded-lg shadow p-5">
    <div className="flex justify-between">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h3 className="text-2xl font-bold mt-1">{value}</h3>
        {change && (
          <div
            className={`flex items-center mt-2 text-sm ${
              change.positive ? "text-green-500" : "text-red-500"
            }`}
          >
            <span className="mr-1">
              {change.positive ? "+" : "-"}
              {Math.abs(change.value)}%
            </span>
            <span>vs last month</span>
          </div>
        )}
      </div>
      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary-50 text-primary-600">
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </div>
);

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState("month");

  return (
    <div>
      <div className="flex flex-wrap md:flex-nowrap justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
        <div className="bg-white rounded-lg shadow flex mt-4 md:mt-0">
          <button
            onClick={() => setTimeRange("week")}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === "week"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            } rounded-l-lg`}
          >
            Week
          </button>
          <button
            onClick={() => setTimeRange("month")}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === "month"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setTimeRange("year")}
            className={`px-4 py-2 text-sm font-medium ${
              timeRange === "year"
                ? "bg-primary-600 text-white"
                : "text-gray-500 hover:text-gray-700"
            } rounded-r-lg`}
          >
            Year
          </button>
        </div>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <DashboardCard
          title="Total Sales"
          value={dashboardData.totalSales}
          icon={ChartBarIcon}
          change={{ value: 12.3, positive: true }}
        />
        <DashboardCard
          title="Total Income"
          value={`$${dashboardData.totalIncome.toLocaleString()}`}
          icon={CurrencyDollarIcon}
          change={{ value: 8.1, positive: true }}
        />
        <DashboardCard
          title="Orders Paid"
          value={dashboardData.ordersPaid}
          icon={ShoppingCartIcon}
          change={{ value: 4.5, positive: true }}
        />
        <DashboardCard
          title="Total Visitors"
          value={dashboardData.totalVisitors.toLocaleString()}
          icon={UserGroupIcon}
          change={{ value: 2.8, positive: false }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent Orders */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Recent Orders
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dashboardData.recentOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-3 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.customer}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      {order.date}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500">
                      ${order.amount.toFixed(2)}
                    </td>
                    <td className="px-3 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-800"
                            : order.status === "Processing"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-4 text-right">
            <a
              href="/admin/orders"
              className="text-primary-600 hover:underline text-sm font-medium"
            >
              View all orders
            </a>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Top Products
          </h2>
          <div className="space-y-4">
            {topProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-lg"
              >
                <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {product.name}
                  </p>
                  <p className="text-sm text-gray-500">
                    {product.isSale && product.salePrice
                      ? `$${product.salePrice.toFixed(2)}`
                      : `$${product.price.toFixed(2)}`}
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product.sales} sold
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right">
            <a
              href="/admin/products"
              className="text-primary-600 hover:underline text-sm font-medium"
            >
              View all products
            </a>
          </div>
        </div>
      </div>

      {/* Top Countries */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-medium text-gray-800 mb-4">
          Top Countries by Sales
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {dashboardData.topCountries.map((country, index) => (
            <div
              key={country.name}
              className="p-4 rounded-lg border border-gray-200 hover:border-primary-500 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-500">
                  #{index + 1}
                </span>
                <span className="text-xs font-medium text-gray-400">
                  {country.sales} orders
                </span>
              </div>
              <p className="text-gray-900 font-medium">{country.name}</p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-primary-600 h-2 rounded-full"
                  style={{
                    width: `${(country.sales / dashboardData.topCountries[0].sales) * 100}%`,
                  }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
