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
    <div className="flex flex-col h-full bg-white text-slate-600 w-72 border-r border-slate-200 shadow-[4px_0_24px_rgba(0,0,0,0.02)] transition-all duration-300">
      {/* Logo Area */}
      <div className="p-6 border-b border-slate-100 flex items-center justify-center">
        <Link href="/store" className="flex flex-col items-center gap-2 group">
          <div className="w-16 h-16 bg-gradient-to-tr from-blue-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 transform group-hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div className="flex flex-col items-center">
            <span className="font-black text-2xl text-slate-800 tracking-tight">
              TPEJ<span className="text-orange-500">STORE</span>
            </span>
            <span className="text-xs text-blue-500 font-bold tracking-widest uppercase">Game ID Marketplace</span>
          </div>
        </Link>
      </div>

      {/* User Profile Area */}
      <div className="p-5 border-b border-slate-100 bg-slate-50/50">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 shadow-sm border border-orange-200">
            <span className="font-black text-lg">
              {mockUser.username.substring(0, 2).toUpperCase()}
            </span>
          </div>
          <div className="flex flex-col overflow-hidden">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">ยินดีต้อนรับ</span>
            <span className="text-base text-slate-800 font-black truncate">
              {mockUser.username}
            </span>
          </div>
        </div>

        {/* Highlighted Credit Box */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100/50 border border-blue-200 rounded-2xl p-3 flex flex-col items-center justify-center shadow-sm gap-1.5 mt-2">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm shadow-blue-500/20">
              <Wallet className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-xs font-bold text-blue-900">ยอดเงินคงเหลือ</span>
          </div>
          <span className="text-xl font-black text-blue-600 tracking-tight">
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
                  className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group ${isActive
                      ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold shadow-md shadow-blue-500/20 translate-x-1'
                      : 'text-slate-600 hover:text-orange-500 hover:bg-orange-50 font-bold hover:translate-x-1'
                    }`}
                >
                  <Icon className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-orange-500'}`} />
                  <span className="text-sm tracking-wide">{link.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Footer / Actions */}
      <div className="p-4 border-t border-slate-100 space-y-2">
        <button
          onClick={() => {
            document.cookie = "sso_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
            window.location.href = '/';
          }}
          className="w-full flex items-center justify-center gap-3 px-4 py-3.5 rounded-2xl text-rose-500 font-bold hover:text-white hover:bg-rose-500 transition-all duration-300 group shadow-sm border border-rose-100 hover:border-transparent hover:shadow-rose-500/20"
        >
          <LogOut className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          <span className="text-sm tracking-wide">ออกจากระบบ</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white border-b border-slate-100 z-50 flex items-center justify-between px-4">
        <Link href="/store" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-tr from-blue-500 to-orange-500 rounded-lg flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <span className="font-black text-slate-800 tracking-tight">TPEJ<span className="text-orange-500">STORE</span></span>
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
