import React, { useState, useEffect } from "react";
import {
  Search,
  Package,
  User,
  Mail,
  Phone,
  ImageIcon,
  ChevronRight,
  ExternalLink,
} from "lucide-react";
import { useSearchParams } from "react-router-dom"; // Import this to handle URL parameters

const OrderLookup = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 1. URL Sync Effect: Runs on mount or when the URL query changes
  useEffect(() => {
    const orderNum = searchParams.get("ordernumber");
    if (orderNum) {
      setSearchTerm(orderNum); // Keep input field in sync with URL
      fetchOrder(orderNum);
    }
  }, [searchParams]);

  const fetchOrder = async (orderId) => {
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/print-jobs?order_number=eq.${orderId}`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setOrder(data[0]);
      } else {
        setError(
          "No order found with that reference. Please check your ID and try again.",
        );
      }
    } catch (err) {
      setError("An error occurred while fetching your order details.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    // 2. Update the URL: This triggers the useEffect above
    setSearchParams({ ordernumber: searchTerm });
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchTerm) return;

    setLoading(true);
    setError("");
    setOrder(null);

    try {
      // Searching by Order ID or Email via your API
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/print-jobs?order_number=eq.${searchTerm}`,
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setOrder(data[0]);
      } else {
        setError(
          "No order found with that reference. Please check your ID and try again.",
        );
      }
    } catch (err) {
      setError("An error occurred while fetching your order details.");
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    return items
      .reduce((sum, item) => sum + item.estimated_price * item.quantity, 0)
      .toFixed(2);
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-slate-200 p-4 sm:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-black italic uppercase tracking-tighter">
            Track Your <span className="text-cyan-500">Order</span>
          </h1>
          <form
            onSubmit={handleSearchSubmit}
            className="relative max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Enter Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#1c2128] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-2xl"
            />
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={20}
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-cyan-400 transition-colors"
            >
              SEARCH
            </button>
          </form>
        </div>

        {/* ... Loading and Error UI remain the same ... */}
        {loading && (
          <div className="text-center animate-pulse text-cyan-500">
            Retrieving order details...
          </div>
        )}
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-500 text-center font-bold">
            {error}
          </div>
        )}

        {order && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
            {/* Customer & Status Header */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#1c2128] p-6 rounded-2xl border border-gray-800 space-y-4">
                <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase text-[10px] tracking-widest">
                  <User size={14} /> Customer Information
                </div>
                <div>
                  <h2 className="text-xl font-bold text-white capitalize">
                    {order.customer_name}
                  </h2>
                  <div className="flex flex-col gap-1 mt-2 text-sm text-gray-400">
                    <span className="flex items-center gap-2">
                      <Mail size={14} /> {order.customer_email}
                    </span>
                    <span className="flex items-center gap-2">
                      <Phone size={14} /> {order.customer_phone || "N/A"}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-[#1c2128] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                    Order Status
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic border ${
                      order.status === "pending_quote"
                        ? "bg-orange-500/10 text-orange-500 border-orange-500/30"
                        : "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
                    }`}
                  >
                    {order.status.replace("_", " ")}
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-[10px] text-gray-500 uppercase">
                    Internal Reference
                  </p>
                  <p className="text-xs font-mono text-gray-400 truncate">
                    {order.id}
                  </p>
                </div>
              </div>
            </div>

            {/* Product List */}
            <div className="bg-[#1c2128] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
              <div className="p-4 bg-gray-900/50 border-b border-gray-800 flex items-center gap-2 font-bold italic uppercase text-xs tracking-tighter">
                <Package size={16} className="text-cyan-500" />
                Project Items ({order.order_items?.length || 0})
              </div>
              <div className="divide-y divide-gray-800">
                {(order.order_items || []).map((item) => (
                  <div
                    key={item.id}
                    className="p-5 flex flex-col sm:flex-row gap-6 hover:bg-white/[0.02] transition-colors"
                  >
                    <div className="w-full sm:w-32 h-32 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex-shrink-0 group relative">
                      {item.artwork_url ? (
                        <>
                          <img
                            src={item.artwork_url}
                            alt={item.product_name}
                            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                          />
                          <a
                            href={item.artwork_url}
                            target="_blank"
                            rel="noreferrer"
                            className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <ExternalLink size={20} className="text-cyan-400" />
                          </a>
                        </>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
                          <ImageIcon size={24} />
                          <span className="text-[10px] uppercase font-bold mt-1">
                            No Art
                          </span>
                        </div>
                      )}
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <h4 className="text-white font-bold text-lg leading-tight">
                            {item.product_name}
                          </h4>
                          <span className="text-cyan-400 font-black font-mono">
                            ${(item.estimated_price * item.quantity).toFixed(2)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
                            SIZE: {item.size}
                          </span>
                          <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
                            MATERIAL: {item.material}
                          </span>
                          <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
                            QTY: {item.quantity}
                          </span>
                        </div>
                        {item.customer_notes && (
                          <p className="text-xs text-gray-500 italic bg-black/20 p-2 rounded border-l-2 border-orange-500/50">
                            "{item.customer_notes}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-900/80 p-6 flex justify-between items-center border-t border-gray-800">
                <div className="flex flex-col">
                  <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
                    Subtotal Estimate
                  </span>
                </div>
                <span className="text-4xl font-black text-white italic tracking-tighter">
                  ${calculateTotal(order.order_items)}
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  //   return (
  //     <div className="min-h-screen bg-[#0f1115] text-slate-200 p-4 sm:p-8">
  //       <div className="max-w-4xl mx-auto space-y-8">
  //         {/* Header & Search */}
  //         <div className="text-center space-y-4">
  //           <h1 className="text-3xl font-black italic uppercase tracking-tighter">
  //             Track Your <span className="text-cyan-500">Order</span>
  //           </h1>
  //           <form onSubmit={handleSearch} className="relative max-w-md mx-auto">
  //             <input
  //               type="text"
  //               placeholder="Enter Order ID (e.g. 3ea86054...)"
  //               value={searchTerm}
  //               onChange={(e) => setSearchTerm(e.target.value)}
  //               className="w-full bg-[#1c2128] border border-gray-800 rounded-xl py-4 pl-12 pr-4 text-white focus:ring-2 focus:ring-cyan-500 outline-none transition-all shadow-2xl"
  //             />
  //             <Search
  //               className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
  //               size={20}
  //             />
  //             <button
  //               type="submit"
  //               className="absolute right-2 top-1/2 -translate-y-1/2 bg-cyan-500 text-black px-4 py-1.5 rounded-lg font-bold text-xs hover:bg-cyan-400 transition-colors"
  //             >
  //               SEARCH
  //             </button>
  //           </form>
  //         </div>

  //         {loading && (
  //           <div className="text-center animate-pulse text-cyan-500">
  //             Retrieving order details...
  //           </div>
  //         )}
  //         {error && (
  //           <div className="bg-red-500/10 border border-red-500/50 p-4 rounded-xl text-red-500 text-center font-bold">
  //             {error}
  //           </div>
  //         )}

  //         {order && (
  //           <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-6">
  //             {/* Customer & Status Header */}
  //             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  //               <div className="bg-[#1c2128] p-6 rounded-2xl border border-gray-800 space-y-4">
  //                 <div className="flex items-center gap-2 text-cyan-500 font-bold uppercase text-[10px] tracking-widest">
  //                   <User size={14} /> Customer Information
  //                 </div>
  //                 <div>
  //                   <h2 className="text-xl font-bold text-white capitalize">
  //                     {order.customer_name}
  //                   </h2>
  //                   <div className="flex flex-col gap-1 mt-2 text-sm text-gray-400">
  //                     <span className="flex items-center gap-2">
  //                       <Mail size={14} /> {order.customer_email}
  //                     </span>
  //                     <span className="flex items-center gap-2">
  //                       <Phone size={14} /> {order.customer_phone || "N/A"}
  //                     </span>
  //                   </div>
  //                 </div>
  //               </div>

  //               <div className="bg-[#1c2128] p-6 rounded-2xl border border-gray-800 flex flex-col justify-between">
  //                 <div className="flex justify-between items-start">
  //                   <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">
  //                     Order Status
  //                   </div>
  //                   <div
  //                     className={`px-3 py-1 rounded-full text-[10px] font-black uppercase italic border ${
  //                       order.status === "pending_quote"
  //                         ? "bg-orange-500/10 text-orange-500 border-orange-500/30"
  //                         : "bg-cyan-500/10 text-cyan-500 border-cyan-500/30"
  //                     }`}
  //                   >
  //                     {order.status.replace("_", " ")}
  //                   </div>
  //                 </div>
  //                 <div className="mt-4">
  //                   <p className="text-[10px] text-gray-500 uppercase">
  //                     Internal Reference
  //                   </p>
  //                   <p className="text-xs font-mono text-gray-400 truncate">
  //                     {order.id}
  //                   </p>
  //                 </div>
  //               </div>
  //             </div>

  //             {/* Product List */}
  //             <div className="bg-[#1c2128] rounded-2xl border border-gray-800 overflow-hidden shadow-xl">
  //               <div className="p-4 bg-gray-900/50 border-b border-gray-800 flex items-center gap-2 font-bold italic uppercase text-xs tracking-tighter">
  //                 <Package size={16} className="text-cyan-500" />
  //                 Project Items ({order.order_items?.length || 0})
  //               </div>
  //               <div className="divide-y divide-gray-800">
  //                 {(order.order_items || []).map((item) => (
  //                   <div
  //                     key={item.id}
  //                     className="p-5 flex flex-col sm:flex-row gap-6 hover:bg-white/[0.02] transition-colors"
  //                   >
  //                     {/* Artwork Preview */}
  //                     <div className="w-full sm:w-32 h-32 bg-gray-900 rounded-xl border border-gray-800 overflow-hidden flex-shrink-0 group relative">
  //                       {item.artwork_url ? (
  //                         <>
  //                           <img
  //                             src={item.artwork_url}
  //                             alt={item.product_name}
  //                             className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
  //                           />
  //                           <a
  //                             href={item.artwork_url}
  //                             target="_blank"
  //                             rel="noreferrer"
  //                             className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity"
  //                           >
  //                             <ExternalLink size={20} className="text-cyan-400" />
  //                           </a>
  //                         </>
  //                       ) : (
  //                         <div className="w-full h-full flex flex-col items-center justify-center text-gray-600">
  //                           <ImageIcon size={24} />
  //                           <span className="text-[10px] uppercase font-bold mt-1">
  //                             No Art
  //                           </span>
  //                         </div>
  //                       )}
  //                     </div>

  //                     {/* Item Details */}
  //                     <div className="flex-1 flex flex-col justify-between">
  //                       <div className="space-y-2">
  //                         <div className="flex justify-between items-start">
  //                           <h4 className="text-white font-bold text-lg leading-tight">
  //                             {item.product_name}
  //                           </h4>
  //                           <span className="text-cyan-400 font-black font-mono">
  //                             ${(item.estimated_price * item.quantity).toFixed(2)}
  //                           </span>
  //                         </div>

  //                         <div className="flex flex-wrap gap-2">
  //                           <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
  //                             SIZE: {item.size}
  //                           </span>
  //                           <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
  //                             MATERIAL: {item.material}
  //                           </span>
  //                           <span className="text-[10px] bg-gray-800 text-gray-300 px-2 py-0.5 rounded border border-gray-700 font-bold">
  //                             QTY: {item.quantity}
  //                           </span>
  //                         </div>

  //                         {item.customer_notes && (
  //                           <p className="text-xs text-gray-500 italic bg-black/20 p-2 rounded border-l-2 border-orange-500/50">
  //                             "{item.customer_notes}"
  //                           </p>
  //                         )}
  //                       </div>

  //                       {item.is_custom_design && (
  //                         <div className="inline-flex items-center gap-1 text-[9px] text-orange-400 font-black uppercase mt-3 tracking-widest bg-orange-400/10 px-2 py-0.5 rounded border border-orange-400/20">
  //                           Premium Design Service Included
  //                         </div>
  //                       )}
  //                     </div>
  //                   </div>
  //                 ))}
  //               </div>

  //               {/* Total Footer */}
  //               <div className="bg-gray-900/80 p-6 flex justify-between items-center border-t border-gray-800">
  //                 <div className="flex flex-col">
  //                   <span className="font-bold text-gray-500 uppercase text-[10px] tracking-widest">
  //                     Subtotal Estimate
  //                   </span>
  //                   <span
  //                     className={`text-[10px] font-bold ${order.is_paid ? "text-green-500" : "text-orange-500"}`}
  //                   >
  //                     {order.is_paid
  //                       ? "● Payment Verified"
  //                       : "○ Awaiting Payment"}
  //                   </span>
  //                 </div>
  //                 <span className="text-4xl font-black text-white italic tracking-tighter">
  //                   ${calculateTotal(order.order_items)}
  //                 </span>
  //               </div>
  //             </div>

  //             <p className="text-center text-[10px] text-gray-600 uppercase tracking-widest font-bold">
  //               Questions about this order?{" "}
  //               <span className="text-cyan-600 cursor-pointer">
  //                 support@maximusvinyl.com
  //               </span>
  //             </p>
  //           </div>
  //         )}
  //       </div>
  //     </div>
  //   );
};

export default OrderLookup;
