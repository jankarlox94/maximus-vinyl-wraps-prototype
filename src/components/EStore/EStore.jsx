import React, { useState } from "react";
import {
  ShoppingCart,
  Upload,
  ChevronRight,
  Star,
  Trash2,
  Image as ImageIcon,
  Minus,
  Plus,
  CheckCircle,
} from "lucide-react";
import OrderConfirmation from "../OrderConfirmation/OrderConfirmation";
import ElevenBy14 from "../../assets/11x14.webp";
import EighteenBy24 from "../../assets/18-by-24-medium-sized-poster.jpg";
import TwentyfourBy36 from "../../assets/24by36.jpg";
import TwentytwoBy28 from "../../assets/22_28_HOLDING_MOCKUP.jpg";
import Twoby6feet from "../../assets/2by6banner.png";
import Threeby6feet from "../../assets/3by6.png";
import Fourby8feet from "../../assets/4by8.png";

// --- CONSTANTS ---
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

// --- SUB-COMPONENTS (Defined OUTSIDE to prevent focus loss) ---

const Navbar = ({ cartLength, setView }) => (
  <nav className="border-b border-gray-800 bg-[#161b22] px-6 py-4 flex justify-between items-center sticky top-0 z-50">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div
        className="text-xl font-black italic tracking-tighter"
        onClick={() => setView("catalog")}
      >
        Maximus<span className="text-orange-500">VINYL</span>
      </div>
      <div className="flex gap-6 items-center">
        <div className="relative cursor-pointer hover:text-orange-500 transition-colors">
          <ShoppingCart size={20} />
          {cartLength > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartLength}
            </span>
          )}
        </div>
      </div>
      {/* <div className="flex items-center gap-6">
        <button
          className="relative cursor-pointer hover:text-orange-400 transition"
          onClick={() => setView("checkout")}
        >
          <ShoppingCart />
          {cartLength > 0 && (
            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cartLength}
            </span>
          )}
        </button>
      </div> */}
    </div>
  </nav>
);

const Catalog = ({ setSelectedProduct, setView }) => (
  <div className="p-6 py-12 max-w-7xl mx-auto animate-in fade-in duration-500">
    <div className="text-center mb-16 space-y-4">
      <h1 className="text-4xl md:text-5xl font-black italic uppercase tracking-tight">
        Step Up Your Print Game
      </h1>
      <p className="text-gray-400 max-w-xl mx-auto text-lg leading-relaxed">
        High-grade materials. Precision tools. Your custom masterpiece, made
        easy. Select, upload, and we'll do the rest.
      </p>
    </div>
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
          <p className="text-sm text-gray-500 flex-grow mb-4">{product.desc}</p>
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

const ProductDetails = ({
  selectedProduct,
  previewUrl,
  imageFile,
  handleFileChange,
  selectedPrintingMaterial,
  setSelectedPrintingMaterial,
  customerNote,
  setCustomerNote,
  quantity,
  setQuantity,
  addToCart,
  setView,
}) => (
  <div className="p-6 py-12 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 animate-in slide-in-from-right-8 duration-300">
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

const Checkout = ({
  cart,
  removeFromCart,
  customerInfo,
  handleCustomerInfoChange,
  handleQuoteSubmit,
  isSubmitting,
  setView,
}) => {
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.qty,
    0,
  );

  return (
    <div className="p-6 py-12 max-w-7xl mx-auto min-h-screen animate-in fade-in">
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
              <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
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
                      <span className="font-medium text-slate-700">Size:</span>{" "}
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

// --- MAIN COMPONENT ---

const EStore = () => {
  // --- STATE ---
  const [view, setView] = useState("catalog"); // catalog, details, checkout
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);
  // --- NEW STATE FOR CONFIRMATION RESPONSE ---
  const [orderResponse, setOrderResponse] = useState(null);
  debugger;

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
      debugger;
      //  const response = await fetch("http://[::1]:3000/api/print-jobs", {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/print-jobs`,
        {
          method: "POST",
          body: formData, // Do NOT set headers; the browser will set multipart/form-data automatically
        },
      );
      debugger;
      if (response.ok) {
        // 1. Save the API response (Expected format: { id, orderNumber, items, totalAmount, etc })
        formData;
        const rawData = await response.json();
        debugger;
        ///
        if (Array.isArray(rawData) && rawData.length > 0) {
          setOrderResponse(rawData[0]); // Set just the first (only) object
        } else {
          setOrderResponse(rawData); // Set directly if your endpoint is NOT PostgREST default
        }

        setCart([]);
        setCustomerInfo({ name: "", email: "", phone: "" });
        setView("confirmation");
      } else {
        debugger;
        const errorData = await response.json().catch(() => ({})); // try to parse error JSON
        console.error("API Error Response:", errorData);
        throw new Error(`Submit failed with status: ${httpResponse.status}`);
      }
    } catch (error) {
      debugger;
      console.error("Error:", error);
      setOrderResponse({ error: error.message });
      alert("There was an issue submitting your request. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white font-sans selection:bg-cyan-500/30">
      <Navbar cartLength={cart.length} setView={setView} />
      <main className="pt-8">
        {view === "catalog" && (
          <Catalog setSelectedProduct={setSelectedProduct} setView={setView} />
        )}
        {view === "details" && (
          <ProductDetails
            selectedProduct={selectedProduct}
            previewUrl={previewUrl}
            imageFile={imageFile}
            handleFileChange={handleFileChange}
            selectedPrintingMaterial={selectedPrintingMaterial}
            setSelectedPrintingMaterial={setSelectedPrintingMaterial}
            customerNote={customerNote}
            setCustomerNote={setCustomerNote}
            quantity={quantity}
            setQuantity={setQuantity}
            addToCart={addToCart}
            setView={setView}
          />
        )}
        {view === "checkout" && (
          <Checkout
            cart={cart}
            removeFromCart={removeFromCart}
            customerInfo={customerInfo}
            handleCustomerInfoChange={handleCustomerInfoChange}
            handleQuoteSubmit={handleQuoteSubmit}
            isSubmitting={isSubmitting}
            setView={setView}
          />
        )}
        {/* --- NEW CONFIRMATION VIEW --- */}
        {view === "confirmation" && orderResponse && (
          <OrderConfirmation
            orderData={orderResponse}
            onReset={() => {
              setOrderResponse(null);
              setView("catalog");
            }}
          />
        )}
      </main>
    </div>
  );
};

export default EStore;
