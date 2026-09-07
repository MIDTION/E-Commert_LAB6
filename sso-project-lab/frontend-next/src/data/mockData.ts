import { Product, InventoryItem, User } from '../types';

export const mockUser: User = {
  username: 'student66000001',
  credit_balance: 1500,
};

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'prod-1',
    name: 'ROBLOX',
    description: 'Robux & Premium Memberships. Get the best value for your Roblox account.',
    price: 300,
    game: 'ROBLOX',
    category: 'pc',
    image: 'https://images.rbxcdn.com/5348266ea6c5e67b19d6a814cbbb70f6.jpg'
  },
  {
    id: 'prod-2',
    name: 'ROV (Arena of Valor)',
    description: 'Coupons & Exclusive Skins. Top up your RoV account instantly.',
    price: 150,
    game: 'ROV',
    category: 'mobile',
    image: 'https://cdna.artstation.com/p/assets/covers/images/066/463/648/large/rare-reversee-official-rare-reversee-official-3.jpg?1692953920'
  },
  {
    id: 'prod-3',
    name: 'Valorant',
    description: 'Valorant Points (VP) for Premium Skins & Battlepass.',
    price: 350,
    game: 'Valorant',
    category: 'pc',
    image: 'https://img.youtube.com/vi/e_E9W2vsRbQ/maxresdefault.jpg'
  },
  {
    id: 'prod-4',
    name: 'Minecraft Java Edition',
    description: 'Official Minecraft Java Edition Account. Full access and instantly delivered.',
    price: 850,
    game: 'Minecraft',
    category: 'pc',
    image: 'https://img.youtube.com/vi/MmB9b5njVbA/maxresdefault.jpg'
  },
  {
    id: 'prod-5',
    name: 'Genshin Impact',
    description: 'Genesis Crystals & Blessing of the Welkin Moon.',
    price: 175,
    game: 'Genshin Impact',
    category: 'mobile',
    image: 'https://img.youtube.com/vi/TAlKhARUcoY/maxresdefault.jpg'
  },
  {
    id: 'prod-6',
    name: 'Wuthering Waves',
    description: 'Lunites & Monthly Pass for Wuthering Waves global servers.',
    price: 175,
    game: 'Wuthering Waves',
    category: 'mobile',
    image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/12/mixcollage-25-dec-2024-03-54-am-8390.jpg'
  },
  {
    id: 'prod-7',
    name: 'FREEFIRE',
    description: 'Diamonds & Weekly Passes. Fast top-up using Player ID.',
    price: 100,
    game: 'FREEFIRE',
    category: 'mobile',
    image: 'https://tse3.mm.bing.net/th/id/OIP.QQnnvDI6sxfKEYq4BSd3BwHaEK?r=0&rs=1&pid=ImgDetMain&o=7&rm=3'
  },
  {
    id: 'prod-8',
    name: 'PUBG Mobile',
    description: 'Unknown Cash (UC) & Royale Pass for PUBG Mobile.',
    price: 350,
    game: 'PUBG',
    category: 'mobile',
    image: 'https://upload.wikimedia.org/wikipedia/en/4/44/PlayerUnknown%27s_Battlegrounds_Mobile.webp'
  }
];

export const MOCK_INVENTORY: InventoryItem[] = [
  {
    id: 'inv-1',
    orderId: 'ORD-5481',
    game: 'Valorant',
    username: 'player_one_99',
    password: 'SecurePassword123!',
    status: 'ready', // ready, checking, failed
    purchaseDate: '2026-08-27T10:30:00Z',
    image: 'https://img.youtube.com/vi/e_E9W2vsRbQ/maxresdefault.jpg'
  },
  {
    id: 'inv-2',
    orderId: 'ORD-5479',
    game: 'Minecraft',
    username: 'minecrafter_pro',
    password: 'AnotherPassword456',
    status: 'checking',
    purchaseDate: '2026-08-26T15:45:00Z',
    image: 'https://img.youtube.com/vi/MmB9b5njVbA/maxresdefault.jpg'
  },
  {
    id: 'inv-3',
    orderId: 'ORD-5401',
    game: 'Genshin Impact',
    username: 'traveler_777',
    password: 'OldPassword789',
    status: 'failed',
    purchaseDate: '2026-08-20T09:15:00Z',
    image: 'https://img.youtube.com/vi/TAlKhARUcoY/maxresdefault.jpg'
  }
];
