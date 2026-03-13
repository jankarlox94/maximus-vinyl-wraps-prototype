import React from "react";

const SizingWarningAlert = () => {
  return (
    <div className="relative w-full max-w-2xl bg-black border border-purple-600/50 p-6 shadow-[0_0_20px_rgba(147,51,234,0.15)] overflow-hidden font-sans">
      {/* Futuristic Background Accents */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-purple-900/20 blur-3xl rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-purple-600/10 blur-2xl rounded-full pointer-events-none"></div>

      {/* HUD Target Corners */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-500"></div>
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-500"></div>
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-500"></div>
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-500"></div>

      <div className="relative z-10 flex flex-col sm:flex-row gap-5">
        {/* Animated Warning Icon */}
        <div className="flex-shrink-0 mt-1">
          <div className="relative flex items-center justify-center w-10 h-10 bg-purple-950/50 border border-purple-500/50 rounded shadow-[0_0_10px_rgba(147,51,234,0.3)]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 text-purple-400 animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Alert Content */}
        <div className="space-y-4">
          <h4 className="text-lg font-bold tracking-[0.15em] text-purple-400 uppercase drop-shadow-[0_0_8px_rgba(147,51,234,0.5)]">
            System Alert: Image Sizing
          </h4>

          <div className="text-sm text-gray-300 leading-relaxed space-y-3">
            <p>
              We will automatically scale your uploaded artwork to fit your
              selected print dimensions.
            </p>

            <p>
              However, if your image has a{" "}
              <span className="text-white font-semibold border-b border-purple-500/50 pb-0.5">
                different aspect ratio
              </span>{" "}
              (proportions) than the print size you chose, it cannot simply be
              stretched without distorting the picture. In this case:
            </p>

            {/* List with tech-style bullets */}
            <ul className="space-y-3 mt-4 border-l-2 border-purple-800/60 pl-4 py-1">
              <li className="flex flex-col">
                <span className="text-purple-300 font-bold tracking-wider uppercase text-xs mb-1">
                  &gt; Manual Adjustment
                </span>
                <span className="text-gray-400">
                  Our design team will need to manually crop or adjust your file
                  to ensure it looks perfect.
                </span>
              </li>
              <li className="flex flex-col">
                <span className="text-purple-300 font-bold tracking-wider uppercase text-xs mb-1">
                  &gt; Designer Contact
                </span>
                <span className="text-gray-400">
                  Our team will reach out to you directly to discuss and approve
                  the changes before printing.
                </span>
              </li>
              <li className="flex flex-col bg-purple-950/30 p-2 rounded border border-purple-900/50 mt-2">
                <span className="text-purple-300 font-bold tracking-wider uppercase text-xs mb-1 flex items-center gap-2">
                  &gt; Additional Cost
                  <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-1.5 py-0.5 rounded text-[10px] animate-pulse">
                    FEE APPLIES
                  </span>
                </span>
                <span className="text-gray-400">
                  Please note that this manual adjustment is considered a custom
                  design service and will incur an extra fee.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizingWarningAlert;
