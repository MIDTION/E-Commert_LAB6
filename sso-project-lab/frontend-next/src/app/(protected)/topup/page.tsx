'use client';

import { useState } from 'react';
import { CreditCard, Smartphone, Banknote, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { mockUser } from '@/data/mockData';

const PAYMENT_METHODS = [
  { id: 'promptpay', name: 'QR PromptPay', icon: Smartphone, color: 'bg-blue-500', fee: 'ฟรีค่าธรรมเนียม' },
  { id: 'truemoney', name: 'TrueMoney Wallet', icon: Banknote, color: 'bg-orange-500', fee: 'ค่าธรรมเนียม 1.5%' },
  { id: 'creditcard', name: 'Credit / Debit Card', icon: CreditCard, color: 'bg-slate-700', fee: 'ค่าธรรมเนียม 3%' },
];

const TOPUP_AMOUNTS = [50, 100, 300, 500, 1000, 3000];

export default function TopUpPage() {
  const [selectedMethod, setSelectedMethod] = useState(PAYMENT_METHODS[0].id);
  const [selectedAmount, setSelectedAmount] = useState<number | 'custom'>(100);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleTopup = () => {
    const amount = selectedAmount === 'custom' ? parseInt(customAmount) : selectedAmount;
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    // Mock API Call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Add credit
      mockUser.credit_balance += amount;
      
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto mt-12">
        <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-8 md:p-12 shadow-xl text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mb-6">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 dark:text-white mb-4">ทำรายการสำเร็จ!</h2>
          <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">
            ยอดเครดิตได้ถูกเพิ่มเข้าสู่บัญชีของคุณเรียบร้อยแล้ว
          </p>
          <button 
            onClick={() => window.location.href = '/store'}
            className="px-8 py-4 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors w-full md:w-auto"
          >
            กลับสู่หน้าหลัก
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 max-w-5xl mx-auto pb-12">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 p-6 md:p-8 rounded-3xl shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-slate-800 dark:text-white mb-2">เติมเครดิต (Top Up)</h1>
          <p className="text-slate-500 dark:text-slate-400">เลือกช่องทางการชำระเงินและจำนวนเครดิตที่ต้องการ</p>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 dark:bg-slate-900 px-6 py-4 rounded-2xl border border-slate-200 dark:border-slate-800">
          <div className="text-right">
            <div className="text-sm text-slate-500 font-semibold mb-1">ยอดเครดิตคงเหลือ</div>
            <div className="text-2xl font-black text-emerald-500">{mockUser.credit_balance.toLocaleString()} ฿</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-emerald-100 dark:bg-emerald-500/20 flex items-center justify-center">
            <Banknote className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Payment Methods */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-4">1. เลือกช่องทางชำระเงิน</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'bg-amber-50 dark:bg-amber-500/10 border-amber-500 shadow-md shadow-amber-500/10' 
                      : 'bg-white dark:bg-[#151821] border-slate-200 dark:border-slate-800 hover:border-amber-300 dark:hover:border-amber-700/50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${method.color}`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-bold ${isSelected ? 'text-amber-600 dark:text-amber-400' : 'text-slate-800 dark:text-slate-200'}`}>
                      {method.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{method.fee}</div>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-amber-500 bg-amber-500' : 'border-slate-300 dark:border-slate-600'
                  }`}>
                    {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/30 rounded-2xl p-4 flex gap-3 mt-6">
            <ShieldCheck className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
            <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
              การชำระเงินของคุณได้รับการปกป้องด้วยระบบรักษาความปลอดภัยระดับสากล มั่นใจได้ว่าข้อมูลของคุณจะปลอดภัย 100%
            </p>
          </div>
        </div>

        {/* Right Column: Amount & Checkout */}
        <div className="lg:col-span-2">
          <div className="bg-white dark:bg-[#151821] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">2. เลือกจำนวนเครดิต</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
              {TOPUP_AMOUNTS.map((amount) => (
                <div 
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                  className={`flex flex-col items-center justify-center p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    selectedAmount === amount
                      ? 'border-amber-500 bg-amber-50 dark:bg-amber-500/10'
                      : 'border-slate-100 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span className={`text-2xl font-black ${selectedAmount === amount ? 'text-amber-600 dark:text-amber-400' : 'text-slate-700 dark:text-slate-300'}`}>
                    {amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500 mt-1 font-semibold">เครดิต</span>
                </div>
              ))}
            </div>

            <div className="mb-8">
              <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">หรือ ระบุจำนวนเงินเอง (บาท)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('custom');
                }}
                className={`w-full px-4 py-4 rounded-xl border-2 bg-slate-50 dark:bg-slate-900 text-lg font-bold text-slate-800 dark:text-white focus:outline-none transition-colors ${
                  selectedAmount === 'custom' 
                    ? 'border-amber-500 focus:border-amber-500' 
                    : 'border-slate-200 dark:border-slate-700 focus:border-slate-400'
                }`}
                placeholder="ขั้นต่ำ 50 บาท"
                min="50"
              />
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-slate-500 dark:text-slate-400 font-semibold">ยอดที่ต้องชำระ (บาท)</span>
                <span className="text-3xl font-black text-amber-600 dark:text-amber-400">
                  {selectedAmount === 'custom' ? (customAmount || '0') : selectedAmount}
                </span>
              </div>
              
              <button 
                onClick={handleTopup}
                disabled={isProcessing || (selectedAmount === 'custom' && (!customAmount || parseInt(customAmount) < 50))}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-lg py-4 rounded-2xl transition-all shadow-lg shadow-orange-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isProcessing ? 'กำลังประมวลผล...' : 'ยืนยันการทำรายการ'}
                {!isProcessing && <ChevronRight className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
