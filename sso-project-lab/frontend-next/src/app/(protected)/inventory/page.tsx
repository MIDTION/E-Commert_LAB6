'use client';

import { useState } from 'react';
import { PackageOpen, Copy, CheckCircle2, Clock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import Image from 'next/image';

// Mock inventory data
const MOCK_INVENTORY = [
  {
    id: 'inv-1',
    orderId: 'ORD-5481',
    game: 'Valorant',
    username: 'player_one_99',
    password: 'SecurePassword123!',
    status: 'ready', // ready, checking, failed
    purchaseDate: '2026-08-27T10:30:00Z',
    image: 'https://images.unsplash.com/photo-1629858547285-80f4f9f6e1f0?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'inv-2',
    orderId: 'ORD-5479',
    game: 'Minecraft',
    username: 'minecrafter_pro',
    password: 'AnotherPassword456',
    status: 'checking',
    purchaseDate: '2026-08-26T15:45:00Z',
    image: 'https://images.unsplash.com/photo-1607513746994-51f738a4c147?q=80&w=200&auto=format&fit=crop'
  },
  {
    id: 'inv-3',
    orderId: 'ORD-5401',
    game: 'Genshin Impact',
    username: 'traveler_777',
    password: 'OldPassword789',
    status: 'failed',
    purchaseDate: '2026-08-20T09:15:00Z',
    image: 'https://images.unsplash.com/photo-1662998782012-9c16223298a2?q=80&w=200&auto=format&fit=crop'
  }
];

export default function InventoryPage() {
  const [showPasswords, setShowPasswords] = useState<Record<string, boolean>>({});
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const togglePassword = (id: string) => {
    setShowPasswords(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(`${text}-${type}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ready':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready
          </span>
        );
      case 'checking':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Checking
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            Failed / Refunded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-5xl mx-auto">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 mb-2 flex items-center gap-3">
            <PackageOpen className="w-10 h-10 text-indigo-400" />
            My Inventory
          </h1>
          <p className="text-slate-400 text-lg">
            Manage your purchased game accounts and credentials.
          </p>
        </div>
      </div>

      {/* Inventory List */}
      <div className="flex flex-col gap-4">
        {MOCK_INVENTORY.map((item) => (
          <div 
            key={item.id}
            className="bg-slate-900/50 border border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/5"
          >
            {/* Image */}
            <div className="w-full md:w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-800">
              <img src={item.image} alt={item.game} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-xl font-bold text-white truncate">{item.game} Account</h3>
                {getStatusBadge(item.status)}
              </div>
              <p className="text-sm text-slate-500 mb-4">
                Order ID: {item.orderId} • Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
              </p>

              {item.status === 'ready' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
                  {/* Username Field */}
                  <div className="flex items-center justify-between bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Username / Email</span>
                      <span className="text-slate-200 font-mono text-sm truncate">{item.username}</span>
                    </div>
                    <button 
                      onClick={() => copyToClipboard(item.username, 'user')}
                      className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                      title="Copy Username"
                    >
                      {copiedText === `${item.username}-user` ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Password Field */}
                  <div className="flex items-center justify-between bg-slate-950/50 border border-slate-700/50 rounded-lg px-4 py-2">
                    <div className="flex flex-col min-w-0 pr-4">
                      <span className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Password</span>
                      <span className="text-slate-200 font-mono text-sm truncate">
                        {showPasswords[item.id] ? item.password : '••••••••••••'}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => togglePassword(item.id)}
                        className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                        title={showPasswords[item.id] ? "Hide Password" : "Show Password"}
                      >
                        {showPasswords[item.id] ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button 
                        onClick={() => copyToClipboard(item.password, 'pass')}
                        className="text-slate-400 hover:text-indigo-400 transition-colors p-1"
                        title="Copy Password"
                      >
                        {copiedText === `${item.password}-pass` ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {item.status === 'checking' && (
                <div className="bg-slate-800/30 border border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-400 flex items-start gap-2">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <p>Our background workers are verifying the account credentials to ensure they are valid. This usually takes 1-5 minutes.</p>
                </div>
              )}
              
              {item.status === 'failed' && (
                <div className="bg-rose-500/5 border border-rose-500/20 rounded-lg px-4 py-3 text-sm text-rose-300/80 flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <p>The account verification failed. Your credits have been automatically refunded to your balance.</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
