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
} from "lucide-react";
import OrderStatusBadge from "../OrderStatusBadge/OrderStatusBadge";

export default function MasterDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    fetch(`${import.meta.env.VITE_API_URL}/print-jobs/admin/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refreshData = () => {
    console.log("Data refresh triggered from child component.");
    setSelectedOrder(null);
    fetchData(); // Simply re-run the existing fetch function
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
          {/* MOBILE VIEW: Stacked Cards (visible only on small screens) */}
          <div className="md:hidden divide-y divide-slate-100">
            {orders.map((order) => (
              <div
                key={order.id}
                className="p-4 space-y-3 hover:bg-slate-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-black text-slate-900 uppercase text-sm">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.customer_email}
                    </p>
                  </div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex gap-2">
                    {/* Status Badge */}
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                      {order.status}
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
                    onClick={() => setSelectedOrder(order)}
                    className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider hover:bg-yellow-500 hover:text-slate-900 transition-all"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* DESKTOP VIEW: Traditional Table (hidden on mobile) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-[10px] uppercase tracking-widest">
                <tr>
                  <th className="p-5 font-black">Order Date</th>
                  <th className="p-5 font-black">Customer</th>
                  <th className="p-5 font-black">Status</th>
                  <th className="p-5 font-black">Paid</th>
                  <th className="p-5 text-right font-black">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="p-5 text-sm text-slate-600 font-medium">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="p-5">
                      <p className="font-bold text-slate-900">
                        {order.customer_name}
                      </p>
                      <p className="text-xs text-slate-500">
                        {order.customer_email}
                      </p>
                    </td>
                    <td className="p-5">
                      <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-5">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${
                          order.is_paid
                            ? "bg-green-100 text-green-700 border-green-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        {order.is_paid ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500 hover:text-slate-900 transition-all"
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
        {/* <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
              <tr>
                <th className="p-5">Order Date</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Status</th>
                <th className="p-5">Paid</th>
                <th className="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="p-5 text-sm text-slate-600 font-medium">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-slate-900">
                      {order.customer_name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {order.customer_email}
                    </p>
                  </td>
                  <td className="p-5">
                    <span className="px-3 py-1 rounded-full text-xs font-black uppercase bg-yellow-100 text-yellow-700 border border-yellow-200">
                      {order.status}
                    </span>
                  </td>
                  <td className="p-5">
                    <p className="font-bold text-black-900">
                      <span
                        className={`
                        px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${
                          order.is_paid
                            ? "bg-green-900/30 text-green-400" // Dark Mode Style
                            : "bg-red-900/30 text-red-400" // Dark Mode Style
                        }
                        `}
                      >
                        {order.is_paid ? "Yes" : "No"}
                      </span>
                    </p>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="bg-slate-900 text-white px-4 py-2 rounded-lg text-xs font-bold hover:bg-yellow-500 hover:text-slate-900 transition-all"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
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
      {/* Modal Container: Added max-height and scrolling for mobile */}
      <div className="w-full max-w-5xl bg-slate-50 rounded-2xl shadow-2xl max-h-[95vh] overflow-y-auto font-sans text-slate-900 relative">
        {/* Sticky/Fixed Close Button for easier access */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-slate-600 shadow-sm transition-all"
        >
          <span className="text-lg font-bold px-1">✕</span>
        </button>

        <div className="p-4 sm:p-8">
          {/* Header Section: Adjusted text sizes for mobile */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 sm:mb-8 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight">
                Order Details
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-xs sm:text-sm text-slate-500">
                <span className="flex items-center gap-1 font-mono bg-slate-200 px-2 py-1 rounded text-slate-700">
                  <Hash size={14} /> {order.id.slice(0, 8)}...
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {formattedDate}
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

          {/* Main Grid: 1 Column on mobile, 3 Columns on LG screens */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left/Main Column */}
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
                      {/* Artwork Thumbnail - Larger on mobile for visibility */}
                      <div className="w-full sm:w-32 h-48 sm:h-32 flex-shrink-0 bg-slate-100 rounded-lg border border-slate-200 overflow-hidden relative group">
                        {item.artwork_url ? (
                          <img
                            src={item.artwork_url}
                            className="w-full h-full object-cover"
                            alt="Artwork"
                          />
                        ) : (
                          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 uppercase font-black text-[10px]">
                            <ImageIcon size={20} className="mb-1" /> No File
                          </div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-black text-slate-900 uppercase italic leading-tight">
                            {item.product_name}
                          </h3>
                          <p className="font-black text-slate-900">
                            ${Number(item.estimated_price).toFixed(2)}
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-2 mt-3 text-xs">
                          <p className="text-slate-500 font-medium">
                            <span className="text-slate-400 uppercase text-[10px]">
                              Size:
                            </span>{" "}
                            {item.size}
                          </p>
                          <p className="text-slate-500 font-medium">
                            <span className="text-slate-400 uppercase text-[10px]">
                              Qty:
                            </span>{" "}
                            {item.quantity}
                          </p>
                          <p className="text-slate-500 font-medium col-span-2">
                            <span className="text-slate-400 uppercase text-[10px]">
                              Material:
                            </span>{" "}
                            {item.material}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Management Section (Full Width on Mobile) */}
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
                    placeholder="Internal notes..."
                    className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none h-20"
                  />
                  <button
                    onClick={onSavePayment}
                    disabled={isSaving}
                    className="w-full bg-slate-900 hover:bg-orange-500 text-white font-black py-3 rounded-lg transition-all text-[10px] uppercase tracking-[0.2em] disabled:opacity-50"
                  >
                    {isSaving ? "Updating..." : "Update Payment Info"}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Sidebar (Stacks below on mobile) */}
            <div className="space-y-6">
              {/* Customer Card */}
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
                    <p className="font-black text-slate-900 uppercase text-sm">
                      {order.customer_name}
                    </p>
                  </div>
                  <a
                    href={`mailto:${order.customer_email}`}
                    className="text-xs text-blue-600 block truncate font-medium underline underline-offset-4"
                  >
                    {order.customer_email}
                  </a>
                </div>
              </div>

              {/* Quote Summary Card */}
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
    // <div>
    //   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
    //     <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen font-sans text-slate-900">
    //       {/* Header Section */}

    //       <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
    //         <div>
    //           <h1 className="text-3xl font-bold flex items-center gap-2">
    //             Order Details
    //           </h1>
    //           <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
    //             <span className="flex items-center gap-1 font-mono bg-slate-200 px-2 py-1 rounded text-slate-700">
    //               <Hash size={14} /> {order.id.slice(0, 13)}...
    //             </span>
    //             <span className="flex items-center gap-1">
    //               <Calendar size={14} /> {formattedDate}
    //             </span>
    //           </div>
    //         </div>
    //         {/* <div>{getStatusBadge(order.status)}</div> */}
    //       </div>

    //       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
    //         {/* Left Column: Line Items */}
    //         <div className="lg:col-span-2 space-y-6">
    //           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    //             <div className="bg-slate-900 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
    //               <Package size={20} className="text-orange-400" />
    //               <h2 className="text-lg font-bold text-white">
    //                 Print Jobs ({order.order_items.length})
    //               </h2>
    //             </div>

    //             <div className="divide-y divide-slate-100">
    //               {order.order_items.map((item, index) => (
    //                 <div
    //                   key={item.id}
    //                   className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors"
    //                 >
    //                   {/* Artwork Thumbnail */}
    //                   <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group">
    //                     {item.artwork_url ? (
    //                       <>
    //                         <img
    //                           src={item.artwork_url}
    //                           alt={`Artwork for ${item.product_name}`}
    //                           className="w-full h-full object-cover"
    //                         />
    //                         <a
    //                           href={item.artwork_url}
    //                           target="_blank"
    //                           rel="noreferrer"
    //                           className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
    //                         >
    //                           View Full
    //                         </a>
    //                       </>
    //                     ) : (
    //                       <div className="text-slate-400 flex flex-col items-center">
    //                         <ImageIcon size={24} className="mb-1 opacity-50" />
    //                         <span className="text-[10px] uppercase font-bold tracking-wider">
    //                           No File
    //                         </span>
    //                       </div>
    //                     )}
    //                   </div>

    //                   {/* Item Details */}
    //                   <div className="flex-1">
    //                     <div className="flex justify-between items-start mb-1">
    //                       <h3 className="font-bold text-lg text-slate-900">
    //                         {item.product_name}
    //                       </h3>
    //                       <p className="font-bold text-lg text-slate-900">
    //                         ${Number(item.estimated_price).toFixed(2)}
    //                       </p>
    //                     </div>

    //                     <div className="grid grid-cols-2 gap-y-1 mb-3 text-sm">
    //                       <p className="text-slate-500">
    //                         <span className="font-medium text-slate-700">
    //                           Size:
    //                         </span>{" "}
    //                         {item.size}
    //                       </p>
    //                       <p className="text-slate-500">
    //                         <span className="font-medium text-slate-700">
    //                           Qty:
    //                         </span>{" "}
    //                         {item.quantity}
    //                       </p>
    //                       <p className="text-slate-500 col-span-2">
    //                         <span className="font-medium text-slate-700">
    //                           Material:
    //                         </span>{" "}
    //                         {item.material}
    //                       </p>
    //                     </div>

    //                     {item.customer_notes && (
    //                       <div className="bg-orange-50 border border-orange-100 text-orange-800 text-sm p-3 rounded-lg flex items-start gap-2 mt-2">
    //                         <FileText
    //                           size={16}
    //                           className="mt-0.5 flex-shrink-0"
    //                         />
    //                         <p>{item.customer_notes}</p>
    //                       </div>
    //                     )}
    //                   </div>
    //                 </div>
    //               ))}
    //             </div>
    //           </div>
    //           {/* new section order pay and pay comments here */}
    //           <div className=" flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
    //             <div className="max-w-5xl w-full mx-auto my-8 p-6 bg-slate-50 rounded-2xl font-sans text-slate-900 relative">
    //               {/* Header Section */}
    //               <div className="mb-8">
    //                 <h1 className="text-3xl font-bold">Order Details</h1>
    //                 <div className="flex gap-4 mt-2">
    //                   <span
    //                     className={`px-3 py-1 rounded-full text-xs font-black uppercase border ${order.is_paid ? "bg-green-100 text-green-700 border-green-200" : "bg-red-100 text-red-700 border-red-200"}`}
    //                   >
    //                     {order.is_paid ? "● Fully Paid" : "○ Awaiting Payment"}
    //                   </span>
    //                 </div>
    //               </div>

    //               <div className="grid grid-cols-1 ">
    //                 <div>
    //                   {/* NEW: Payment Management Card */}
    //                   <div className="bg-white border-2 border-slate-900 rounded-xl shadow-md overflow-hidden">
    //                     <div className="bg-slate-900 px-6 py-3 border-b border-slate-200">
    //                       <h2 className="text-sm font-black text-white uppercase tracking-widest">
    //                         Manage Payment
    //                       </h2>
    //                     </div>
    //                     <div className="p-6 space-y-4">
    //                       <div className="flex items-center justify-between">
    //                         <label className="text-sm font-bold text-slate-700 uppercase">
    //                           Payment Received?
    //                         </label>
    //                         <button
    //                           onClick={() => setIsPaid(!isPaid)}
    //                           className={`rounded-full transition-colors relative ${isPaid ? "bg-green-500" : "bg-slate-300"}`}
    //                         >
    //                           is Paid?
    //                         </button>
    //                       </div>

    //                       <div>
    //                         <label className="text-xs font-bold text-slate-500 uppercase block mb-1">
    //                           Internal Pay Comments
    //                         </label>
    //                         <textarea
    //                           value={comments}
    //                           onChange={(e) => setComments(e.target.value)}
    //                           placeholder="e.g. Paid via Zelle / Check #1234"
    //                           className="w-full p-3 text-sm border border-slate-200 rounded-lg bg-slate-50 focus:ring-2 focus:ring-orange-500 outline-none h-24"
    //                         />
    //                       </div>

    //                       <button
    //                         onClick={onSavePayment}
    //                         disabled={isSaving}
    //                         className="w-full bg-slate-900 hover:bg-orange-500 text-white font-bold py-2 rounded-lg transition-all text-xs uppercase tracking-widest disabled:opacity-50"
    //                       >
    //                         {isSaving ? "Updating..." : "Update Payment Info"}
    //                       </button>
    //                     </div>
    //                   </div>

    //                   {/* ... Customer Details and Quote Summary sections ... */}
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //           {/* end of pay ad pay_comments section */}
    //         </div>

    //         {/* Right Column: Customer & Financials */}
    //         <div className="space-y-6">
    //           {/* Customer Card */}
    //           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    //             <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
    //               <h2 className="text-lg font-bold text-slate-900">
    //                 Customer Details
    //               </h2>
    //             </div>
    //             <div className="p-6 space-y-4">
    //               <div className="flex items-center gap-3 text-slate-700">
    //                 <div className="bg-slate-100 p-2 rounded-full text-slate-500">
    //                   <User size={18} />
    //                 </div>
    //                 <p className="font-medium text-lg">{order.customer_name}</p>
    //               </div>
    //               <div className="flex items-center gap-3 text-slate-600">
    //                 <div className="bg-slate-100 p-2 rounded-full text-slate-500">
    //                   <Mail size={18} />
    //                 </div>
    //                 <a
    //                   href={`mailto:${order.customer_email}`}
    //                   className="hover:text-blue-600 transition-colors break-all"
    //                 >
    //                   {order.customer_email}
    //                 </a>
    //               </div>
    //               <div className="flex items-center gap-3 text-slate-600">
    //                 <div className="bg-slate-100 p-2 rounded-full text-slate-500">
    //                   <Phone size={18} />
    //                 </div>
    //                 <a
    //                   href={`tel:${order.customer_phone}`}
    //                   className="hover:text-blue-600 transition-colors"
    //                 >
    //                   {order.customer_phone || (
    //                     <span className="italic text-slate-400">
    //                       Not provided
    //                     </span>
    //                   )}
    //                 </a>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Quote Summary Card */}
    //           <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
    //             <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
    //               <h2 className="text-lg font-bold text-slate-900">
    //                 Quote Summary
    //               </h2>
    //             </div>
    //             <div className="p-6 space-y-3">
    //               <div className="flex justify-between text-sm text-slate-600">
    //                 <span>
    //                   Subtotal (
    //                   {order.order_items.reduce(
    //                     (sum, item) => sum + item.quantity,
    //                     0,
    //                   )}{" "}
    //                   items)
    //                 </span>
    //                 <span>${orderTotal.toFixed(2)}</span>
    //               </div>
    //               <div className="flex justify-between text-sm text-slate-600 pb-3 border-b border-slate-100">
    //                 <span>Estimated Tax & Shipping</span>
    //                 <span className="italic">To be calculated</span>
    //               </div>
    //               <div className="flex justify-between items-center pt-2">
    //                 <span className="font-bold text-lg text-slate-900">
    //                   Est. Total
    //                 </span>
    //                 <span className="font-bold text-2xl text-slate-900">
    //                   ${orderTotal.toFixed(2)}
    //                 </span>
    //               </div>

    //               <div className="pt-6">
    //                 <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm">
    //                   <div>
    //                     <OrderStatusBadge
    //                       orderId={order.id}
    //                       initialStatus={order.status}
    //                     />
    //                   </div>
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //           <button
    //             onClick={onClose}
    //             className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 font-bold"
    //           >
    //             Close ✕
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}
