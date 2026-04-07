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
  debugger;

  useEffect(() => {
    // Replace with your actual NestJS API URL
    fetch(`${import.meta.env.VITE_API_URL}/print-jobs/admin/dashboard`)
      .then((res) => res.json())
      .then((data) => {
        setOrders(data);
        setLoading(false);
      });
  }, []);

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
          <table className="w-full text-left">
            <thead className="bg-slate-900 text-white text-xs uppercase tracking-widest">
              <tr>
                <th className="p-5">Order Date</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Status</th>
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

      {/* Detail Modal */}
      {selectedOrder && (
        <OrderModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
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

function OrderModal({ order, onClose }) {
  const statuses = [
    "pending_quote",
    "on progress",
    "ready for pickup",
    "complete",
  ];
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
    <div>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
        {/* <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-6 border-b bg-slate-50 flex justify-between items-center">
            <h2 className="text-xl font-black uppercase">Manage Order</h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-900 text-2xl"
            >
              &times;
            </button>
          </div>

          <div className="p-8">
            <div className="mb-8">
              <label className="block text-xs font-bold text-slate-400 uppercase mb-3 tracking-widest">
                Current Workflow Status
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {statuses.map((s) => (
                  <button
                    key={s}
                    className={`py-2 px-1 rounded-lg text-[10px] font-black uppercase border-2 transition-all ${
                      order.status === s
                        ? "bg-yellow-500 border-yellow-500 text-slate-900 shadow-md scale-105"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Customer
                </p>
                <p className="text-lg font-bold">{order.customer_name}</p>
              </div>
              <div className="text-right">
                <p className="text-[10px] font-bold text-slate-400 uppercase">
                  Order Total
                </p>
                <p className="text-2xl font-black text-yellow-500">
                  ${order.total_price || "0"}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 border-t bg-slate-50 text-center">
            <p className="text-xs text-slate-400 font-medium italic">
              Changing status will update the customer's portal and internal
              logs.
            </p>
          </div>
        </div> */}
        <div className="max-w-5xl mx-auto p-6 bg-slate-50 min-h-screen font-sans text-slate-900">
          {/* <div>
            <OrderStatusBadge orderId={order.id} initialStatus={order.status} />
          </div> */}
          {/* Header Section */}

          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Order Details
              </h1>
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-slate-500">
                <span className="flex items-center gap-1 font-mono bg-slate-200 px-2 py-1 rounded text-slate-700">
                  <Hash size={14} /> {order.id.slice(0, 13)}...
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={14} /> {formattedDate}
                </span>
              </div>
            </div>
            {/* <div>{getStatusBadge(order.status)}</div> */}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column: Line Items */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-900 px-6 py-4 border-b border-slate-200 flex items-center gap-2">
                  <Package size={20} className="text-orange-400" />
                  <h2 className="text-lg font-bold text-white">
                    Print Jobs ({order.order_items.length})
                  </h2>
                </div>

                <div className="divide-y divide-slate-100">
                  {order.order_items.map((item, index) => (
                    <div
                      key={item.id}
                      className="p-6 flex flex-col sm:flex-row gap-6 hover:bg-slate-50 transition-colors"
                    >
                      {/* Artwork Thumbnail */}
                      <div className="w-full sm:w-32 h-32 flex-shrink-0 bg-slate-100 rounded-lg border border-slate-200 flex flex-col items-center justify-center overflow-hidden relative group">
                        {item.artwork_url ? (
                          <>
                            <img
                              src={item.artwork_url}
                              alt={`Artwork for ${item.product_name}`}
                              className="w-full h-full object-cover"
                            />
                            <a
                              href={item.artwork_url}
                              target="_blank"
                              rel="noreferrer"
                              className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white text-xs font-bold"
                            >
                              View Full
                            </a>
                          </>
                        ) : (
                          <div className="text-slate-400 flex flex-col items-center">
                            <ImageIcon size={24} className="mb-1 opacity-50" />
                            <span className="text-[10px] uppercase font-bold tracking-wider">
                              No File
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Item Details */}
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-lg text-slate-900">
                            {item.product_name}
                          </h3>
                          <p className="font-bold text-lg text-slate-900">
                            ${Number(item.estimated_price).toFixed(2)}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-y-1 mb-3 text-sm">
                          <p className="text-slate-500">
                            <span className="font-medium text-slate-700">
                              Size:
                            </span>{" "}
                            {item.size}
                          </p>
                          <p className="text-slate-500">
                            <span className="font-medium text-slate-700">
                              Qty:
                            </span>{" "}
                            {item.quantity}
                          </p>
                          <p className="text-slate-500 col-span-2">
                            <span className="font-medium text-slate-700">
                              Material:
                            </span>{" "}
                            {item.material}
                          </p>
                        </div>

                        {item.customer_notes && (
                          <div className="bg-orange-50 border border-orange-100 text-orange-800 text-sm p-3 rounded-lg flex items-start gap-2 mt-2">
                            <FileText
                              size={16}
                              className="mt-0.5 flex-shrink-0"
                            />
                            <p>{item.customer_notes}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Customer & Financials */}
            <div className="space-y-6">
              {/* Customer Card */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">
                    Customer Details
                  </h2>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3 text-slate-700">
                    <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                      <User size={18} />
                    </div>
                    <p className="font-medium text-lg">{order.customer_name}</p>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                      <Mail size={18} />
                    </div>
                    <a
                      href={`mailto:${order.customer_email}`}
                      className="hover:text-blue-600 transition-colors break-all"
                    >
                      {order.customer_email}
                    </a>
                  </div>
                  <div className="flex items-center gap-3 text-slate-600">
                    <div className="bg-slate-100 p-2 rounded-full text-slate-500">
                      <Phone size={18} />
                    </div>
                    <a
                      href={`tel:${order.customer_phone}`}
                      className="hover:text-blue-600 transition-colors"
                    >
                      {order.customer_phone || (
                        <span className="italic text-slate-400">
                          Not provided
                        </span>
                      )}
                    </a>
                  </div>
                </div>
              </div>

              {/* Quote Summary Card */}
              <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
                <div className="bg-slate-100 px-6 py-4 border-b border-slate-200">
                  <h2 className="text-lg font-bold text-slate-900">
                    Quote Summary
                  </h2>
                </div>
                <div className="p-6 space-y-3">
                  <div className="flex justify-between text-sm text-slate-600">
                    <span>
                      Subtotal (
                      {order.order_items.reduce(
                        (sum, item) => sum + item.quantity,
                        0,
                      )}{" "}
                      items)
                    </span>
                    <span>${orderTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-slate-600 pb-3 border-b border-slate-100">
                    <span>Estimated Tax & Shipping</span>
                    <span className="italic">To be calculated</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-bold text-lg text-slate-900">
                      Est. Total
                    </span>
                    <span className="font-bold text-2xl text-slate-900">
                      ${orderTotal.toFixed(2)}
                    </span>
                  </div>

                  <div className="pt-6">
                    <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-lg transition-colors shadow-sm">
                      <div>
                        <OrderStatusBadge
                          orderId={order.id}
                          initialStatus={order.status}
                        />
                      </div>
                    </button>
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
