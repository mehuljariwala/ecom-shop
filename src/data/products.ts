import { Product as BaseProduct } from "../components/product/ProductGrid";

// Extend the Product interface to include categories
export interface Product extends BaseProduct {
  categories?: string[];
}

export const products: Product[] = [
  {
    id: "1",
    name: "Floral Summer Dress",
    slug: "floral-summer-dress",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1623609163859-ca93c646ccd9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["#FADBC0", "#B3E5FC", "#F8BBD0"],
    isNew: true,
    categories: ["dresses", "new-arrivals", "summer-collection"],
  },
  {
    id: "2",
    name: "Casual Linen Blouse",
    slug: "casual-linen-blouse",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1598554747436-c9293d6a588f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["#FFFFFF", "#F5F5DC", "#000000"],
    categories: ["tops"],
  },
  {
    id: "3",
    name: "Bohemian Maxi Dress",
    slug: "bohemian-maxi-dress",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1618375531912-867984bdfd87?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["#D1C4E9", "#FFD8B2"],
    categories: ["dresses"],
  },
  {
    id: "4",
    name: "Statement Earrings",
    slug: "statement-earrings",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1615655067369-1a8e71e50194?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    categories: ["accessories"],
  },
  {
    id: "5",
    name: "Summer Straw Hat",
    slug: "summer-straw-hat",
    price: 34.99,
    salePrice: 24.99,
    image:
      "https://images.unsplash.com/photo-1590159983012-d3d196901dd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    isSale: true,
    categories: ["accessories", "sale"],
  },
  {
    id: "6",
    name: "Designer Handbag",
    slug: "designer-handbag",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    isNew: true,
    categories: ["accessories", "new-arrivals"],
  },
  {
    id: "7",
    name: "Silk Scarf",
    slug: "silk-scarf",
    price: 45.99,
    salePrice: 39.99,
    image:
      "https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    isSale: true,
    categories: ["accessories", "sale"],
  },
  {
    id: "8",
    name: "Elegant Jumpsuit",
    slug: "elegant-jumpsuit",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1600950207944-0d63e8edbc3f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    isNew: true,
    categories: ["dresses", "new-arrivals"],
  },
  {
    id: "9",
    name: "Cotton T-Shirt",
    slug: "cotton-t-shirt",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    colors: ["#FFFFFF", "#000000", "#C9A9A6"],
    categories: ["tops"],
  },
  {
    id: "10",
    name: "Denim Jeans",
    slug: "denim-jeans",
    price: 69.99,
    salePrice: 49.99,
    image:
      "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    isSale: true,
    categories: ["bottoms", "sale"],
  },
  {
    id: "11",
    name: "Pearl Necklace",
    slug: "pearl-necklace",
    price: 59.99,
    image:
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    categories: ["accessories"],
  },
  {
    id: "12",
    name: "Summer Shorts",
    slug: "summer-shorts",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80",
    categories: ["bottoms", "summer-collection"],
  },
];

// Function to get products by category
export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(
    (product) => product.categories && product.categories.includes(category)
  );
};

// Function to get products by slug
export const getProductBySlug = (slug: string): Product | undefined => {
  return products.find((product) => product.slug === slug);
};

// Function to get all new arrivals
export const getNewArrivals = (): Product[] => {
  return products.filter((product) => product.isNew);
};

// Function to get all sale products
export const getSaleProducts = (): Product[] => {
  return products.filter((product) => product.isSale);
};

// Function to get best sellers (mock implementation - in a real app this would be based on sales data)
export const getBestSellers = (): Product[] => {
  return products.slice(0, 4); // Just return first 4 products as "best sellers"
};

// Function to get related products (products in the same category, excluding the current one)
export const getRelatedProducts = (currentSlug: string): Product[] => {
  const currentProduct = getProductBySlug(currentSlug);
  if (!currentProduct || !currentProduct.categories) return [];

  return products
    .filter(
      (product) =>
        product.slug !== currentSlug &&
        product.categories?.some((cat) =>
          currentProduct.categories?.includes(cat)
        )
    )
    .slice(0, 4); // Limit to 4 related products
};
