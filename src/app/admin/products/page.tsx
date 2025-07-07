"use client";

import { useState, useEffect } from "react";
import {
  PlusIcon,
  PencilIcon,
  TrashIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { products, Product } from "../../../data/products";

// Extended product interface with admin-specific properties
interface AdminProduct extends Product {
  inStock?: boolean;
}

const ProductsPage = () => {
  const [productList, setProductList] = useState<AdminProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<AdminProduct[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<AdminProduct | null>(
    null
  );
  const [editMode, setEditMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    slug: "",
    price: 0,
    salePrice: 0,
    image: "",
    colors: [] as string[],
    isNew: false,
    isSale: false,
    categories: [] as string[],
    inStock: true,
  });

  // Load products
  useEffect(() => {
    setProductList(products);
    setFilteredProducts(products);
  }, []);

  // Filter products based on search term and category
  useEffect(() => {
    let result = [...productList];

    if (searchTerm) {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedCategory !== "all") {
      result = result.filter((product) =>
        product.categories?.includes(selectedCategory)
      );
    }

    setFilteredProducts(result);
  }, [searchTerm, selectedCategory, productList]);

  // Get unique categories from products
  const categories = Array.from(
    new Set(productList.flatMap((product) => product.categories || []))
  ).sort();

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
    } else if (name === "categories" || name === "colors") {
      // Handle arrays
      const values = value.split(",").map((item) => item.trim());
      setFormData((prev) => ({ ...prev, [name]: values }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Open modal for adding a new product
  const handleAddNew = () => {
    setCurrentProduct(null);
    setEditMode(false);
    setFormData({
      id: String(productList.length + 1),
      name: "",
      slug: "",
      price: 0,
      salePrice: 0,
      image: "",
      colors: [],
      isNew: false,
      isSale: false,
      categories: [],
      inStock: true,
    });
    setIsModalOpen(true);
  };

  // Open modal for editing an existing product
  const handleEdit = (product: Product) => {
    setCurrentProduct(product);
    setEditMode(true);
    setFormData({
      ...product,
      salePrice: product.salePrice || 0,
      colors: product.colors || [],
      categories: product.categories || [],
      inStock: true, // Assuming all products are in stock by default
    });
    setIsModalOpen(true);
  };

  // Handle product deletion
  const handleDelete = (productId: string) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = productList.filter((p) => p.id !== productId);
      setProductList(updatedProducts);
    }
  };

  // Toggle stock status
  const toggleStockStatus = (productId: string) => {
    const updatedProducts = productList.map((p) => {
      if (p.id === productId) {
        return { ...p, inStock: !p.inStock };
      }
      return p;
    });
    setProductList(updatedProducts);
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Generate slug if not provided
    const slug =
      formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-");

    const newProduct = {
      ...formData,
      slug,
      price: Number(formData.price),
      salePrice: formData.isSale ? Number(formData.salePrice) : undefined,
    };

    if (editMode && currentProduct) {
      // Update existing product
      const updatedProducts = productList.map((p) =>
        p.id === currentProduct.id ? newProduct : p
      );
      setProductList(updatedProducts);
    } else {
      // Add new product
      setProductList([...productList, newProduct]);
    }

    setIsModalOpen(false);
  };

  return (
    <div className="px-1">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your product catalog, update prices, and control inventory.
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <button
            type="button"
            onClick={handleAddNew}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 sm:w-auto"
          >
            <PlusIcon className="h-4 w-4 mr-2" />
            Add Product
          </button>
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
            placeholder="Search products..."
          />
        </div>

        <div className="max-w-xs">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() +
                  category.slice(1).replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="mt-6 flex flex-col">
        <div className="-my-2 overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Stock
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded bg-gray-100 overflow-hidden">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={product.image}
                              alt={product.name}
                              className="h-10 w-10 object-cover"
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {product.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              ID: {product.id}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {product.salePrice ? (
                          <div>
                            <span className="text-sm text-primary-600 font-medium">
                              ${product.salePrice.toFixed(2)}
                            </span>
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-900">
                            ${product.price.toFixed(2)}
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          {product.isNew && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              New
                            </span>
                          )}
                          {product.isSale && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Sale
                            </span>
                          )}
                          {!product.isNew && !product.isSale && (
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                              Regular
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {product.categories?.map((category, index) => (
                            <span key={category} className="inline-block">
                              {category.replace(/-/g, " ")}
                              {index < (product.categories?.length || 0) - 1
                                ? ", "
                                : ""}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => toggleStockStatus(product.id)}
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            product.inStock !== false
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-red-100 text-red-800 hover:bg-red-200"
                          }`}
                        >
                          {product.inStock !== false
                            ? "In Stock"
                            : "Out of Stock"}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleEdit(product)}
                            className="text-primary-600 hover:text-primary-900 bg-white rounded-full p-1 hover:bg-primary-50"
                          >
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
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
                      {editMode ? "Edit Product" : "Add New Product"}
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
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        id="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="slug"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Slug{" "}
                        <span className="text-xs text-gray-500">
                          (Optional, will be generated from name)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="slug"
                        id="slug"
                        value={formData.slug}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="price"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Price ($)
                        </label>
                        <input
                          type="number"
                          name="price"
                          id="price"
                          min="0"
                          step="0.01"
                          value={formData.price}
                          onChange={handleInputChange}
                          required
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                        />
                      </div>

                      <div>
                        <label
                          htmlFor="salePrice"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Sale Price ($){" "}
                          <span className="text-xs text-gray-500">
                            (if on sale)
                          </span>
                        </label>
                        <input
                          type="number"
                          name="salePrice"
                          id="salePrice"
                          min="0"
                          step="0.01"
                          value={formData.salePrice}
                          onChange={handleInputChange}
                          disabled={!formData.isSale}
                          className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm disabled:bg-gray-100 disabled:text-gray-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="image"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Image URL
                      </label>
                      <input
                        type="text"
                        name="image"
                        id="image"
                        value={formData.image}
                        onChange={handleInputChange}
                        required
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="categories"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Categories{" "}
                        <span className="text-xs text-gray-500">
                          (comma separated)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="categories"
                        id="categories"
                        value={formData.categories.join(", ")}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="colors"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Colors{" "}
                        <span className="text-xs text-gray-500">
                          (comma separated hex values)
                        </span>
                      </label>
                      <input
                        type="text"
                        name="colors"
                        id="colors"
                        value={formData.colors.join(", ")}
                        onChange={handleInputChange}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                      />
                      {formData.colors.length > 0 && (
                        <div className="mt-2 flex space-x-2">
                          {formData.colors.map((color) => (
                            <div
                              key={color}
                              className="w-6 h-6 rounded-full border border-gray-200"
                              style={{ backgroundColor: color }}
                            ></div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          id="isNew"
                          name="isNew"
                          type="checkbox"
                          checked={formData.isNew}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isNew"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          Mark as New
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="isSale"
                          name="isSale"
                          type="checkbox"
                          checked={formData.isSale}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="isSale"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          On Sale
                        </label>
                      </div>

                      <div className="flex items-center">
                        <input
                          id="inStock"
                          name="inStock"
                          type="checkbox"
                          checked={formData.inStock}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="inStock"
                          className="ml-2 block text-sm text-gray-700"
                        >
                          In Stock
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    {editMode ? "Update Product" : "Add Product"}
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

export default ProductsPage;
