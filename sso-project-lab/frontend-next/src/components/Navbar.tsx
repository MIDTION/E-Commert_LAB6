'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Package, LogOut, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

// Mock user data for now
const mockUser = {
  username: 'student66000001',
  credit_balance: 1500,
};

export default function Navbar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'Store', href: '/store', icon: ShoppingCart },
    { name: 'Inventory', href: '/inventory', icon: Package },
  ];

  if (!mounted) return null;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto backdrop-blur-xl bg-slate-900/60 border border-slate-700/50 rounded-2xl shadow-xl shadow-black/20 flex items-center justify-between px-6 py-3 transition-all duration-300">
        
        {/* Logo */}
        <Link href="/store" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/30 group-hover:shadow-indigo-500/50 transition-all">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
            GameStore
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.name}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                  isActive
                    ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-medium">{link.name}</span>
              </Link>
            );
          })}
        </div>

        {/* User Menu */}
        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-3 bg-slate-800/50 px-4 py-2 rounded-xl border border-slate-700/50">
            <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
              <Wallet className="w-4 h-4" />
              <span>{mockUser.credit_balance.toLocaleString()} ฿</span>
            </div>
            <div className="w-px h-4 bg-slate-700"></div>
            <span className="text-slate-300 font-medium text-sm">
              @{mockUser.username}
            </span>
          </div>
          
          <button
            onClick={() => {
              // Mock logout: clear cookie and redirect
              document.cookie = "sso_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
              window.location.href = '/';
            }}
            className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-xl transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </nav>
  );
}
