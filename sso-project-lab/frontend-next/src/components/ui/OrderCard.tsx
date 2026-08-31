import React from "react";
import type { Order } from "@/lib/api";

interface OrderCardProps {
  order: Order;
}

const OrderCard = ({ order }: OrderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-secondary font-bold bg-secondary-container px-3 py-1 rounded-full text-xs";
      case "pending":
        return "text-brand-orange font-bold bg-brand-orange/10 px-3 py-1 rounded-full text-xs";
      case "failed":
        return "text-error font-bold bg-error-container px-3 py-1 rounded-full text-xs";
      default:
        return "text-outline font-bold bg-surface-variant px-3 py-1 rounded-full text-xs";
    }
  };

  return (
    <div className="glass-panel p-5 rounded-xl border border-primary/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <div className="flex items-center gap-3 mb-2">
          <h4 className="font-title-lg text-primary font-bold">Order #{order.id}</h4>
          <span className={getStatusColor(order.status)}>{order.status.toUpperCase()}</span>
        </div>
        <p className="text-on-surface-variant text-sm flex items-center gap-1">
          <span className="material-symbols-outlined text-[16px]">calendar_today</span>
          {/* Format date if you add created_at to schema, for now just static or omit */}
          Date: N/A
        </p>
      </div>
      
      <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-primary/10 pt-4 md:pt-0 mt-2 md:mt-0">
        <div className="text-right">
          <p className="text-sm text-on-surface-variant mb-1">Total Amount</p>
          <p className="font-display-lg-mobile text-2xl text-primary">${Number(order.total_amount || order.total_price || 0).toFixed(2)}</p>
        </div>
        <button className="h-10 px-4 rounded-lg bg-surface-variant text-primary font-bold hover:bg-primary hover:text-white transition-colors text-sm">
          View Details
        </button>
      </div>
    </div>
  );
};

export default OrderCard;
