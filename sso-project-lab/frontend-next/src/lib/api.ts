/**
 * API utility for making requests to the Core API
 */

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
  category: 'mobile' | 'pc' | 'console' | 'app';
  image: string;
  description: string;
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

const API_BASE_URL = "http://localhost:8000/api";

function getCookie(name: string) {
  if (typeof document === 'undefined') return null;
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(';').shift();
  return null;
}

async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getCookie("sso_token");
  
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    if (response.status === 401) {
      if (typeof window !== "undefined") {
        document.cookie = "sso_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        window.location.href = "/auth/";
      }
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `API request failed with status ${response.status}`);
  }

  return response.json();
}

export const api = {
  /**
   * Fetch user data from token
   */
  async getUser(): Promise<User> {
    try {
      const data = await fetchWithAuth("/users/me");
      return {
        id: data.id.toString(),
        username: data.username,
        credit_balance: data.credit_balance || 0,
      };
    } catch (err) {
      console.error(err);
      return {
        id: 'u-1',
        username: 'student66000001',
        credit_balance: 1500,
      };
    }
  },

  /**
   * Fetch available products in store
   */
  async getProducts(): Promise<Product[]> {
    try {
      const data = await fetch(`${API_BASE_URL}/products/`);
      if (!data.ok) return [];
      const products = await data.json();
      return products.map((p: any) => ({
        id: p.id.toString(),
        name: p.name,
        price: Number(p.price),
        game: p.game || p.name,
        category: p.game_type === 'mobile' ? 'mobile' : 'pc',
        image: p.image || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop',
        description: p.description || "No description available"
      }));
    } catch (err) {
      return [];
    }
  },

  /**
   * Fetch user's inventory
   */
  async getInventory(): Promise<InventoryItem[]> {
    try {
      const data = await fetchWithAuth("/orders/my-orders");
      return data.map((order: any) => ({
        id: order.id.toString(),
        orderId: `ORD-${order.id}`,
        game: 'Product',
        username: 'auto-delivered',
        status: order.status === 'completed' ? 'ready' : (order.status === 'pending' ? 'checking' : 'failed'),
        purchaseDate: new Date().toISOString(),
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=500&auto=format&fit=crop'
      }));
    } catch (err) {
      return [];
    }
  },

  /**
   * Buy a product
   */
  async buyProduct(productId: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    try {
      const data = await fetchWithAuth("/orders/", {
        method: "POST",
        body: JSON.stringify({ items: [{ product_id: Number(productId), quantity: 1 }] })
      });
      return { success: true, orderId: `ORD-${data.id || Math.floor(Math.random() * 10000)}` };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to purchase product" };
    }
  },

  /**
   * Top up credits
   */
  async topup(amount: number): Promise<{ success: boolean; new_balance?: number; message?: string; error?: string }> {
    try {
      const data = await fetchWithAuth("/users/topup", {
        method: "POST",
        body: JSON.stringify({ amount }),
      });
      return { success: true, new_balance: data.new_balance, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to top up credit" };
    }
  },

  /**
   * Add a new product (Admin)
   */
  async addProduct(product: { name: string; description?: string; price: number; stock: number; category?: string; image?: string }): Promise<{ success: boolean; product?: any; error?: string }> {
    try {
      const data = await fetchWithAuth("/products/", {
        method: "POST",
        body: JSON.stringify(product),
      });
      return { success: true, product: data };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to add product" };
    }
  },

  /**
   * Delete a product (Admin)
   */
  async deleteProduct(productId: string | number): Promise<{ success: boolean; message?: string; error?: string }> {
    try {
      const data = await fetchWithAuth(`/products/${productId}`, {
        method: "DELETE",
      });
      return { success: true, message: data.message };
    } catch (err: any) {
      return { success: false, error: err.message || "Failed to delete product" };
    }
  }
};
