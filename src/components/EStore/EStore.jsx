import React, { useState, useCallback } from "react";
import {
  Search,
  ShoppingCart,
  Upload,
  Crop,
  CheckCircle,
  ChevronRight,
  Star,
  Trash2,
  Image as ImageIcon,
  Minus,
  Plus,
} from "lucide-react";
import Cropper from "react-easy-crop";
import ElevenBy14 from "../../assets/11x14.webp";
import EighteenBy24 from "../../assets/18-by-24-medium-sized-poster.jpg";
import TwentyfourBy36 from "../../assets/24by36.jpg";
import TwentytwoBy28 from "../../assets/22_28_HOLDING_MOCKUP.jpg";
import Twoby6feet from "../../assets/2by6banner.png";
import Threeby6feet from "../../assets/3by6.png";
import Fourby8feet from "../../assets/4by8.png";
import SizingWarningAlert from "../SizingWarningAlert/SizingWarningAlert";

const PRODUCTS = [
  {
    id: 1,
    title: "Custom Canvas Print - Large Format",
    size: '24" x 36"',
    name: "Large Statement Poster",
    ratio: "2:3",
    price: 45.99,
    tag: "Best Seller",
    desc: "Gold standard for living rooms and offices.",
    comparison: "Above a standard office desk",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: TwentyfourBy36,
  },
  {
    id: 2,
    title: "Custom Canvas Print - Large Format",
    size: '18" x 24"',
    name: "Medium-Large Print",
    ratio: "3:4",
    price: 32.5,
    tag: "Popular",
    desc: "Great for gallery walls or bedrooms.",
    comparison: "Scale of a standard carry-on suitcase",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: EighteenBy24,
  },
  {
    id: 3,
    title: "Custom Canvas Print - Large Format",
    size: '16" x 20"',
    name: "The Classic Portrait",
    ratio: "4:5",
    price: 28.0,
    tag: "",
    desc: "The traditional portrait look.",
    comparison: "Half the width of a standard doorway",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400",
  },
  {
    id: 4,
    title: "Custom Canvas Print - Large Format",
    size: '11" x 14"',
    name: "Small-Medium Personal",
    ratio: "11:14",
    price: 18.99,
    tag: "",
    desc: "Ideal for office desks or hallways.",
    comparison: "Slightly larger than a standard sheet of paper",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: ElevenBy14,
  },
  {
    id: 5,
    title: "Custom Canvas Print - Large Format",
    size: '12" x 12"',
    name: "Instagram Square",
    ratio: "1:1",
    price: 15.0,
    tag: "Trending",
    desc: "Modern minimalist decor and multi-panel sets.",
    comparison: "Size of a vinyl record sleeve",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400",
  },
  {
    id: 6,
    title: "Custom Canvas Print - Large Format",
    size: '11" x 17"',
    name: "Tabloid / Small Poster",
    ratio: "11:17",
    price: 12.99,
    tag: "",
    desc: "The go-to for bulletin boards and shop windows.",
    comparison: "Standard menu size",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400",
  },
  {
    id: 7,
    title: "Custom Canvas Print - Large Format",
    size: '22" x 28"',
    name: "Retail Standard Sign",
    ratio: "11:14",
    price: 38.0,
    tag: "",
    desc: "Standard sign size for malls and theaters.",
    comparison: "Fits inside a standard metal stanchion",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: TwentytwoBy28,
  },
  {
    id: 8,
    title: "Custom Canvas Print - Large Format",
    size: "2' x 6'",
    name: "Vertical Banner",
    ratio: "1:3",
    price: 85.0,
    tag: "Commercial",
    desc: "Perfect for trade shows or sidewalk A-frames.",
    comparison: "Human height (approx. 6ft tall)",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: Twoby6feet,
  },
  {
    id: 9,
    title: "Custom Canvas Print - Large Format",
    size: "3' x 6'",
    name: "Universal Vinyl Banner",
    ratio: "1:2",
    price: 110.0,
    tag: "Best Value",
    desc: "The 'Grand Opening' standard.",
    comparison: "Width of a double-door entrance",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: Threeby6feet,
  },
  {
    id: 10,
    title: "Custom Canvas Print - Large Format",
    size: "4' x 8'",
    name: "Outdoor Giant",
    ratio: "1:2",
    price: 195.0,
    tag: "Heavy Duty",
    desc: "Large outdoor marketing and construction sites.",
    comparison: "Full sheet of plywood / SUV side profile",
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Vinyl", "Chrome", "Banner", "Window Perf"],
    laminations: ["None"],
    image: Fourby8feet,
  },
];

const EStore = () => {
  // --- STATE ---
  const [view, setView] = useState("catalog"); // catalog, details, checkout
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Product Configuration State
  const [selectedPrintingMaterial, setSelectedPrintingMaterial] = useState("");
  const [customerNote, setCustomerNote] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [quantity, setQuantity] = useState(1); // New quantity state

  // Customer Contact State (For the quote)
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- HANDLERS ---

  const handleCustomerInfoChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create local preview
    }
  };

  const addToCart = () => {
    if (!selectedProduct) return;

    setCart((prev) => [
      ...prev,
      {
        ...selectedProduct,
        // Generate a unique ID so identical products with different art stay separate
        cartItemId:
          Date.now().toString() + Math.random().toString(36).substring(2, 9),
        qty: quantity,
        customerNotes: customerNote || "",
        printingMaterial: selectedPrintingMaterial || selectedProduct.papers[0],
        file: imageFile,
        userPreview: previewUrl,
      },
    ]);

    // Reset configuration state for the next item
    setQuantity(1);
    setCustomerNote("");
    setImageFile(null);
    setPreviewUrl(null);
    setSelectedPrintingMaterial("");
    setView("checkout");
  };

  const removeFromCart = (cartItemId) => {
    setCart((prev) => {
      const itemToRemove = prev.find((item) => item.cartItemId === cartItemId);
      // Free up browser memory if there was a preview URL
      if (itemToRemove && itemToRemove.userPreview) {
        URL.revokeObjectURL(itemToRemove.userPreview);
      }
      return prev.filter((item) => item.cartItemId !== cartItemId);
    });
  };

  const handleQuoteSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return alert("Your cart is empty.");

    setIsSubmitting(true);
    const formData = new FormData();

    // 1. Append Customer Data
    formData.append("customerName", customerInfo.name);
    formData.append("customerEmail", customerInfo.email);
    formData.append("customerPhone", customerInfo.phone);

    // 2. Append Cart Metadata (Everything EXCEPT the heavy file objects)
    const cartMetadata = cart.map((item) => ({
      cartItemId: item.cartItemId,
      productId: item.id,
      productName: item.name,
      size: item.size,
      quantity: item.qty,
      material: item.printingMaterial,
      notes: item.customerNotes,
      price: item.price,
      hasFile: !!item.file,
    }));
    formData.append("cartData", JSON.stringify(cartMetadata));

    // 3. Append the physical File objects dynamically
    cart.forEach((item) => {
      if (item.file) {
        // Tie the file to the specific cart item ID for the backend to match them up
        formData.append(`file_${item.cartItemId}`, item.file);
      }
    });

    try {
      // Simulate API call to your NestJS backend

      // REPLACE WITH REAL FETCH:
      // const response = await fetch("http://localhost:3000/api/print-jobs", {

      //     try {
      //       const response = await fetch("http://[::1]:3000/api/print-jobs", {
      //         method: "POST",
      //         body: formData, // Do NOT set headers; the browser will set multipart/form-data automatically
      //       });

      //       if (response.ok) {
      //         debugger;
      //         // setStatus("success");
      //         // Reset form (optional)
      //         // setFormData({ customerName: '', email: '', /* reset others */ });
      //         // setImageFile(null);
      //       } else {
      //         debugger;
      //         // setStatus("error");
      //       }
      //     } catch (error) {
      //       debugger;
      //       console.log("Error:", error);
      //       setStatus("error");
      //     }

      //     alert(
      //       "Your information was sent to the shop Manager. We will be contacting you in a few moments.",
      //     );
      //   method: "POST",
      //   body: formData,
      // });
      debugger;

      const response = await fetch("http://[::1]:3000/api/print-jobs", {
        method: "POST",
        body: formData, // Do NOT set headers; the browser will set multipart/form-data automatically
      });
      debugger;
      if (response.ok) {
        debugger;
        // setStatus("success");
        // Reset form (optional)
        // setFormData({ customerName: '', email: '', /* reset others */ });
        // setImageFile(null);
        setCart([]);
        setCustomerInfo({ name: "", email: "", phone: "" });
        setView("catalog");
      } else {
        debugger;
        // setStatus("error");
      }
      // setCart([]);
      // setCustomerInfo({ name: "", email: "", phone: "" });
      // setView("catalog");
    } catch (error) {
      debugger;
      console.error("Error:", error);
      alert("There was an issue submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // --- SUB-COMPONENTS ---

  const Navbar = () => (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1
          className="text-2xl font-bold tracking-tight cursor-pointer"
          onClick={() => setView("catalog")}
        >
          Maximus<span className="text-orange-400">VINYL</span>
        </h1>
        <div className="flex items-center gap-6">
          <button
            className="relative cursor-pointer hover:text-orange-400 transition"
            onClick={() => setView("checkout")}
          >
            <ShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                {cart.length}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );

  const Catalog = () => (
    <div className="p-6 max-w-7xl mx-auto animate-in fade-in duration-500">
      <p className="text-gray-600 mb-8 max-w-3xl text-lg">
        Select your size, upload your art, and let us handle the rest. Whether
        it’s a 40" statement canvas or a custom vinyl project, our pro-grade
        materials and precision tools ensure your prints look exactly how you
        imagined.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 bg-white rounded-lg p-4 hover:shadow-xl hover:border-orange-200 transition-all cursor-pointer flex flex-col"
            onClick={() => {
              setSelectedProduct(product);
              setView("details");
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <h3 className="font-bold text-lg text-slate-800 line-clamp-1">
              {product.name}
            </h3>
            <span className="inline-block bg-slate-100 text-slate-600 text-xs px-2 py-1 rounded font-medium mb-2 w-max">
              {product.size}
            </span>
            <p className="text-sm text-gray-500 flex-grow mb-4">
              {product.desc}
            </p>
            <div className="flex justify-between items-end pt-4 border-t border-gray-100">
              <p className="text-2xl font-bold text-slate-900">
                ${product.price}
              </p>
              <div className="flex items-center text-orange-500">
                <Star size={16} fill="currentColor" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductDetails = () => (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-right-8 duration-300">
      {/* Left Column: Image & Details */}
      <div className="lg:col-span-7 space-y-6">
        <button
          onClick={() => setView("catalog")}
          className="flex items-center text-blue-600 hover:text-orange-600 font-medium transition mb-4"
        >
          <ChevronRight size={16} className="rotate-180 mr-1" /> Back to Catalog
        </button>

        <h1 className="text-4xl font-bold text-slate-900">
          {selectedProduct.name}
        </h1>
        <p className="text-xl text-gray-500">{selectedProduct.size}</p>

        {/* <SizingWarningAlert /> */}

        <div className="border border-gray-200 rounded-xl p-2 bg-white shadow-sm overflow-hidden relative group">
          <img
            src={previewUrl || selectedProduct.image}
            alt="Product Preview"
            className="w-full h-[500px] object-contain bg-gray-50 rounded-lg"
          />
          {previewUrl && (
            <div className="absolute top-4 right-4 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg font-bold flex items-center">
              <CheckCircle size={14} className="mr-1" /> Your Artwork Attached
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Configuration Options */}
      <div className="lg:col-span-5">
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-lg sticky top-24">
          <div className="flex justify-between items-start border-b border-gray-100 pb-4 mb-6">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider font-bold mb-1">
                Base Price
              </p>
              <p className="text-4xl font-light text-slate-900">
                ${selectedProduct.price}
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* File Upload */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                1. Upload Artwork (Optional)
              </label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:bg-gray-50 transition text-center relative">
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={handleFileChange}
                  accept="image/*"
                />
                <Upload
                  size={32}
                  className={`mx-auto mb-2 ${imageFile ? "text-green-500" : "text-gray-400"}`}
                />
                <p className="text-sm font-medium text-slate-700">
                  {imageFile
                    ? "Click to replace file"
                    : "Drag & Drop or Click to Browse"}
                </p>
                {imageFile && (
                  <p className="mt-2 text-xs text-green-600 font-bold truncate px-4">
                    {imageFile.name}
                  </p>
                )}
              </div>
            </div>

            {/* Material Dropdown */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                2. Printing Material
              </label>
              <select
                className="w-full border border-gray-300 p-3 rounded-lg bg-white focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none"
                value={selectedPrintingMaterial}
                onChange={(e) => setSelectedPrintingMaterial(e.target.value)}
              >
                <option value="" disabled>
                  Select a material...
                </option>
                {selectedProduct.papers.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">
                3. Additional Instructions
              </label>
              <textarea
                rows="3"
                value={customerNote}
                onChange={(e) => setCustomerNote(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none resize-none"
                placeholder="Trim size, color adjustments, or external links..."
              />
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden bg-white">
                <button
                  type="button"
                  className="px-4 py-3 hover:bg-gray-100 text-slate-600 transition-colors"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                >
                  <Minus size={18} />
                </button>
                <span className="px-4 py-2 font-bold text-lg text-slate-900 w-12 text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  className="px-4 py-3 hover:bg-gray-100 text-slate-600 transition-colors"
                  onClick={() => setQuantity((q) => q + 1)}
                >
                  <Plus size={18} />
                </button>
              </div>

              <button
                onClick={addToCart}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg shadow-md transition-colors text-lg"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const Checkout = () => {
    // Calculate estimated subtotal
    const subtotal = cart.reduce(
      (total, item) => total + item.price * item.qty,
      0,
    );

    return (
      <div className="p-6 max-w-7xl mx-auto min-h-screen animate-in fade-in">
        <button
          onClick={() => setView("catalog")}
          className="flex items-center text-blue-600 hover:text-orange-600 font-medium transition mb-8"
        >
          <ChevronRight size={16} className="rotate-180 mr-1" /> Continue Adding
          Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="text-2xl font-bold text-slate-900 mb-6 border-b pb-2">
              Your Print Projects
            </h2>

            {cart.length === 0 ? (
              <div className="bg-white p-10 text-center rounded-xl border border-gray-200">
                <ShoppingCart
                  size={48}
                  className="mx-auto text-gray-300 mb-4"
                />
                <p className="text-gray-500 text-lg">
                  Your project list is empty.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex gap-6 relative"
                >
                  {/* Image Thumbnail */}
                  <div className="w-28 h-28 bg-gray-50 rounded-lg border border-gray-200 flex items-center justify-center overflow-hidden flex-shrink-0">
                    {item.userPreview ? (
                      <img
                        src={item.userPreview}
                        alt="User Art"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="text-center text-gray-400">
                        <ImageIcon
                          size={24}
                          className="mx-auto mb-1 opacity-50"
                        />
                        <span className="text-[10px] uppercase font-bold tracking-wider">
                          No File
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-bold text-lg text-slate-900 pr-8">
                        {item.name}
                      </h4>
                      <p className="font-bold text-lg text-slate-900">
                        ${(item.price * item.qty).toFixed(2)}
                      </p>
                    </div>

                    <div className="text-sm text-gray-500 mb-2 space-y-1 mt-1">
                      <p>
                        <span className="font-medium text-slate-700">
                          Size:
                        </span>{" "}
                        {item.size}
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">
                          Material:
                        </span>{" "}
                        {item.material}
                      </p>
                      <p>
                        <span className="font-medium text-slate-700">Qty:</span>{" "}
                        {item.qty} (@ ${item.price.toFixed(2)}/ea)
                      </p>
                    </div>

                    {item.customerNotes && (
                      <div className="bg-orange-50 text-orange-800 text-xs p-2 rounded border border-orange-100 mb-2 inline-block">
                        <span className="font-bold">Notes:</span>{" "}
                        {item.customerNotes}
                      </div>
                    )}

                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-red-500 hover:text-red-700 text-sm font-medium flex items-center mt-2 absolute bottom-4 right-4"
                    >
                      <Trash2 size={16} className="mr-1" /> Remove
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Right: The Customer Form & Quote Request */}
          <div className="lg:col-span-5">
            <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-xl sticky top-24">
              <div className="mb-6 border-b border-gray-100 pb-6">
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Order Summary
                </h3>
                <div className="flex justify-between items-center text-slate-600 mb-2">
                  <span>
                    Items ({cart.reduce((sum, item) => sum + item.qty, 0)}):
                  </span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-lg font-bold text-slate-900 mt-4">
                  <span>Estimated Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <p className="text-xs text-gray-400 mt-2">
                  * Final price may vary based on file adjustments and shipping.
                </p>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Contact Information
              </h3>
              <p className="text-slate-500 text-sm mb-6">
                Where should we send your official quote and proofs?
              </p>

              <form onSubmit={handleQuoteSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={customerInfo.name}
                    onChange={handleCustomerInfoChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="Jane Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={customerInfo.email}
                    onChange={handleCustomerInfoChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleCustomerInfoChange}
                    className="w-full bg-gray-50 border border-gray-300 rounded p-3 text-slate-900 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none"
                    placeholder="(555) 123-4567"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting || cart.length === 0}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-lg shadow-md transition-colors mt-4 disabled:bg-slate-400 flex justify-center items-center"
                >
                  {isSubmitting ? (
                    <span className="flex items-center">
                      <svg
                        className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                      Processing Request...
                    </span>
                  ) : (
                    "Request Official Quote"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-slate-900 pb-20">
      <Navbar />

      <main className="pt-8">
        {view === "catalog" && <Catalog />}
        {view === "details" && <ProductDetails />}
        {view === "checkout" && <Checkout />}
      </main>
    </div>
  );
};

export default EStore;

// const EStore = () => {
//   const [view, setView] = useState("catalog"); // catalog, details, checkout

//   const [selectedPrintingMaterial, setSelectedPrintingMaterial] = useState("");

//   const handleSelectPrintingMaterialChange = (e) => {
//     // e.target.value contains the string from the chosen <option value="...">
//     setSelectedPrintingMaterial(e.target.value);
//   };

//   const [selectedProduct, setSelectedProduct] = useState(null);

//   const [customerNote, setCustomerNote] = useState("");
//   debugger;
//   const [cart, setCart] = useState([]);
//   debugger;

//   const [imageFile, setImageFile] = useState(null);

//   const [emailFormData, emailSetFormData] = useState({
//     customerName: "",
//     email: "",
//     phone: "",
//     serviceType: "Digital Printing",
//     quantity: "",
//     dimensions: "",
//     paperStock: "Standard 80lb",
//     finish: "Matte",
//     notes: "",
//   });

//   // Image Upload & Crop State
//   const [imageSrc, setImageSrc] = useState(null);

//   // --- Handlers ---

//   const handleEmailFormChange = (e) => {
//     const { name, value } = e.target;
//     emailSetFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleEmailFormSubmit = async (e) => {
//     e.preventDefault();
//     debugger;
//     console.log("Email Payload:", emailFormData);
//     const formData = new FormData();
//     formData.append("customerEmail", emailFormData.email);
//     formData.append("width", "24"); // sending as string is fine, backend converts
//     formData.append("height", "36");
//     formData.append("material", "Vinyl Gloss");
//     if (imageFile) {
//       formData.append("image", imageFile);
//     }

//     try {
//       const response = await fetch("http://[::1]:3000/api/print-jobs", {
//         method: "POST",
//         body: formData, // Do NOT set headers; the browser will set multipart/form-data automatically
//       });

//       if (response.ok) {
//         debugger;
//         // setStatus("success");
//         // Reset form (optional)
//         // setFormData({ customerName: '', email: '', /* reset others */ });
//         // setImageFile(null);
//       } else {
//         debugger;
//         // setStatus("error");
//       }
//     } catch (error) {
//       debugger;
//       console.log("Error:", error);
//       setStatus("error");
//     }

//     alert(
//       "Your information was sent to the shop Manager. We will be contacting you in a few moments.",
//     );
//     // setStep(5);
//   };
//   // ---- email ----

//   const handleFileChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setImageFile(e.target.files[0]);
//     }
//   };

//   const addToCart = (product) => {
//     setCart((prev) => {
//       const existing = prev.find((item) => item.id === product.id);
//       debugger;
//       if (existing) {
//         return prev.map((item) =>
//           item.id === product.id
//             ? {
//                 ...item,
//                 qty: item.qty + 1,
//                 customerNotes: customerNote ?? "",
//                 printingMaterial: selectedPrintingMaterial,
//               }
//             : item,
//         );
//       }

//       return [
//         ...prev,
//         {
//           ...product,
//           qty: 1,
//           customerNotes: customerNote ?? "",
//           printingMaterial: selectedPrintingMaterial,
//         },
//       ];
//     });
//     cart;
//     debugger;
//     setCustomerNote("");
//     setImageFile(null);
//     setSelectedPrintingMaterial("");
//     // 2. Switch the view
//     setView("checkout");
//   };
//   // --- Components ---

//   const Navbar = () => (
//     <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto flex items-center justify-between">
//         <h1
//           className="text-2xl font-bold tracking-tight cursor-pointer"
//           onClick={() => setView("catalog")}
//         >
//           Maximus<span className="text-orange-400">CATALOG</span>
//         </h1>

//         <div className="flex items-center gap-6">
//           <div
//             className="relative cursor-pointer"
//             onClick={() => setView("checkout")}
//           >
//             <ShoppingCart />
//             <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
//               {cart.length}
//             </span>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );

//   const Catalog = () => (
//     <div className="p-6 max-w-7xl mx-auto">
//       <h5 className="font-bold mb-6">
//         Select your size, upload your art, and let us handle the rest. Whether
//         it’s a 40" statement canvas or a custom vinyl project, our pro-grade
//         materials and precision cropping tools ensure your prints look exactly
//         how you imagined.
//       </h5>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {PRODUCTS.map((product) => (
//           <div
//             key={product.id}
//             className="border border-gray-200 rounded p-4 hover:shadow-lg transition cursor-pointer"
//             onClick={() => {
//               setSelectedProduct(product);
//               setView("details");
//             }}
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-full h-64 object-cover mb-4"
//             />

//             <h3 className="font-medium text-lg text-blue-800 hover:text-orange-600 truncate">
//               {product.name} - {product.size}
//             </h3>
//             <h3 className="font-medium text-lg text-blue-800  truncate">
//               {product.size}
//             </h3>
//             <h2 className="text-lg font-medium leading-tight hover:text-[#c45500] cursor-pointer">
//               {product.desc}
//             </h2>
//             <div className="flex items-center text-orange-500 my-1">
//               {[...Array(5)].map((_, i) => (
//                 <Star
//                   key={i}
//                   size={14}
//                   fill={i < 4 ? "currentColor" : "none"}
//                 />
//               ))}
//               <span className="text-sm text-blue-600 ml-2">
//                 {product.reviews}
//               </span>
//             </div>
//             <p className="text-2xl font-bold mt-2">${product.price}</p>
//             <p className="text-sm text-gray-500">FREE delivery Saturday</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );

//   const Checkout = () => (
//     <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
//       <div
//         className="flex items-center gap-2 mb-8 text-sm text-gray-500"
//         onClick={() => setView("catalog")}
//       >
//         <span className="text-orange-600 font-bold">
//           Go Back to previous print details
//         </span>{" "}
//         <ChevronRight size={16} />
//         <span onClick={() => setView("catalog")}>Catalog</span>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="md:col-span-2">
//           <div className="bg-white p-6 rounded shadow-sm">
//             <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
//             {cart.length === 0 ? (
//               <p>Your cart is empty.</p>
//             ) : (
//               cart.map((item) => (
//                 <div key={item.id} className="flex gap-4 border-b py-4">
//                   <img
//                     alt="img-2"
//                     src={item.image}
//                     className="w-24 h-24 object-cover rounded"
//                   />
//                   <div className="flex-1">
//                     <h4 className="font-bold text-blue-800">{item.title}</h4>
//                     <p className="text-sm text-green-600">
//                       Custom print in progress
//                     </p>
//                     <button
//                       className="text-xs text-blue-600 mt-2"
//                       onClick={() =>
//                         setCart(cart.filter((i) => i.id !== item.id))
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                   <p className="font-bold">${item.price}</p>
//                 </div>
//               ))
//             )}
//           </div>
//         </div>

//         <div className="bg-white p-6 rounded shadow-sm h-fit">
//           <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
//             <CheckCircle size={16} />
//             <span>Your order qualifies for FREE Shipping</span>
//           </div>
//           <p className="text-lg">
//             Subtotal ({cart.length} items):{" "}
//             <span className="font-bold">
//               ${cart.reduce((a, b) => a + b.price, 0).toFixed(2)}
//             </span>
//           </p>
//           <button
//             type="button"
//             onClick={handleEmailFormSubmit}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg mt-4 shadow font-medium"
//           >
//             Proceed to Checkout
//           </button>
//         </div>
//       </div>
//     </div>
//   );

//   return (
//     <div className="mt-[7.8rem] min-h-screen bg-white font-sans text-slate-900">
//       <Navbar setView={setView} cartLength={cart.length} />

//       {view === "catalog" && (
//         <Catalog setSelectedProduct={setSelectedProduct} setView={setView} />
//       )}

//       {view === "details" && (
//         <ProductDetails
//           imageSrc={imageSrc}
//           handleEmailFormSubmit={handleEmailFormSubmit}
//           emailFormData={emailFormData}
//           handleEmailFormChange={handleEmailFormChange}
//           imageFile={imageFile}
//           handleFileChange={handleFileChange}
//           selectedProduct={selectedProduct}
//           addToCart={addToCart}
//           customerNote={customerNote}
//           setCustomerNote={setCustomerNote}
//           selectedPrintingMaterial={selectedPrintingMaterial}
//           handleSelectPrintingMaterialChange={
//             handleSelectPrintingMaterialChange
//           }
//         />
//       )}

//       {view === "checkout" && <Checkout cart={cart} setCart={setCart} />}
//     </div>
//   );
// };

// const ProductDetails = ({
//   imageSrc,
//   handleEmailFormSubmit,
//   emailFormData,
//   handleEmailFormChange,
//   imageFile,
//   handleFileChange,
//   selectedProduct,
//   addToCart,
//   customerNote,
//   setCustomerNote,
//   selectedPrintingMaterial,
//   handleSelectPrintingMaterialChange,
// }) => (
//   <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
//     <div className="md:col-span-5 relative">
//       <SizingWarningAlert />
//       <div>
//         <div className="flex gap-2 mt-2">
//           <h2>Sample view</h2>
//         </div>
//         <div className="md:col-span-4">
//           <h1 className="text-3xl font-semibold mb-2">
//             {selectedProduct.name}
//           </h1>
//           <div className="border border-gray-200 rounded p-4 hover:shadow-lg transition cursor-pointer">
//             <img
//               src={selectedProduct.image}
//               alt={selectedProduct.title}
//               className="w-full h-64 object-cover mb-4"
//             />

//             <h3 className="font-medium text-lg text-blue-800 hover:text-orange-600 truncate">
//               {selectedProduct.name} - {selectedProduct.size}
//             </h3>
//             <h3 className="font-medium text-lg text-blue-800  truncate">
//               {selectedProduct.size}
//             </h3>
//             <h2 className="text-lg font-medium leading-tight hover:text-[#c45500] cursor-pointer">
//               {selectedProduct.desc}
//             </h2>
//           </div>
//         </div>
//       </div>
//     </div>

//     {/* Options Section */}
//     <div className="md:col-span-4">
//       {/* Aqui hacer link para ir atras al catalogo */}
//       <div onClick={() => setView("catalog")}>
//         <span
//           className="text-blue-600 border-b pb-4 mb-4 cursor-pointer"
//           onClick={() => setView("catalog")}
//         >
//           Go back to the catalog
//         </span>
//       </div>

//       <div className="space-y-6">
//         <div>
//           <div className="flex gap-2 mt-2"></div>
//         </div>

//         <div className="text-center p-8 border-2 border-dashed border-gray-200 rounded-lg">
//           <Upload size={48} className="mx-auto text-gray-400 mb-4" />
//           <label className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded cursor-pointer shadow-sm transition-colors">
//             Upload Your Image
//             <input
//               type="file"
//               className="hidden"
//               onChange={handleFileChange}
//               accept="image/*"
//             />
//           </label>
//           {imageFile && (
//             <p className="mt-2 text-xs text-green-600">
//               Selected: {imageFile.name}
//             </p>
//           )}
//         </div>

//         <div>
//           <span className="font-bold text-sm">Printing Material Type:</span>
//           <select
//             className="block w-full mt-2 border p-2 rounded bg-gray-50"
//             value={selectedPrintingMaterial}
//             onChange={handleSelectPrintingMaterialChange}
//           >
//             {selectedProduct.papers.map((p) => (
//               <option key={p}>{p}</option>
//             ))}
//           </select>
//         </div>

//         <div className="text-black">
//           <label className="block text-sm font-medium text-gray-700">
//             Additional Instructions
//           </label>
//           <textarea
//             name="notes"
//             rows="3"
//             value={customerNote}
//             onChange={(e) => setCustomerNote(e.target.value)}
//             className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2 border"
//             placeholder="File link, trim size, etc."
//           ></textarea>
//         </div>
//         {/* Purchase Section */}
//         <div className="md:col-span-3 border rounded-lg p-4 h-fit sticky top-24">
//           <p className="text-3xl font-light">${selectedProduct.price}</p>
//           <p className="text-green-600 text-sm font-bold my-2">In Stock.</p>
//           <button
//             onClick={() => addToCart(selectedProduct)}
//             className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full shadow mb-2 text-sm"
//           >
//             Add to Cart
//           </button>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// export default EStore;
