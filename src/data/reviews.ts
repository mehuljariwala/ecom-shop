import { Review } from "../components/product/ReviewSection";

// Generate a date string for a given number of days ago
const daysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
};

// Mock reviews data
export const reviews: Record<string, Review[]> = {
  // Product ID: "1" - Floral Summer Dress
  "1": [
    {
      id: "1-1",
      user: {
        name: "Emily Johnson",
        image: "https://randomuser.me/api/portraits/women/12.jpg",
      },
      rating: 5,
      title: "Beautiful summer dress!",
      comment:
        "This dress is absolutely gorgeous! The fabric is lightweight and perfect for hot summer days. The floral pattern is vibrant and exactly as pictured. I've received so many compliments already. True to size and very flattering.",
      date: daysAgo(2),
      helpful: 24,
      verified: true,
    },
    {
      id: "1-2",
      user: {
        name: "Sophie Williams",
      },
      rating: 4,
      title: "Pretty, but slightly different color",
      comment:
        "The dress is beautiful and comfortable. The only reason I'm giving 4 stars instead of 5 is because the colors are slightly different from what's shown online. The actual dress has more pink tones than the picture suggests. Still very pretty though!",
      date: daysAgo(7),
      helpful: 15,
      verified: true,
    },
    {
      id: "1-3",
      user: {
        name: "Olivia Davis",
        image: "https://randomuser.me/api/portraits/women/28.jpg",
      },
      rating: 5,
      title: "My new favorite dress",
      comment:
        "I LOVE this dress! The fit is perfect and it's so versatile - I can dress it up with heels or wear it casually with sandals. The material is good quality and doesn't wrinkle easily. Definitely buying in another color!",
      date: daysAgo(14),
      helpful: 32,
      verified: true,
    },
    {
      id: "1-4",
      user: {
        name: "Mia Thompson",
      },
      rating: 3,
      title: "Nice but runs small",
      comment:
        "The dress is pretty but it runs about a size smaller than expected. I usually wear a medium but should have ordered a large. The material is nice though, and the pattern is beautiful.",
      date: daysAgo(30),
      helpful: 28,
      verified: true,
    },
  ],

  // Product ID: "2" - Casual Linen Blouse
  "2": [
    {
      id: "2-1",
      user: {
        name: "Hannah Clark",
        image: "https://randomuser.me/api/portraits/women/45.jpg",
      },
      rating: 5,
      title: "Perfect linen blouse",
      comment:
        "This blouse is exactly what I was looking for! The linen is high quality and the fit is relaxed but still flattering. It's become my go-to for both work and casual outings. Washes well too!",
      date: daysAgo(5),
      helpful: 19,
      verified: true,
    },
    {
      id: "2-2",
      user: {
        name: "Laura Wilson",
      },
      rating: 4,
      title: "Great quality but wrinkles easily",
      comment:
        "I love the style and quality of this blouse. The only downside is that, like most linen, it wrinkles very easily. But that's to be expected with linen and it still looks elegant even with some natural wrinkles.",
      date: daysAgo(12),
      helpful: 14,
      verified: true,
    },
  ],

  // Product ID: "4" - Statement Earrings
  "4": [
    {
      id: "4-1",
      user: {
        name: "Jessica Martinez",
      },
      rating: 5,
      title: "Stunning earrings!",
      comment:
        "These earrings are even more beautiful in person! They're the perfect statement piece - eye-catching but not too heavy. I've worn them to several events and received compliments every time.",
      date: daysAgo(3),
      helpful: 9,
      verified: true,
    },
    {
      id: "4-2",
      user: {
        name: "Ava Robinson",
        image: "https://randomuser.me/api/portraits/women/32.jpg",
      },
      rating: 5,
      title: "Lightweight and gorgeous",
      comment:
        "I was worried these might be too heavy, but they're surprisingly lightweight and comfortable to wear all day. The craftsmanship is excellent, and they look much more expensive than they actually are. Very happy with this purchase!",
      date: daysAgo(18),
      helpful: 21,
      verified: true,
    },
    {
      id: "4-3",
      user: {
        name: "Zoe Parker",
      },
      rating: 4,
      title: "Beautiful but one minor issue",
      comment:
        "The earrings are beautiful and well-made. I'm giving 4 stars because one of the hooks was slightly bent when I received them, but I was able to bend it back into shape. Otherwise, they're perfect and really elevate any outfit.",
      date: daysAgo(25),
      helpful: 7,
      verified: true,
    },
  ],
};

// Function to get reviews for a product
export const getProductReviews = (productId: string): Review[] => {
  return reviews[productId] || [];
};

// Function to get average rating for a product
export const getProductAverageRating = (productId: string): number => {
  const productReviews = getProductReviews(productId);
  if (productReviews.length === 0) return 0;

  const sum = productReviews.reduce(
    (total, review) => total + review.rating,
    0
  );
  return sum / productReviews.length;
};
