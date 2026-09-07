export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  game: string;
  category: 'mobile' | 'pc' | 'console' | 'app';
  image: string;
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

export interface User {
  username: string;
  credit_balance: number;
}
