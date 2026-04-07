import React, { useState } from "react";
import { Loader2, ChevronDown } from "lucide-react";

const STATUS_OPTIONS = [
  { value: "pending_quote", label: "Pending Quote" },
  { value: "shop requests more instructions", label: "Needs Instructions" },
  { value: "cancelled", label: "Cancelled" },
  { value: "in printing queue", label: "In Printing Queue" },
  { value: "printing", label: "Printing" },
  { value: "applying protection film", label: "Applying Protection Film" },
  { value: "packing", label: "Packing" },
  { value: "ready for pickup", label: "Ready for Pickup" },
  { value: "complete", label: "Complete" },
];

const OrderStatusBadge = ({ orderId, initialStatus = "pending_quote" }) => {
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [isUpdating, setIsUpdating] = useState(false);
  debugger;

  // Dynamic color mapping based on the active status
  const getColorClasses = (status) => {
    switch (status) {
      case "pending_quote":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "shop requests more instructions":
        return "bg-red-100 text-red-800 border-red-200";
      case "cancelled":
        return "bg-slate-200 text-slate-600 border-slate-300";
      case "in printing queue":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "printing":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "applying protection film":
        return "bg-teal-100 text-teal-800 border-teal-200";
      case "packing":
        return "bg-indigo-100 text-indigo-800 border-indigo-200";
      case "ready for pickup":
      case "complete":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  const handleStatusChange = async (e) => {
    debugger;
    const newStatus = e.target.value;
    const previousStatus = currentStatus;

    // Optimistically update the UI so it feels instantaneous to the user
    setCurrentStatus(newStatus);
    setIsUpdating(true);

    try {
      // NOTE: Replace the URL with your actual Render backend URL or environment variable
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/print-jobs/${orderId}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: newStatus }),
        },
      );
      debugger;

      if (!response.ok) {
        throw new Error("Failed to update status on the server.");
      }
      debugger;

      console.log(`Order ${orderId} successfully updated to ${newStatus}`);
    } catch (error) {
      debugger;
      console.error(error);
      alert("Error saving status. Reverting change.");
      // Revert the UI back to the old status if the database update failed
      setCurrentStatus(previousStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative inline-flex items-center">
      <select
        value={currentStatus}
        onChange={handleStatusChange}
        disabled={isUpdating}
        className={`appearance-none border text-xs font-bold uppercase tracking-wider rounded-full pl-3 pr-8 py-1.5 cursor-pointer outline-none transition-colors shadow-sm ${getColorClasses(currentStatus)} ${isUpdating ? "opacity-70 cursor-not-allowed" : "hover:brightness-95"}`}
      >
        {STATUS_OPTIONS.map((opt) => (
          <option
            key={opt.value}
            value={opt.value}
            className="bg-white text-slate-900 font-medium normal-case"
          >
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom dropdown icon overlay (replaces the ugly default browser arrow) */}
      <div className="absolute right-2 pointer-events-none flex items-center">
        {isUpdating ? (
          <Loader2 size={14} className="animate-spin text-current opacity-70" />
        ) : (
          <ChevronDown size={14} className="text-current opacity-70" />
        )}
      </div>
    </div>
  );
};

export default OrderStatusBadge;
