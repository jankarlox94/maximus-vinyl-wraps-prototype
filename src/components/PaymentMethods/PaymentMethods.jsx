import React, { useState } from "react";
import {
  CreditCard,
  Banknote,
  ShieldCheck,
  Info,
  Copy,
  CheckCircle2,
} from "lucide-react";

const PaymentMethods = () => {
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (text, name) => {
    navigator.clipboard.writeText(text);
    setCopiedId(name);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const methods = [
    {
      name: "Zelle",
      details: "payments@maximuswrap.com",
      icon: <div className="text-purple-600 font-black text-2xl">Z</div>,
    },
    {
      name: "CashApp",
      details: "$MaximusWrapOKC",
      icon: <div className="text-green-500 font-black text-2xl">$</div>,
    },
    {
      name: "PayPal",
      details: "paypal.me/maximuswrap",
      icon: <CreditCard className="text-blue-600 w-7 h-7" />,
    },
    {
      name: "Cash",
      details: "In-person at the shop",
      icon: <Banknote className="text-emerald-600 w-7 h-7" />,
    },
  ];

  return (
    <div className="w-full max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-md border border-gray-100">
      {/* Header & Policy Alert */}
      <div className="mb-6 border-l-4 border-amber-500 bg-amber-50 p-4 rounded-r-xl">
        <div className="flex items-start gap-3">
          <Info className="text-amber-600 w-6 h-6 mt-1 flex-shrink-0" />
          <div>
            <h2 className="text-lg font-bold text-gray-800 uppercase tracking-tight">
              Deposit Policy
            </h2>
            <p className="mt-1 text-gray-700 text-sm sm:text-base leading-relaxed">
              To secure your slot, a{" "}
              <span className="font-bold text-amber-700 underline decoration-2">
                50% minimum deposit
              </span>{" "}
              is required. The balance is due upon completion.
            </p>
          </div>
        </div>
      </div>

      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 px-1">
        <ShieldCheck className="text-green-600 w-5 h-5" /> Choose Your Payment
        Method
      </h3>

      {/* Payment Options Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {methods.map((method) => (
          <button
            key={method.name}
            onClick={() =>
              method.name !== "Cash" && handleCopy(method.details, method.name)
            }
            className={`flex items-center p-4 border-2 rounded-xl transition-all active:scale-[0.98] text-left group
              ${
                copiedId === method.name
                  ? "border-green-500 bg-green-50"
                  : "border-gray-100 hover:border-blue-400 bg-gray-50/50 hover:bg-white"
              }`}
          >
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm
              ${copiedId === method.name ? "bg-white" : "bg-white"}`}
            >
              {method.icon}
            </div>

            <div className="ml-4 flex-grow overflow-hidden">
              <p className="font-bold text-gray-900">{method.name}</p>
              <p className="text-xs sm:text-sm text-gray-500 font-mono truncate">
                {method.details}
              </p>
            </div>

            {method.name !== "Cash" && (
              <div className="ml-2 flex-shrink-0">
                {copiedId === method.name ? (
                  <CheckCircle2 className="text-green-600 w-5 h-5 animate-in zoom-in" />
                ) : (
                  <Copy className="text-gray-300 group-hover:text-blue-500 w-4 h-4" />
                )}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Footer Instructions */}
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="bg-blue-50/50 p-4 rounded-xl text-center">
          <p className="text-xs sm:text-sm text-gray-600">
            Once sent, please{" "}
            <span className="font-bold text-gray-800 underline">
              upload a screenshot
            </span>{" "}
            of your receipt to WhatsApp to confirm your order status.
          </p>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
