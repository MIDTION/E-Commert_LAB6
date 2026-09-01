/**
 * API utility for making requests to the Core API
 * Currently mocked until the backend is fully implemented.
 */

// Define types based on ARCHITECTURE.md
export interface User {
  id: string;
  username: string;
  credit_balance: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  game: string;
  image: string;
}

export interface InventoryItem {
  id: string;
  orderId: string;
  game: string;
  username: string;
  password?: string; // might be hidden based on status
  status: 'ready' | 'checking' | 'failed';
  purchaseDate: string;
  image: string;
}

// Simulates network delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  /**
   * Fetch user data from token (simulated)
   */
  async getUser(): Promise<User> {
    await delay(500);
    return {
      id: 'u-1',
      username: 'student66000001',
      credit_balance: 1500,
    };
  },

  /**
   * Fetch available products in store
   */
  async getProducts(): Promise<Product[]> {
    await delay(800);
    // Replace with actual fetch('/api/shop/products') later
    return []; // We handle this directly in the UI for now, but this is how it would look
  },

  /**
   * Fetch user's inventory
   */
  async getInventory(): Promise<InventoryItem[]> {
    await delay(1000);
    // Replace with actual fetch('/api/shop/inventory') later
    return [];
  },

  /**
   * Buy a product
   */
  async buyProduct(productId: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    await delay(1500);
    // Replace with actual POST fetch('/api/shop/orders') later
    return { success: true, orderId: 'ORD-' + Math.floor(Math.random() * 10000) };
  }
};
