import React from "react";
import {
  CheckCircle,
  Printer,
  ArrowLeft,
  FileText,
  AlertCircle,
} from "lucide-react";
import PaymentMethods from "../PaymentMethods/PaymentMethods";

const OrderConfirmation = ({ orderData, onReset }) => {
  // Extracting data from the API response
  const { message, data, items, totalAmount, createdAt } = orderData;
  debugger;

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
                    We will be reaching out to you shortly if we need to make
                    any adjustments to your printing order (such as resolution
                    fixes or bleed corrections). Please note that{" "}
                    <strong>
                      technical adjustments or design corrections may incur
                      extra costs
                    </strong>{" "}
                    that will be added to your final official quote.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 sm:p-6 shadow-md">
              <PaymentMethods />
            </div>

            {/* Order Summary Table */}
            <div className="border border-gray-200 rounded-xl overflow-hidden">
              <div className="bg-gray-50 px-6 py-3 border-b border-gray-200 flex justify-between items-center">
                <span className="text-xs font-black uppercase text-slate-500 tracking-widest">
                  Project Details
                </span>
                <span className="text-xs text-slate-400">
                  {new Date(createdAt).toLocaleDateString()}
                </span>
              </div>
              {/* <table className="w-full text-sm text-left">
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr
                      key={idx}
                      className="hover:bg-gray-50/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="font-bold text-slate-800">
                          {item.productName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {item.size} • {item.material}
                        </div>
                        {item.hasFile && (
                          <div className="mt-1 flex items-center text-[10px] font-bold text-blue-600 uppercase">
                            <FileText size={10} className="mr-1" /> Artwork
                            Uploaded
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-mono font-bold text-slate-700">
                        ${Number(item.price).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot className="bg-slate-900 text-white">
                  <tr>
                    <td className="px-6 py-5 font-bold text-lg uppercase tracking-tight">
                      Estimated Total
                    </td>
                    <td className="px-6 py-5 text-right font-black text-xl text-orange-400">
                      ${Number(totalAmount).toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table> */}
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
        Maximus Vinyl Print Service • Oklahoma City, OK
      </p>
    </div>
  );
};

export default OrderConfirmation;
