import React from "react";
import {
  CheckCircle,
  Printer,
  ArrowLeft,
  FileText,
  AlertCircle,
} from "lucide-react";
import OrderLookup from "../OrderLookup/OrderLookup";

const OrderConfirmation = ({ orderData, onReset }) => {
  // Extracting data from the API response
  const { message, data, items, totalAmount, createdAt } = orderData;

  return (
    <div className="max-w-3xl mx-auto py-12 px-6 animate-in zoom-in-95 duration-500">
      <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Success Header */}
        <div className="bg-slate-900 p-10 text-center text-white">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-orange-500 rounded-full mb-6 shadow-lg">
            <CheckCircle size={40} className="text-slate-900" />
          </div>
          <h2 className="text-3xl font-black tracking-tight uppercase mb-2">
            Quote Request Received
          </h2>
          <p className="text-slate-400">
            Order Reference:{" "}
            <span className="text-orange-400 font-mono font-bold tracking-widest">
              #{data["orderId"]}
            </span>
          </p>
          <a
            href={`https://maximusvinylwraps.com/track-order?ordernumber=${data["orderId"]}`}
          >
            Track Order #{data.orderId}
          </a>
        </div>

        <div className="p-8 md:p-12">
          <div className="space-y-8">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-slate-800">{message}!</h3>
              <h3 className="text-2xl font-bold text-slate-800">
                Thanks for choosing Maximus, !
              </h3>
              <p className="text-slate-600 mt-3 leading-relaxed">
                We've received your printing specifications. Our production team
                is currently reviewing your artwork and materials to ensure the
                highest quality finish.
              </p>
            </div>

            {/* Crucial Extra Cost Disclaimer */}
            <div className="bg-orange-50 border-l-4 border-orange-500 p-5 rounded-r-xl">
              <div className="flex gap-4">
                <AlertCircle className="text-orange-600 shrink-0" size={24} />
                <div>
                  <h4 className="font-bold text-orange-900 text-sm uppercase tracking-wide">
                    Important Adjustment Policy
                  </h4>
                  <p className="text-sm text-orange-800 mt-1 leading-relaxed">
                    Please review your Email(even Junk folder) and text
                    messages, We will be reaching out to you shortly.
                    <strong>
                      In this step we will talk about the printing and payment
                      details.
                    </strong>{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-12 flex flex-col sm:flex-row gap-4">
            <button
              onClick={onReset}
              className="flex-1 flex items-center justify-center gap-2 border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-gray-50 hover:border-slate-300 transition-all"
            >
              <ArrowLeft size={18} /> New Request
            </button>
            <button
              onClick={() => window.print()}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 shadow-xl transition-all"
            >
              <Printer size={18} /> Save as PDF
            </button>
          </div>
        </div>
      </div>

      <p className="text-center text-gray-400 text-xs mt-8">
        Maximus Vinyl Wraps • Oklahoma City, OK
      </p>
    </div>
  );
};

export default OrderConfirmation;
