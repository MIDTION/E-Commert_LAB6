'use client';

import { useState, useEffect } from 'react';
import { CreditCard, Smartphone, Banknote, ShieldCheck, ChevronRight, Check } from 'lucide-react';
import { api, User } from '@/lib/api';

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
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    api.getUser().then(setUser);
  }, []);

  const handleTopup = () => {
    const amount = selectedAmount === 'custom' ? parseInt(customAmount) : selectedAmount;
    if (!amount || amount <= 0) return;

    setIsProcessing(true);
    // Mock API Call
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      
      // Update local state temporarily
      if (user) {
        setUser({ ...user, credit_balance: user.credit_balance + amount });
      }
      
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="animate-in fade-in zoom-in duration-500 max-w-2xl mx-auto mt-12">
        <div className="bg-white border-2 border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-2xl text-center">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 text-green-600 mb-6 shadow-sm border border-green-200">
            <Check className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black text-slate-800 mb-4">ทำรายการสำเร็จ!</h2>
          <p className="text-slate-500 font-medium text-lg mb-8">
            ยอดเครดิตได้ถูกเพิ่มเข้าสู่บัญชีของคุณเรียบร้อยแล้ว
          </p>
          <button 
            onClick={() => window.location.href = '/store'}
            className="px-10 py-4 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-orange-500/20 w-full md:w-auto hover:-translate-y-1"
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
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8 bg-white border-2 border-slate-100 p-6 md:p-8 rounded-[2.5rem] shadow-sm">
        <div>
          <h1 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-orange-500 mb-2">เติมเครดิต (Top Up)</h1>
          <p className="text-slate-500 font-medium">เลือกช่องทางการชำระเงินและจำนวนเครดิตที่ต้องการ</p>
        </div>
        <div className="flex items-center gap-4 bg-blue-50 px-6 py-4 rounded-3xl border border-blue-100 shadow-inner">
          <div className="text-right">
            <div className="text-sm text-blue-500 font-bold mb-1">ยอดเครดิตคงเหลือ</div>
            <div className="text-3xl font-black text-blue-700">{user ? user.credit_balance.toLocaleString() : '0'} ฿</div>
          </div>
          <div className="w-14 h-14 rounded-2xl bg-blue-500 text-white flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Banknote className="w-7 h-7" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column: Payment Methods */}
        <div className="lg:col-span-1 space-y-4">
          <h2 className="text-xl font-black text-slate-800 mb-4 flex items-center gap-2"><div className="w-2 h-6 bg-blue-500 rounded-full"></div> 1. เลือกช่องทางชำระเงิน</h2>
          <div className="space-y-3">
            {PAYMENT_METHODS.map((method) => {
              const Icon = method.icon;
              const isSelected = selectedMethod === method.id;
              return (
                <div 
                  key={method.id}
                  onClick={() => setSelectedMethod(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    isSelected 
                      ? 'bg-orange-50/50 border-orange-400 shadow-md shadow-orange-500/10' 
                      : 'bg-white border-slate-100 hover:border-orange-200 hover:bg-orange-50/20'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 shadow-sm ${method.color}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <div className={`font-black ${isSelected ? 'text-orange-600' : 'text-slate-800'}`}>
                      {method.name}
                    </div>
                    <div className="text-xs text-slate-500 font-medium mt-0.5">{method.fee}</div>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    isSelected ? 'border-orange-500 bg-orange-500' : 'border-slate-200 bg-slate-50'
                  }`}>
                    {isSelected && <div className="w-2.5 h-2.5 bg-white rounded-full" />}
                  </div>
                </div>
              );
            })}
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex gap-3 mt-6">
            <ShieldCheck className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
            <p className="text-xs text-green-700 font-medium leading-relaxed">
              การชำระเงินของคุณได้รับการปกป้องด้วยระบบรักษาความปลอดภัยระดับสากล มั่นใจได้ว่าข้อมูลของคุณจะปลอดภัย 100%
            </p>
          </div>
        </div>

        {/* Right Column: Amount & Checkout */}
        <div className="lg:col-span-2">
          <div className="bg-white border-2 border-slate-100 rounded-[2.5rem] p-6 md:p-10 shadow-sm">
            <h2 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><div className="w-2 h-6 bg-orange-500 rounded-full"></div> 2. เลือกจำนวนเครดิต</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
              {TOPUP_AMOUNTS.map((amount) => (
                <div 
                  key={amount}
                  onClick={() => { setSelectedAmount(amount); setCustomAmount(''); }}
                  className={`flex flex-col items-center justify-center p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 hover:-translate-y-1 ${
                    selectedAmount === amount
                      ? 'border-blue-500 bg-blue-50 shadow-md shadow-blue-500/20'
                      : 'border-slate-100 bg-slate-50/50 hover:border-blue-200 hover:bg-blue-50/20'
                  }`}
                >
                  <span className={`text-3xl font-black ${selectedAmount === amount ? 'text-blue-600' : 'text-slate-700'}`}>
                    {amount.toLocaleString()}
                  </span>
                  <span className="text-sm text-slate-500 mt-1 font-bold">เครดิต</span>
                </div>
              ))}
            </div>

            <div className="mb-10">
              <label className="block text-sm font-black text-slate-700 mb-3">หรือ ระบุจำนวนเงินเอง (บาท)</label>
              <input
                type="number"
                value={customAmount}
                onChange={(e) => {
                  setCustomAmount(e.target.value);
                  setSelectedAmount('custom');
                }}
                className={`w-full px-5 py-5 rounded-2xl border-2 bg-slate-50 text-xl font-black text-slate-800 focus:outline-none transition-all shadow-inner ${
                  selectedAmount === 'custom' 
                    ? 'border-orange-500 focus:border-orange-500 focus:ring-4 focus:ring-orange-500/10 bg-white' 
                    : 'border-slate-200 focus:border-orange-300'
                }`}
                placeholder="ขั้นต่ำ 50 บาท"
                min="50"
              />
            </div>

            <div className="border-t-2 border-slate-100 pt-8">
              <div className="flex justify-between items-center mb-8">
                <span className="text-slate-500 font-bold text-lg">ยอดที่ต้องชำระ (บาท)</span>
                <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-orange-500">
                  {selectedAmount === 'custom' ? (customAmount || '0') : selectedAmount}
                </span>
              </div>
              
              <button 
                onClick={handleTopup}
                disabled={isProcessing || (selectedAmount === 'custom' && (!customAmount || parseInt(customAmount) < 50))}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white font-black text-xl py-5 rounded-2xl transition-all shadow-xl shadow-orange-500/30 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02]"
              >
                {isProcessing ? 'กำลังประมวลผล...' : 'ยืนยันการทำรายการ'}
                {!isProcessing && <ChevronRight className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
