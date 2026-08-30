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
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-500/20 text-xs font-semibold">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Ready
          </span>
        );
      case 'checking':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-500/20 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5 animate-pulse" />
            Checking
          </span>
        );
      case 'failed':
        return (
          <span className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 dark:bg-rose-500/10 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-500/20 text-xs font-semibold">
            <AlertCircle className="w-3.5 h-3.5" />
            Failed / Refunded
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 flex flex-col md:flex-row gap-6 items-start md:items-center hover:border-indigo-400 dark:hover:border-indigo-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-indigo-500/10 dark:hover:shadow-indigo-500/5">
      {/* Image */}
      <div className="w-full md:w-24 h-24 rounded-xl overflow-hidden shrink-0 relative bg-slate-100 dark:bg-slate-800">
        <img src={item.image} alt={item.game} className="w-full h-full object-cover" />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-3 mb-1">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white truncate">{item.game} Account</h3>
          {getStatusBadge(item.status)}
        </div>
        <p className="text-sm text-slate-500 mb-4">
          Order ID: {item.orderId} • Purchased on {new Date(item.purchaseDate).toLocaleDateString()}
        </p>

        {item.status === 'ready' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl">
            {/* Username Field */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-2">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Username / Email</span>
                <span className="text-slate-700 dark:text-slate-200 font-mono text-sm truncate">{item.username}</span>
              </div>
              <button 
                onClick={() => copyToClipboard(item.username, 'user')}
                className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                title="Copy Username"
              >
                {copiedText === `${item.id}-user` ? <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Password Field */}
            <div className="flex items-center justify-between bg-slate-50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-700/50 rounded-lg px-4 py-2">
              <div className="flex flex-col min-w-0 pr-4">
                <span className="text-[10px] uppercase font-bold text-slate-500 mb-0.5">Password</span>
                <span className="text-slate-700 dark:text-slate-200 font-mono text-sm truncate">
                  {showPassword ? item.password : '••••••••••••'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={togglePassword}
                  className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                  title={showPassword ? "Hide Password" : "Show Password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
                <button 
                  onClick={() => copyToClipboard(item.password, 'pass')}
                  className="text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1"
                  title="Copy Password"
                >
                  {copiedText === `${item.id}-pass` ? <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        )}

        {item.status === 'checking' && (
          <div className="bg-amber-50 dark:bg-slate-800/30 border border-amber-200 dark:border-slate-700/50 rounded-lg px-4 py-3 text-sm text-slate-600 dark:text-slate-400 flex items-start gap-2">
            <Clock className="w-4 h-4 text-amber-500 dark:text-amber-400 shrink-0 mt-0.5" />
            <p>Our background workers are verifying the account credentials to ensure they are valid. This usually takes 1-5 minutes.</p>
          </div>
        )}
        
        {item.status === 'failed' && (
          <div className="bg-rose-50 dark:bg-rose-500/5 border border-rose-200 dark:border-rose-500/20 rounded-lg px-4 py-3 text-sm text-rose-700 dark:text-rose-300/80 flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-rose-500 dark:text-rose-400 shrink-0 mt-0.5" />
            <p>The account verification failed. Your credits have been automatically refunded to your balance.</p>
          </div>
        )}
      </div>
    </div>
  );
}
