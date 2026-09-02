import { useState } from 'react';
import { X, ShieldCheck, CreditCard, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Product } from '@/types';
import { MOCK_INVENTORY, mockUser } from '@/data/mockData';
import { InventoryItem } from '@/types';
import { api } from '@/lib/api';

interface CheckoutModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ product, isOpen, onClose }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();

  if (!isOpen) return null;

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    try {
      const response = await api.buyProduct(product.id.toString());
      if (response.success) {
        setIsSuccess(true);
        setTimeout(() => {
          onClose();
          router.push('/inventory');
        }, 2000);
      } else {
        alert(response.error || "Purchase failed");
      }
    } catch (err) {
      alert("Purchase failed due to error");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity"
        onClick={!isProcessing ? onClose : undefined}
      ></div>
      
      {/* Modal */}
      <div className="relative bg-white border border-slate-100 w-full max-w-md rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 bg-slate-50/50">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-blue-500" />
            ยืนยันคำสั่งซื้อ
          </h2>
          <button 
            onClick={onClose}
            disabled={isProcessing || isSuccess}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-full hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!isSuccess ? (
            <>
              <div className="flex gap-4 mb-6 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 shadow-sm">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-center">
                  <div className="text-xs text-orange-500 font-bold mb-1 uppercase tracking-wide">{product.game}</div>
                  <div className="font-black text-slate-700 leading-tight">{product.name}</div>
                </div>
              </div>

              <div className="space-y-3 mb-8 px-2">
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>ราคา</span>
                  <span className="text-slate-700 font-bold">{product.price.toLocaleString()} ฿</span>
                </div>
                <div className="flex justify-between text-slate-500 font-medium">
                  <span>ค่าธรรมเนียม</span>
                  <span className="text-slate-700 font-bold">0 ฿</span>
                </div>
                <div className="h-px w-full bg-slate-100 my-4"></div>
                <div className="flex justify-between font-black text-xl">
                  <span className="text-slate-800">ยอดชำระรวม</span>
                  <span className="text-blue-600">{product.price.toLocaleString()} ฿</span>
                </div>
              </div>

              <div className="flex items-start gap-3 bg-blue-50 text-blue-700 p-4 rounded-xl border border-blue-100 text-sm mb-6 font-medium">
                <ShieldCheck className="w-5 h-5 shrink-0 mt-0.5 text-blue-500" />
                <p>ทำรายการปลอดภัย ข้อมูลบัญชีเกมจะถูกส่งไปที่คลังเก็บของของคุณทันที</p>
              </div>

              <button
                onClick={handlePurchase}
                disabled={isProcessing}
                className="w-full relative overflow-hidden bg-gradient-to-r from-blue-500 to-orange-500 hover:from-blue-600 hover:to-orange-600 text-white py-4 rounded-xl font-black transition-all duration-300 shadow-lg shadow-orange-500/30 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02]"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    กำลังดำเนินการ...
                  </>
                ) : (
                  'ยืนยันการชำระเงิน'
                )}
              </button>
            </>
          ) : (
            <div className="py-10 flex flex-col items-center justify-center text-center animate-in zoom-in-95 duration-300">
              <div className="w-24 h-24 bg-gradient-to-tr from-green-400 to-emerald-500 text-white rounded-full flex items-center justify-center mb-6 shadow-xl shadow-emerald-500/30">
                <ShieldCheck className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">ชำระเงินสำเร็จ!</h3>
              <p className="text-slate-500 font-medium">
                เตรียมพร้อมลุย! กำลังพาคุณไปที่คลังเก็บของ...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
