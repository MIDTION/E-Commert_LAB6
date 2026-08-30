'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Package, LogOut, Wallet, Moon, Sun, Home, Gift, FileText, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { mockUser } from '@/data/mockData';
import { useTheme } from '@/components/ThemeProvider';

export default function Sidebar() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navLinks = [
    { name: 'หน้าแรก', href: '/store', icon: Home },
    { name: 'คลังเก็บของ', href: '/inventory', icon: Package },
    { name: 'เติม credit', href: '/topup', icon: ShoppingCart },
    { name: 'นโยบายการคืนสินค้า', href: '/refund-policy', icon: FileText },
  ];

  if (!mounted) return null;

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-white dark:bg-[#1e1e1e] text-slate-600 dark:text-slate-300 w-72 border-r border-slate-200 dark:border-[#333] shadow-xl shadow-slate-200/40 dark:shadow-none transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-200 dark:border-[#333]">
        <Link href="/store" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/20">
            <ShoppingCart className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-black text-lg text-slate-800 dark:text-white leading-tight">
              GAME<span className="text-amber-500">STORE</span>
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold tracking-widest uppercase">Premium</span>
          </div>
        </Link>
      </div>

      {/* User Profile Area */}
      <div className="p-5 border-b border-slate-200 dark:border-[#333] bg-slate-50 dark:bg-[#222]">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 border-2 border-white dark:border-slate-500 shadow-sm">
            <span className="text-slate-700 dark:text-white font-bold text-base">
              {mockUser.username.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm text-slate-500 dark:text-slate-400 font-medium">ยินดีต้อนรับ</span>
            <span className="text-base text-slate-800 dark:text-white font-bold truncate">
              {mockUser.username}
            </span>
          </div>
        </div>

        {/* Highlighted Credit Box */}
        <div className="bg-emerald-50 dark:bg-[#1a1d27] dark:bg-gradient-to-r dark:from-emerald-500/10 dark:to-teal-500/10 border border-emerald-200 dark:border-emerald-500/20 rounded-xl p-3 flex items-center justify-between shadow-inner gap-2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center shrink-0">
              <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <span className="text-sm font-semibold text-slate-700 dark:text-slate-300 whitespace-nowrap">ยอดเงินคงเหลือ</span>
          </div>
          <span className="text-lg font-black text-emerald-600 dark:text-emerald-400 tracking-tight whitespace-nowrap truncate">
            {mockUser.credit_balance.toLocaleString()} ฿
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 py-6 overflow-y-auto">
        <ul className="space-y-3 px-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            // Handle mock links that don't go anywhere
            const isActive = link.href !== '#' && pathname.startsWith(link.href);
            return (
              <li key={link.name}>
                <Link
                  href={link.href}
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-300 group ${
                    isActive
                      ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white font-bold shadow-lg shadow-orange-500/20 translate-x-1'
                      : 'text-slate-600 dark:text-slate-400 hover:text-amber-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 font-medium hover:translate-x-1'
                  }`}
                >
                  <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500 group-hover:text-amber-500 dark:group-hover:text-white'}`} />
                  <span className="text-sm tracking-wide">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-200 dark:border-[#333] space-y-2">
        <button
          onClick={toggleTheme}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors duration-200 group"
        >
          {theme === 'dark' ? (
            <>
              <Sun className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-amber-500" />
              <span className="font-medium text-sm tracking-wide">โหมดสว่าง</span>
            </>
          ) : (
            <>
              <Moon className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-indigo-500" />
              <span className="font-medium text-sm tracking-wide">โหมดมืด</span>
            </>
          )}
        </button>

        <button
          onClick={() => {
            document.cookie = "sso_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/';
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 dark:text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-500/10 transition-colors duration-200 group"
        >
          <LogOut className="w-5 h-5 text-slate-400 dark:text-slate-500 group-hover:text-rose-500" />
          <span className="font-medium text-sm tracking-wide">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white dark:bg-[#1e1e1e] border-b border-slate-200 dark:border-[#333] z-50 flex items-center justify-between px-4 transition-colors duration-300">
        <Link href="/store" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-white" />
          </div>
          <span className="font-black text-slate-800 dark:text-white">GAME<span className="text-amber-500">STORE</span></span>
        </Link>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-white"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed top-0 bottom-0 left-0 z-50 transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:sticky lg:top-0 lg:h-screen lg:shrink-0
      `}>
        <SidebarContent />
      </aside>
    </>
  );
}
