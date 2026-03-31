import React, { useEffect, useState } from "react";

export default function MasterDashboard() {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loading, setLoading] = useState(true);

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

function OrderModal({ order, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        <div className="p-6 border-b flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black uppercase">
            Order Details: {order.customer_name}
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-900 text-2xl font-bold"
          >
            &times;
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="p-4 bg-gray-50 rounded-xl">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">
                Contact Info
              </p>
              <p className="text-sm font-bold">{order.customer_email}</p>
              <p className="text-sm font-bold">
                {order.customer_phone || "No Phone provided"}
              </p>
            </div>
            {/* Add more summary stats here if needed */}
          </div>

          <h3 className="font-black text-sm uppercase tracking-widest mb-4 text-yellow-600">
            Line Items & Artwork
          </h3>
          <div className="space-y-4">
            {order.order_items.map((item) => (
              <div
                key={item.id}
                className="border rounded-2xl p-5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
              >
                <div>
                  <p className="font-black text-slate-900">
                    {item.product_name}
                  </p>
                  <p className="text-xs text-slate-500">
                    Qty: {item.quantity} | Size: {item.size} | Material:{" "}
                    {item.material}
                  </p>
                </div>

                {item.artwork_url ? (
                  <a
                    href={item.artwork_url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 hover:text-white transition-all"
                  >
                    View Artwork ↗
                  </a>
                ) : (
                  <span className="text-[10px] font-bold text-slate-300 uppercase">
                    No file uploaded
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="p-6 border-t bg-slate-50 flex justify-end">
          <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold uppercase text-xs tracking-widest">
            Print Order Summary
          </button>
        </div>
      </div>
    </div>
  );
}
