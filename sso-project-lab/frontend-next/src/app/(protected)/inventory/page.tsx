'use client';

import { useState, useEffect } from 'react';
import { PackageOpen } from 'lucide-react';
import InventoryItem from '@/components/inventory/InventoryItem';
import { MOCK_INVENTORY } from '@/data/mockData';
import { api } from '@/lib/api';

export default function InventoryPage() {
  const [items, setItems] = useState<any[]>(MOCK_INVENTORY);

  useEffect(() => {
    async function fetchInventory() {
      const data = await api.getInventory();
      if (data && data.length > 0) {
        setItems(data);
      }
    }
    fetchInventory();
  }, []);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 mb-2 flex items-center gap-3">
            <PackageOpen className="w-10 h-10 text-orange-500" />
            คลังเก็บของของฉัน
          </h1>
          <p className="text-slate-500 text-lg font-medium">
            จัดการบัญชีเกมและรหัสผ่านที่คุณซื้อได้ที่นี่
          </p>
        </div>
      </div>

      {/* Inventory List */}
      <div className="flex flex-col gap-4">
        {items.map((item) => (
          <InventoryItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
