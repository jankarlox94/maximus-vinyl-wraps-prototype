import React, { useEffect, useState } from "react";
import {
  Calendar,
  Hash,
  User,
  Mail,
  Phone,
  Image as ImageIcon,
  Package,
  FileText,
  ExternalLink,
} from "lucide-react";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";
import { useSearchParams } from "react-router-dom";

export default function MasterDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const fetchData = async (recordId = null) => {
    setLoading(true); // Triggers the loading state while fetching
    try {
      // Construct the URL to use the new /dashboard sub-route
      const url = recordId
        ? `${import.meta.env.VITE_API_URL}/print-jobs/admin/dashboard?order_number=${recordId}`
        : `${import.meta.env.VITE_API_URL}/print-jobs/admin/dashboard`;

      const res = await fetch(url);
      const data = await res.json();

      if (recordId) {
        // The backend returns an array; select the first (and only) item
        setSelectedOrder(data[0]);
        setSearchParams({ order_number: recordId });
      } else {
        // Update the main dashboard list
        setOrders(data);
      }
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const orderIdFromUrl = searchParams.get("order_number");

    if (orderIdFromUrl) {
      // If there is an ID in the URL, fetch that specific order
      fetchData(orderIdFromUrl);
    } else {
      // Otherwise, just load the full list
      fetchData();
    }
  }, []); // Run once on mount

  // Update useEffect to load the initial list
  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    setSelectedOrder(null);
    setSearchParams({}); // This clears ?order_number=... from the URL
    fetchData(); // Reload the full list
  };

  if (loading)
    return (
      <div className="p-10 text-center font-bold text-slate-600">
        Loading Maximus Dashboard...
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
              Orders Dashboard
            </h1>
            <p className="text-slate-500 font-medium">
              Internal Management System — Owner/Manager Access Only
            </p>
          </div>
          <div className="text-right">
            <span className="block text-xs font-bold text-slate-400 uppercase">
              Live Orders
            </span>
            <span className="text-2xl font-black text-yellow-500">
              {orders.length}
            </span>
          </div>
        </header>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* MOBILE VIEW: Stacked Cards */}
          <div className="md:hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 space-y-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div className="space-y-0.5">
                    <p className="font-black text-slate-900 uppercase text-sm flex items-center gap-2">
                      {order.customer_name}
                      {order.is_custom_design && (
                        <span
                          className="bg-orange-500 w-2 h-2 rounded-full animate-pulse"
                          title="Custom Design Required"
                        />
                      )}
                    </p>
                    <p className="text-xs text-slate-500 font-medium">
                      {order.customer_email}
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {order.customer_phone}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase">
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                    <p className="text-[10px] font-black text-cyan-600 uppercase">
                      {order.order_items?.length || 0} Projects
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {/* Status Badge */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                      {order.status.replace("_", " ")}
                    </span>
                    {/* Paid Badge */}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase border ${
                        order.is_paid
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-red-100 text-red-700 border-red-200"
                      }`}
                    >
                      {order.is_paid ? "Paid" : "Unpaid"}
                    </span>
                  </div>

                  <button
                    onClick={() => fetchData(order.id)}
                    className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-cyan-500 hover:text-white transition-all shadow-sm"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: Traditional Table */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-5 font-black">Date</th>
                  <th className="p-5 font-black">Customer Information</th>
                  <th className="p-5 font-black text-center">Items</th>
                  <th className="p-5 font-black">Design Status</th>
                  <th className="p-5 font-black">Payment & Status</th>
                  <th className="p-5 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors group"
                  >
                    <td className="p-5">
                      <p className="text-sm text-slate-600 font-bold">
                        {new Date(order.created_at).toLocaleDateString()}
                      </p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        #{order.id.slice(0, 8)}
                      </p>
                    </td>
                    <td className="p-5">
                      <p className="font-black text-slate-900 uppercase text-sm">
                        {order.customer_name}
                      </p>
                      <div className="flex flex-col text-xs text-slate-500">
                        <span>{order.customer_email}</span>
                        <span className="font-mono text-[10px]">
                          {order.customer_phone}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-center">
                      <span className="bg-slate-100 text-slate-900 px-2 py-1 rounded font-black text-xs">
                        {order.order_items?.length || 0}
                      </span>
                    </td>
                    <td className="p-5">
                      {order.is_custom_design ? (
                        <span className="flex items-center gap-1.5 text-[10px] font-black text-orange-600 uppercase">
                          <span className="w-2 h-2 bg-orange-500 rounded-full" />
                          Custom Build
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-slate-400 uppercase">
                          Standard
                        </span>
                      )}
                    </td>
                    <td className="p-5">
                      <div className="flex flex-col gap-1">
                        <span className="w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                          {order.status.replace("_", " ")}
                        </span>
                        <span
                          className={`w-fit px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                            order.is_paid
                              ? "bg-green-100 text-green-700 border-green-200"
                              : "bg-red-100 text-red-700 border-red-200"
                          }`}
                        >
                          {order.is_paid ? "Paid" : "Unpaid"}
                        </span>
                      </div>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => fetchData(order.id)} // Fetch fresh details by ID
                        className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-tighter hover:bg-cyan-600 transition-all shadow-sm active:scale-95"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          setOrders={setOrders}
          setSelectedOrder={setSelectedOrder}
          onClose={() => refreshData()}
        />
      )}
    </div>
  );
}

///
const handleStatusUpdate = async (orderId, newStatus) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/print-jobs/${orderId}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      },
    );

    if (response.ok) {
      const updatedOrder = await response.json();
      // Update the main orders list state
      setOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: updatedOrder.status } : o,
        ),
      );
      // Update the currently selected modal view
      setSelectedOrder((prev) => ({ ...prev, status: updatedOrder.status }));
      alert("Status updated successfully!");
    }
  } catch (err) {
    console.error("Failed to update status", err);
  }
};

//

function OrderModal({ order, setOrders, setSelectedOrder, onClose }) {
  const [isPaid, setIsPaid] = useState(order.is_paid || false);
  const [comments, setComments] = useState(order.pay_comments || "");
  const [isSaving, setIsSaving] = useState(false);
  const statuses = [
    "pending_quote",
    "on progress",
    "ready for pickup",
    "complete",
  ];

  // Add this helper function inside MasterDashboard.jsx or OrderModal.jsx
  const handlePaymentUpdate = async (
    orderId,
    paymentData,
    setOrders,
    setSelectedOrder,
  ) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/print-jobs/${orderId}/payment`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(paymentData),
        },
      );

      if (response.ok) {
        const updatedData = await response.json();
        // Update global list
        setOrders((prev) =>
          prev.map((o) => (o.id === orderId ? { ...o, ...updatedData } : o)),
        );
        // Update modal view
        setSelectedOrder((prev) => ({ ...prev, ...updatedData }));
        alert("Payment details updated!");
      }
    } catch (err) {
      console.error("Failed to update payment", err);
    }
  };

  const onSavePayment = async () => {
    setIsSaving(true);
    await handlePaymentUpdate(
      order.id,
      { is_paid: isPaid, pay_comments: comments },
      setOrders,
      setSelectedOrder,
    );
    setIsSaving(false);
  };
  if (!order)
    return (
      <div className="p-8 text-center text-slate-500">
        Loading order details...
      </div>
    );
  // Calculate the total estimated price
  const orderTotal = order.order_items.reduce(
    (sum, item) => sum + Number(item.estimated_price) * item.quantity,
    0,
  );

  // Format the date nicely
  const formattedDate = new Date(order.created_at).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Helper function for status badge colors
  const getStatusBadge = (status) => {
    switch (status) {
      case "pending_quote":
        return (
          <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Pending Quote
          </span>
        );
      case "approved":
        return (
          <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-wider rounded-full">
            Approved
          </span>
        );
      case "printing":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider rounded-full">
            In Production
          </span>
        );
      default:
        return (
          <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-bold uppercase tracking-wider rounded-full">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="w-full max-w-5xl bg-slate-50 rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto font-sans text-slate-900 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-all"
        >
          <span className="text-lg font-bold px-1">✕</span>
        </button>

        <div className="p-4 sm:p-8">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                  Order Details
                </h1>
                {order.is_custom_design && (
                  <span className="bg-orange-500 text-white text-[10px] font-black px-2 py-1 rounded italic uppercase shadow-sm">
                    Custom Project
                  </span>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1 font-mono bg-slate-200 px-2 py-1 rounded text-slate-700">
                  <Hash size={14} /> {order.id.slice(0, 8)}...
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {formattedDate}
                </span>
                <span className="flex items-center gap-1">
                  <Phone size={14} /> {order.customer_phone}
                </span>
              </div>
              <div className="mt-3">
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase border ${
                    order.is_paid
                      ? "bg-green-100 text-green-700 border-green-200"
                      : "bg-red-100 text-red-700 border-red-200"
                  }`}
                >
                  {order.is_paid ? "● Fully Paid" : "○ Awaiting Payment"}
                </span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              {/* Print Jobs Section */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-4 py-3 sm:px-6 sm:py-4 border-b border-slate-200 flex items-center gap-2">
                  <Package size={18} className="text-orange-400" />
                  <h2 className="text-sm sm:text-lg font-bold text-white uppercase tracking-wider">
                    Print Jobs ({order.order_items.length})
                  </h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.order_items.map((item) => (
                    <div
                      key={item.id}
                      className="p-4 sm:p-6 flex flex-col sm:flex-row gap-4 sm:gap-6 hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group">
                        {item.artwork_url ? (
                          <>
                            <img
                              src={item.artwork_url}
                              className="w-full h-full object-cover"
                              alt="Artwork"
                            />
                            <a
                              href={item.artwork_url}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
                            >
                              <ExternalLink size={20} className="text-white" />
                            </a>
                          </>
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 uppercase font-black text-[10px]">
                            <ImageIcon size={20} className="mb-1" /> No File
                          </div>
                        )}
                      </div>

                      <div className="flex-1 space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-black text-slate-900 uppercase italic leading-tight">
                              {item.product_name}
                            </h3>
                            {item.is_custom_design && (
                              <span className="text-[9px] font-black text-orange-600 uppercase tracking-tighter">
                                + Professional Design Required
                              </span>
                            )}
                          </div>
                          <p className="font-black text-slate-900">
                            ${(item.estimated_price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs">
                          <p className="text-slate-500 font-medium">
                            <span className="text-slate-400 uppercase text-[10px] block">
                              Size
                            </span>
                            {item.size}
                          </p>
                          <p className="text-slate-500 font-medium">
                            <span className="text-slate-400 uppercase text-[10px] block">
                              Quantity
                            </span>
                            {item.quantity}
                          </p>
                          <p className="text-slate-500 font-medium col-span-2">
                            <span className="text-slate-400 uppercase text-[10px] block">
                              Material
                            </span>
                            {item.material}
                          </p>
                        </div>

                        {item.customer_notes && (
                          <div className="mt-3 bg-slate-50 border-l-2 border-slate-300 p-2">
                            <p className="text-[11px] text-slate-400 uppercase font-black mb-0.5 tracking-tight">
                              Customer Instructions:
                            </p>
                            <p className="text-xs text-slate-600 italic">
                              "{item.customer_notes}"
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Management */}
              <div className="bg-white border-2 border-slate-900 rounded-xl shadow-md overflow-hidden">
                <div className="bg-slate-900 px-6 py-3 border-b border-slate-200">
                  <h2 className="text-xs font-black text-white uppercase tracking-[0.2em]">
                    Manage Payment
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-black text-slate-700 uppercase tracking-wider">
                      Payment Received?
                    </label>
                    <button
                      onClick={() => setIsPaid(!isPaid)}
                      className={`w-14 h-7 rounded-full transition-all relative ${isPaid ? "bg-green-500" : "bg-slate-300"}`}
                    >
                      <div
                        className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all shadow-sm ${isPaid ? "left-8" : "left-1"}`}
                      />
                    </button>
                  </div>
                  <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Log internal payment notes or transaction IDs..."
                    className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none h-20"
                  />
                  <button
                    onClick={onSavePayment}
                    disabled={isSaving}
                    className="w-full bg-slate-900 hover:bg-orange-500 text-white font-black py-3 rounded-lg transition-all text-[10px] uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {isSaving ? "Updating..." : "Update Order Status"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200">
                  <h2 className="text-xs font-black text-slate-900 uppercase">
                    Customer
                  </h2>
                </div>
                <div className="p-4 sm:p-6 space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                      <User size={16} />
                    </div>
                    <p className="font-black text-slate-900 uppercase text-sm leading-none">
                      {order.customer_name}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <a
                      href={`mailto:${order.customer_email}`}
                      className="text-xs text-blue-600 block truncate font-medium underline underline-offset-4"
                    >
                      {order.customer_email}
                    </a>
                    <p className="text-[10px] text-slate-400 font-mono">
                      {order.customer_phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-100 px-6 py-3 border-b border-slate-200 font-black text-xs uppercase">
                  Summary
                </div>
                <div className="p-4 sm:p-6 space-y-4">
                  <div className="flex justify-between text-lg font-black italic">
                    <span>EST. TOTAL</span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="pt-2">
                    <OrderStatusBadge
                      orderId={order.id}
                      initialStatus={order.status}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
