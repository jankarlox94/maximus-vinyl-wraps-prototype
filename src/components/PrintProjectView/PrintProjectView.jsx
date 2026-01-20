import React, { useState } from "react";

const PrintProjectView = () => {
  // --- STATE MANAGEMENT ---
  const [step, setStep] = useState(1); // 1: NeedsType, 2: Dimensions, 3: Review, 4: Success
  const [formData, setFormData] = useState({
    hasImage: null, // boolean: true = has image, false = needs design
    width: "",
    height: "",
    unit: "inches", // Defaulting to inches for simpler calculation logic
  });
  const [estimatedCost, setEstimatedCost] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [emailFormData, emailSetFormData] = useState({
    customerName: "",
    email: "",
    phone: "",
    serviceType: "Digital Printing",
    quantity: "",
    paperStock: "Standard 80lb",
    finish: "Matte",
    notes: "",
  });

  // --- HANDLERS ---
  // -- email handlers--
  const handleEmailFormChange = (e) => {
    const { name, value } = e.target;
    emailSetFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmailFormSubmit = (e) => {
    e.preventDefault();
    // This is the payload you would send to your email service
    console.log("Email Payload:", emailFormData);
    alert("Order submitted! Check console for payload.");
    setStep(5);
  };
  // ---------

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError(""); // Clear errors on edit
  };

  // Step 1: Determine Needs
  const handleNeedsSelection = (hasImageValue) => {
    setFormData((prev) => ({ ...prev, hasImage: hasImageValue }));
    setStep(2);
  };

  // Step 2: Calculate Cost and Move to Review
  const calculateAndReview = (e) => {
    e.preventDefault();
    const w = parseFloat(formData.width);
    const h = parseFloat(formData.height);

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      setError("Please enter valid positive dimensions.");
      return;
    }

    // --- MOCK PRICING LOGIC ---
    // Change this to match your actual business logic.
    // Example: Base fee $10 + $0.15 per square inch + $30 flat fee if design needed.
    const baseFee = 10.0;
    const designFee = formData.hasImage ? 0 : 30.0;
    const sqInchRate = 0.0694444; // pie cuadrado est. $10. sq inch $0.0694444
    const area = w * h;

    const total = baseFee + designFee + area * sqInchRate;
    setEstimatedCost(total.toFixed(2));
    setStep(3);
  };

  // Step 3: Submit Payload to Backend API
  const handleSubmitToSMS = async () => {
    setIsSubmitting(true);
    setError("");

    // Prepare payload
    const payload = {
      ...formData,
      estimatedCost: estimatedCost,
      timestamp: new Date().toISOString(),
    };

    try {
      // --- IMPORTANT: REPLACE WITH YOUR ACTUAL BACKEND ENDPOINT ---
      // You need a backend service (Node, Python, Next.js API route) to handle this POST request
      // and actually interact with an SMS API provider like Twilio.
      // This is a simulated successful response.

      console.log("Sending payload to backend:", payload);

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Simulate success
      setStep(4);

      /* // Real implementation example:
      const response = await fetch('/api/submit-print-inquiry', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
      });

      if (!response.ok) throw new Error('Failed to send data');
      setStep(4);
      */
    } catch (err) {
      setError("There was an issue sending your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- RENDER HELPERS ---

  const renderProgressBar = () => (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
      <div
        className={`bg-blue-600 h-2.5 rounded-full transition-all duration-500 ease-in-out w-${step}/4`}
      ></div>
    </div>
  );

  return (
    <div className="min-w-full sm:mx-auto sm:px-2 md:min-w-[80rem] lg:min-w-[90rem] 2xl:min-w-[100rem] mt-[10rem] bg-white rounded-xl shadow-lg border border-gray-100 ">
      <div className="flex  my-auto p-6 bg-white rounded-xl shadow-lg border border-gray-100">
        <div className=" mx-auto mt-[2rem] p-6 bg-white rounded-xl shadow-lg border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">
            Start Your Print Project
          </h2>
          {step < 4 && renderProgressBar()}

          {/* Display Errors */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-700 border border-red-200 rounded text-sm">
              {error}
            </div>
          )}

          {/* STEP 1: Image vs Design */}
          {step === 1 && (
            <div className="space-y-6 fade-in">
              <p className="text-gray-600 text-lg text-center mb-4">
                First, tell us about your artwork files.
              </p>
              <div className="grid grid-cols-1 gap-4">
                <button
                  onClick={() => handleNeedsSelection(true)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center flex-col group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold text-gray-700">
                    I have an image ready to print
                  </span>
                </button>
                <button
                  onClick={() => handleNeedsSelection(false)}
                  className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition flex items-center justify-center flex-col group"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-gray-400 group-hover:text-blue-500 mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    />
                  </svg>
                  <span className="font-semibold text-gray-700">
                    I need customized design services
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dimensions */}
          {step === 2 && (
            <form onSubmit={calculateAndReview} className="space-y-4 fade-in">
              <p className="text-gray-600 text-lg text-center mb-4">
                What are the desired printing dimensions?
              </p>

              <div className="grid grid-cols-2 gap-4  text-black">
                <div>
                  <label
                    htmlFor="width"
                    className="block text-sm font-medium text-black mb-1"
                  >
                    Width (Inches)
                  </label>
                  <input
                    type="number"
                    id="width"
                    name="width"
                    min="0.1"
                    step="0.1"
                    required
                    value={formData.width}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., 24"
                  />
                </div>
                <div>
                  <label
                    htmlFor="height"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Height (Inches)
                  </label>
                  <input
                    type="number"
                    id="height"
                    name="height"
                    min="0.1"
                    step="0.1"
                    required
                    value={formData.height}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    placeholder="e.g., 36"
                  />
                </div>
              </div>

              <div className="flex justify-between pt-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-6 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  Calculate Estimate
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Review & Estimated Cost */}
          {step === 3 && (
            <div className="space-y-6 fade-in">
              <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
                <h3 className="text-gray-600 font-medium mb-2">
                  Quick Estimation
                </h3>
                <div className="text-4xl font-bold text-blue-800 mb-2">
                  ${estimatedCost}
                </div>
                <p className="text-sm text-gray-500">
                  *This is a preliminary estimate based on {formData.width}"x
                  {formData.height}"
                  {formData.hasImage
                    ? " (Print Only)"
                    : " (Includes Design Service)"}
                  . Final price may vary.
                </p>
              </div>

              <p className="text-gray-700 text-center">
                Do you wish to continue and send these details to our shop
                manager?
              </p>

              <div className="flex flex-col space-y-3 pt-2">
                <button
                  onClick={handleSubmitToSMS}
                  disabled={isSubmitting}
                  className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md flex justify-center items-center disabled:bg-green-400"
                >
                  {isSubmitting ? (
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Yes, contact Manager via Email to continue the process"
                  )}
                </button>
                <button
                  onClick={() => setStep(2)}
                  disabled={isSubmitting}
                  className="w-full p-3 text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg transition disabled:opacity-50"
                >
                  No, Edit Dimensions
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Email form to continue */}
          {step === 4 && (
            <form onSubmit={handleEmailFormSubmit} className="space-y-4">
              {/* Contact Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    required
                    type="text"
                    name="customerName"
                    value={emailFormData.customerName}
                    onChange={handleEmailFormChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address
                  </label>
                  <input
                    required
                    type="email"
                    name="email"
                    value={emailFormData.email}
                    onChange={handleEmailFormChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <input
                  required
                  type="tel"
                  name="phone"
                  value={emailFormData.phone}
                  onChange={handleEmailFormChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 p-2 border"
                />
              </div>

              <hr className="my-4" />

              {/* Order Details Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Service Type
                  </label>
                  <select
                    name="serviceType"
                    value={emailFormData.serviceType}
                    onChange={handleEmailFormChange}
                    className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 border"
                  >
                    <option>Digital Printing</option>
                    <option>Large Format Poster</option>
                    <option>Business Cards</option>
                    <option>Brochures/Flyers</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quantity
                  </label>
                  <input
                    required
                    type="number"
                    name="quantity"
                    value={emailFormData.quantity}
                    onChange={handleEmailFormChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                    placeholder="e.g. 500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Paper Stock
                  </label>
                  <select
                    name="paperStock"
                    value={emailFormData.paperStock}
                    onChange={handleEmailFormChange}
                    className="mt-1 block w-full bg-white border-gray-300 rounded-md shadow-sm p-2 border"
                  >
                    <option>Standard 80lb</option>
                    <option>Premium 100lb Cardstock</option>
                    <option>Glossy Photo Paper</option>
                    <option>Recycled Matte</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Finish
                  </label>
                  <div className="mt-2 space-x-4">
                    {["Matte", "Gloss", "UV Coat"].map((f) => (
                      <label key={f} className="inline-flex items-center">
                        <input
                          type="radio"
                          name="finish"
                          value={f}
                          checked={emailFormData.finish === f}
                          onChange={handleEmailFormChange}
                          className="text-blue-600"
                        />
                        <span className="ml-2 text-sm text-gray-600">{f}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Additional Instructions
                </label>
                <textarea
                  name="notes"
                  rows="3"
                  value={emailFormData.notes}
                  onChange={handleEmailFormChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
                  placeholder="File link, trim size, etc."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 transition duration-200 shadow-md"
              >
                Submit Print Order
              </button>
            </form>

            // <div className="space-y-6 fade-in">
            //   <div className="bg-blue-50 p-6 rounded-xl text-center border border-blue-100">
            //     <h3 className="text-gray-600 font-medium mb-2">
            //       Quick Estimation
            //     </h3>
            //     <div className="text-4xl font-bold text-blue-800 mb-2">
            //       ${estimatedCost}
            //     </div>
            //     <p className="text-sm text-gray-500">
            //       *This is a preliminary estimate based on {formData.width}"x
            //       {formData.height}"
            //       {formData.hasImage
            //         ? " (Print Only)"
            //         : " (Includes Design Service)"}
            //       . Final price may vary.
            //     </p>
            //   </div>

            //   <p className="text-gray-700 text-center">
            //     Do you wish to continue and send these details to our shop
            //     manager?
            //   </p>

            //   <div className="flex flex-col space-y-3 pt-2">
            //     <button
            //       onClick={() => setStep(5)}
            //       disabled={isSubmitting}
            //       className="w-full p-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition shadow-md flex justify-center items-center disabled:bg-green-400"
            //     >
            //       {isSubmitting ? (
            //         <svg
            //           className="animate-spin h-5 w-5 text-white"
            //           xmlns="http://www.w3.org/2000/svg"
            //           fill="none"
            //           viewBox="0 0 24 24"
            //         >
            //           <circle
            //             className="opacity-25"
            //             cx="12"
            //             cy="12"
            //             r="10"
            //             stroke="currentColor"
            //             strokeWidth="4"
            //           ></circle>
            //           <path
            //             className="opacity-75"
            //             fill="currentColor"
            //             d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            //           ></path>
            //         </svg>
            //       ) : (
            //         "Yes, contact Manager via Email to continue the process"
            //       )}
            //     </button>
            //     <button
            //       onClick={() => setStep(2)}
            //       disabled={isSubmitting}
            //       className="w-full p-3 text-gray-600 border border-gray-300 hover:bg-gray-50 rounded-lg transition disabled:opacity-50"
            //     >
            //       No, Edit Dimensions
            //     </button>
            //   </div>
            // </div>
          )}
          {/* STEP 5: Success State */}
          {step === 5 && (
            <div className="text-center space-y-4 py-8 fade-in">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full text-green-600 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                Request Sent!
              </h3>
              <p className="text-gray-600">
                Our shop manager has received your project details.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mt-6">
                <p className="font-medium text-gray-800 flex items-center justify-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  Check your phone.
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  The rest of the process will continue via SMS messages.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PrintProjectView;
