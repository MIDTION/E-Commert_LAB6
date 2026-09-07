'use client';

import { useState, useEffect } from 'react';
import { Shield, Plus, Trash2, XCircle, CheckCircle, Clock } from 'lucide-react';
import { api, Product } from '@/lib/api';

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<'products' | 'orders'>('products');
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  // New product form
  const [newProduct, setNewProduct] = useState({
    name: '', description: '', price: 0, stock: 10, category: 'pc', image: ''
  });

  useEffect(() => {
    api.getUser().then(u => {
      setUser(u);
      if (u.username?.toLowerCase().startsWith('admin')) {
        loadData();
      } else {
        setIsLoading(false);
      }
    });
  }, [activeTab]);

  const loadData = async () => {
    setIsLoading(true);
    if (activeTab === 'products') {
      const data = await api.getProducts();
      setProducts(data);
    } else {
      const data = await api.getAllOrders();
      setOrders(data);
    }
    setIsLoading(false);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await api.addProduct(newProduct);
    if (res.success) {
      alert('Product added successfully!');
      setNewProduct({ name: '', description: '', price: 0, stock: 10, category: 'pc', image: '' });
      loadData();
    } else {
      alert(res.error || 'Failed to add product');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    const res = await api.deleteProduct(id);
    if (res.success) {
      alert('Product deleted');
      loadData();
    } else {
      alert(res.error || 'Failed to delete product');
    }
  };

  const handleCancelOrder = async (id: string) => {
    if (!confirm('Are you sure you want to cancel this order? Credit will be refunded and stock returned.')) return;
    const res = await api.updateOrderStatus(id, 'cancelled');
    if (res.success) {
      alert('Order cancelled successfully');
      loadData();
    } else {
      alert(res.error || 'Failed to cancel order');
    }
  };

  if (!isLoading && user && !user.username?.toLowerCase().startsWith('admin')) {
    return (
      <div className="text-center py-24 text-slate-500">
        <h2 className="text-2xl font-bold text-red-500">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <div className="flex items-center gap-4 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30 text-white">
          <Shield className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-500 font-medium mt-1">Manage products and orders</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 mb-8 border-b border-slate-200">
        <button
          onClick={() => setActiveTab('products')}
          className={`pb-4 px-2 font-bold text-lg transition-colors border-b-2 ${
            activeTab === 'products' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Products Management
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-4 px-2 font-bold text-lg transition-colors border-b-2 ${
            activeTab === 'orders' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-slate-500 hover:text-slate-700'
          }`}
        >
          Orders Management
        </button>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-slate-500">Loading...</div>
      ) : activeTab === 'products' ? (
        <div className="space-y-8">
          {/* Add Product Form */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Plus className="w-5 h-5 text-green-500"/> Add New Product</h2>
            <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Product Name</label>
                <input required type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Image URL</label>
                <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Price (THB)</label>
                <input required type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Stock</label>
                <input required type="number" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.stock} onChange={e => setNewProduct({...newProduct, stock: Number(e.target.value)})} />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1">Category</label>
                <select className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  <option value="pc">PC</option>
                  <option value="mobile">Mobile</option>
                  <option value="console">Console</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-600 mb-1">Description</label>
                <textarea className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="px-6 py-3 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-bold">Add Product</button>
              </div>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4">Existing Products</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="p-3">ID</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Category</th>
                    <th className="p-3">Price</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-3">{p.id}</td>
                      <td className="p-3 font-medium text-slate-800">{p.name}</td>
                      <td className="p-3">{p.category}</td>
                      <td className="p-3">{p.price} ฿</td>
                      <td className="p-3 text-right">
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 className="w-5 h-5"/></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
            <h2 className="text-xl font-bold mb-4">All Orders</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-100 text-slate-500">
                    <th className="p-3">Order ID</th>
                    <th className="p-3">User ID</th>
                    <th className="p-3">Total</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-b border-slate-50 hover:bg-slate-50">
                      <td className="p-3 font-medium">ORD-{o.id}</td>
                      <td className="p-3">User {o.user_id}</td>
                      <td className="p-3">{o.total_price} ฿</td>
                      <td className="p-3">
                        {o.status === 'completed' && <span className="inline-flex items-center gap-1 text-green-600 bg-green-50 px-2 py-1 rounded-md text-xs font-bold"><CheckCircle className="w-3 h-3"/> Completed</span>}
                        {o.status === 'cancelled' && <span className="inline-flex items-center gap-1 text-red-600 bg-red-50 px-2 py-1 rounded-md text-xs font-bold"><XCircle className="w-3 h-3"/> Cancelled</span>}
                        {o.status === 'pending' && <span className="inline-flex items-center gap-1 text-amber-600 bg-amber-50 px-2 py-1 rounded-md text-xs font-bold"><Clock className="w-3 h-3"/> Pending</span>}
                      </td>
                      <td className="p-3 text-right">
                        {o.status !== 'cancelled' && (
                          <button onClick={() => handleCancelOrder(o.id)} className="px-3 py-1.5 text-xs font-bold bg-red-100 text-red-600 hover:bg-red-200 rounded-lg transition-colors">
                            Cancel Order
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
