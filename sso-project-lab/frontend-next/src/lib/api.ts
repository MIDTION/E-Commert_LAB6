/**
 * API utility for making requests to the Core API
 */

export interface User {
  id: string | number;
  username: string;
  email?: string;
  role?: string;
  credit_balance?: number;
}

export interface Product {
  id: string | number;
  name: string;
  description?: string;
  price: number;
  stock?: number;
  game?: string;
  game_type?: string;
  stock_status?: string;
  image?: string;
}

export interface Order {
  id: string | number;
  user_id?: string | number;
  status: string;
  total_price: number;
  total_amount?: number;
}

export interface InventoryItem {
  id: string;
  orderId: string;
  game: string;
  username: string;
  password?: string;
  status: 'ready' | 'checking' | 'failed';
  purchaseDate: string;
  image: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Helper for making API calls with JWT token
async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = typeof window !== "undefined" ? localStorage.getItem("access_token") : null;
  
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
        localStorage.removeItem("access_token");
        window.location.href = "/auth";
      }
    }
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || `API request failed with status ${response.status}`);
  }

  return response.json();
}

// Authentication
export async function loginAPI(username: string, password: string) {
  const response = await fetch(`http://localhost/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Login failed");
  }

  const data = await response.json();
  if (data.access_token) {
    if (typeof window !== "undefined") {
      localStorage.setItem("access_token", data.access_token);
    }
  }
  return data;
}

export async function registerAPI(data: { username: string; email: string; password_hash?: string; password?: string }) {
  const payload = {
    username: data.username,
    email: data.email,
    password: data.password || data.password_hash,
  };
  
  const response = await fetch(`${API_BASE_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(errorData?.detail || "Registration failed");
  }

  return response.json();
}

export function logoutAPI() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("access_token");
  }
}

// User Profile
export async function getUserProfileAPI(): Promise<User> {
  return fetchWithAuth("/users/me");
}

// Products
export async function getProductsAPI(): Promise<Product[]> {
  const response = await fetch(`${API_BASE_URL}/products/`);
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

// Orders
export async function getMyOrdersAPI(): Promise<Order[]> {
  return fetchWithAuth("/orders/my-orders");
}

export async function createOrderAPI(items: { product_id: number; quantity: number }[]) {
  return fetchWithAuth("/orders/", {
    method: "POST",
    body: JSON.stringify({ items }),
  });
}

// Simulates network delay for mock api
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const api = {
  async getUser(): Promise<User> {
    await delay(500);
    return {
      id: 'u-1',
      username: 'student66000001',
      credit_balance: 1500,
    };
  },

  async getProducts(): Promise<Product[]> {
    await delay(800);
    return []; 
  },

  async getInventory(): Promise<InventoryItem[]> {
    await delay(1000);
    return [];
  },

  async buyProduct(productId: string): Promise<{ success: boolean; orderId?: string; error?: string }> {
    await delay(1500);
    return { success: true, orderId: 'ORD-' + Math.floor(Math.random() * 10000) };
  }
};
