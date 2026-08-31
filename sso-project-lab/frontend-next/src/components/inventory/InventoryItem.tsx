import { useState } from 'react';
import { Copy, CheckCircle2, Clock, Eye, EyeOff, AlertCircle } from 'lucide-react';
import { InventoryItem as InventoryItemType } from '@/types';

interface InventoryItemProps {
  item: InventoryItemType;
}

export default function InventoryItem({ item }: InventoryItemProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const togglePassword = () => {
    setShowPassword(!showPassword);
  };

  const copyToClipboard = (text: string | undefined, type: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopiedText(`${item.id}-${type}`);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const getStatusBadge = (status: string) => {
    switch(status) {
      case 'ready':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 border border-green-200 text-xs font-bold shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5" />
            พร้อมใช้งาน
          </span>
        );
      case 'checking':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 text-orange-700 border border-orange-200 text-xs font-bold shadow-sm">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            กำลังตรวจสอบ
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 border border-red-200 text-xs font-bold shadow-sm">
            <AlertCircle className="w-3.5 h-3.5" />
            ล้มเหลว / คืนเงิน
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white border-2 border-slate-100 rounded-3xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-orange-300 transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/10 hover:-translate-y-1">
      {/* Image */}
      <div className="w-full md:w-28 h-28 rounded-2xl overflow-hidden shrink-0 relative bg-slate-50 shadow-inner">
        <img src={item.image} alt={item.game} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-black text-slate-800 truncate">บัญชีเกม {item.game}</h3>
          {getStatusBadge(item.status)}
        </div>
        <p className="text-sm text-slate-400 font-medium mb-4">
          รหัสคำสั่งซื้อ: {item.orderId} • ซื้อเมื่อ {new Date(item.purchaseDate).toLocaleDateString()}
        </p>

        {item.status === 'ready' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            {/* Username Field */}
            <div className="flex items-center justify-between bg-blue-50/50 border border-blue-100 rounded-xl px-4 py-3 shadow-sm">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-[10px] uppercase font-black text-blue-500 mb-0.5">Username / Email</span>
                <span className="text-slate-700 font-bold text-sm truncate">{item.username}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(item.username, 'user')}
                className="text-blue-400 hover:text-blue-600 transition-colors p-1.5 rounded-lg hover:bg-blue-100"
                title="Copy Username"
              >
                {copiedText === `${item.id}-user` ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
              </button>
            </div>

            {/* Password Field */}
            <div className="flex items-center justify-between bg-orange-50/50 border border-orange-100 rounded-xl px-4 py-3 shadow-sm">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-[10px] uppercase font-black text-orange-500 mb-0.5">Password</span>
                <span className="text-slate-700 font-bold text-sm truncate">
                  {showPassword ? item.password : '••••••••••••'}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button 
                  onClick={togglePassword}
                  className="text-orange-400 hover:text-orange-600 transition-colors p-1.5 rounded-lg hover:bg-orange-100"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
                <button 
                  onClick={() => copyToClipboard(item.password, 'pass')}
                  className="text-orange-400 hover:text-orange-600 transition-colors p-1.5 rounded-lg hover:bg-orange-100"
                  title="Copy Password"
                >
                  {copiedText === `${item.id}-pass` ? <CheckCircle2 className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {item.status === 'checking' && (
          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-3 text-sm text-orange-700 flex items-start gap-3 font-medium">
            <Clock className="w-5 h-5 text-orange-500 shrink-0" />
            <p>ระบบกำลังตรวจสอบข้อมูลบัญชีเกมของคุณ ใช้เวลาประมาณ 1-5 นาที โปรดรอสักครู่</p>
          </div>
        )}
        
        {item.status === 'failed' && (
          <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700 flex items-start gap-3 font-medium">
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0" />
            <p>การตรวจสอบบัญชีล้มเหลว ระบบได้ทำการคืนเงินเข้าสู่ยอดคงเหลือของคุณแล้ว</p>
          </div>
        )}
      </div>
    </div>
  );
}
