import React, { useState, useCallback } from "react";
import {
  Search,
  ShoppingCart,
  Upload,
  Crop,
  CheckCircle,
  ChevronRight,
  Star,
} from "lucide-react";
import Cropper from "react-easy-crop";

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    title: "Custom Canvas Print - Large Format",
    price: 89.99,
    rating: 4.8,
    reviews: 124,
    sizes: ['20" x 40"', '24" x 36"', '30" x 40"'],
    papers: ["Matte Finish", "Satin Luster", "Glossy Metallic"],
    laminations: ["None", "UV Protective Gloss", "Matte Soft-Touch"],
    image:
      "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400",
  },
  {
    id: 2,
    title: "Fine Art Giclée Print",
    price: 45.0,
    rating: 4.9,
    reviews: 89,
    sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
    laminations: ["None"],
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400",
  },
];

const EStore = () => {
  const [view, setView] = useState("catalog"); // catalog, details, checkout
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [cart, setCart] = useState([]);

  // Image Upload & Crop State
  const [imageSrc, setImageSrc] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(20 / 40); // Matches default size

  // --- Handlers ---
  const handleUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener("load", () => setImageSrc(reader.result));
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const addToCart = (product) => {
    setCart([...cart, { ...product, id: Date.now() }]);
    setView("checkout");
  };

  // --- Components ---

  const Navbar = () => (
    <nav className="bg-slate-900 text-white p-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <h1
          className="text-2xl font-bold tracking-tight cursor-pointer"
          onClick={() => setView("catalog")}
        >
          Maximus<span className="text-orange-400">CATALOG</span>
        </h1>
        <div className="flex-1 max-w-xl mx-8 relative hidden md:block">
          <input
            type="text"
            className="w-full py-2 px-4 rounded text-black"
            placeholder="Search for sizes or paper types..."
          />
          <div className="absolute right-0 top-0 h-full bg-orange-400 p-2 rounded-r">
            <Search className="text-slate-900" size={20} />
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div
            className="relative cursor-pointer"
            onClick={() => setView("checkout")}
          >
            <ShoppingCart />
            <span className="absolute -top-2 -right-2 bg-orange-500 text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
              {cart.length}
            </span>
          </div>
        </div>
      </div>
    </nav>
  );

  const Catalog = () => (
    <div className="p-6 max-w-7xl mx-auto">
      <h5 className="font-bold mb-6">
        Select your size, upload your art, and let us handle the rest. Whether
        it’s a 40" statement canvas or a custom vinyl project, our pro-grade
        materials and precision cropping tools ensure your prints look exactly
        how you imagined.
      </h5>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {PRODUCTS.map((product) => (
          <div
            key={product.id}
            className="border border-gray-200 rounded p-4 hover:shadow-lg transition cursor-pointer"
            onClick={() => {
              setSelectedProduct(product);
              setView("details");
            }}
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-64 object-cover mb-4"
            />
            <h3 className="font-medium text-lg text-blue-800 hover:text-orange-600 truncate">
              {product.title}
            </h3>
            <div className="flex items-center text-orange-500 my-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  fill={i < 4 ? "currentColor" : "none"}
                />
              ))}
              <span className="text-sm text-blue-600 ml-2">
                {product.reviews}
              </span>
            </div>
            <p className="text-2xl font-bold mt-2">${product.price}</p>
            <p className="text-sm text-gray-500">FREE delivery Saturday</p>
          </div>
        ))}
      </div>
    </div>
  );

  const ProductDetails = () => (
    <div className="p-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-8">
      {/* Image Section */}
      <div className="md:col-span-5 relative bg-gray-100 rounded-lg overflow-hidden min-h-[400px] flex items-center justify-center border-2 border-dashed border-gray-300">
        {!imageSrc ? (
          <div className="text-center p-8">
            <Upload size={48} className="mx-auto text-gray-400 mb-4" />
            <label className="bg-orange-400 hover:bg-orange-500 text-white px-4 py-2 rounded cursor-pointer shadow-sm">
              Upload Your Image
              <input
                type="file"
                className="hidden"
                onChange={handleUpload}
                accept="image/*"
              />
            </label>
            <p className="mt-2 text-sm text-gray-500">
              High resolution JPEG/PNG recommended
            </p>
          </div>
        ) : (
          <div className="relative w-full h-full">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={aspect}
              onCropChange={setCrop}
              onZoomChange={setZoom}
            />
            <div className="absolute bottom-4 left-4 right-4 bg-black/50 p-2 rounded flex items-center gap-4 text-white">
              <span className="text-xs">Zoom</span>
              <input
                type="range"
                min="1"
                max="3"
                step="0.1"
                value={zoom}
                onChange={(e) => setZoom(e.target.value)}
                className="flex-1"
              />
              <button
                onClick={() => setImageSrc(null)}
                className="text-xs bg-red-500 px-2 py-1 rounded"
              >
                Reset
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Options Section */}
      <div className="md:col-span-4">
        <h1 className="text-3xl font-semibold mb-2">{selectedProduct.title}</h1>
        <p className="text-blue-600 border-b pb-4 mb-4">
          Visit the PrintsPro Store
        </p>

        <div className="space-y-6">
          <div>
            <span className="font-bold text-sm">Size:</span>
            <div className="flex gap-2 mt-2">
              {selectedProduct.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() =>
                    setAspect(eval(size.replace(/"/g, "").split("x").join("/")))
                  }
                  className="border p-2 rounded hover:border-orange-500 text-sm"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="font-bold text-sm">Paper Type:</span>
            <select className="block w-full mt-2 border p-2 rounded bg-gray-50">
              {selectedProduct.papers.map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <span className="font-bold text-sm">Lamination:</span>
            <div className="flex gap-4 mt-2">
              {selectedProduct.laminations.map((l) => (
                <label key={l} className="flex items-center gap-2 text-sm">
                  <input type="radio" name="lamination" /> {l}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div className="md:col-span-3 border rounded-lg p-4 h-fit sticky top-24">
        <p className="text-3xl font-light">${selectedProduct.price}</p>
        <p className="text-green-600 text-sm font-bold my-2">In Stock.</p>
        <button
          onClick={() => addToCart(selectedProduct)}
          className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-full shadow mb-2 text-sm"
        >
          Add to Cart
        </button>
        <button
          onClick={() => addToCart(selectedProduct)}
          className="w-full bg-orange-500 hover:bg-orange-600 text-white py-2 rounded-full shadow text-sm"
        >
          Buy Now
        </button>
      </div>
    </div>
  );

  const Checkout = () => (
    <div className="p-6 max-w-5xl mx-auto bg-gray-50 min-h-screen">
      <div className="flex items-center gap-2 mb-8 text-sm text-gray-500">
        <span className="text-orange-600 font-bold">Cart</span>{" "}
        <ChevronRight size={16} />
        <span>Shipping</span> <ChevronRight size={16} />
        <span>Payment</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <div className="bg-white p-6 rounded shadow-sm">
            <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="flex gap-4 border-b py-4">
                  <img
                    alt="img-2"
                    src={item.image}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-800">{item.title}</h4>
                    <p className="text-sm text-green-600">
                      Custom print in progress
                    </p>
                    <button
                      className="text-xs text-blue-600 mt-2"
                      onClick={() =>
                        setCart(cart.filter((i) => i.id !== item.id))
                      }
                    >
                      Delete
                    </button>
                  </div>
                  <p className="font-bold">${item.price}</p>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded shadow-sm h-fit">
          <div className="flex items-center gap-2 text-green-700 text-sm mb-4">
            <CheckCircle size={16} />
            <span>Your order qualifies for FREE Shipping</span>
          </div>
          <p className="text-lg">
            Subtotal ({cart.length} items):{" "}
            <span className="font-bold">
              ${cart.reduce((a, b) => a + b.price, 0).toFixed(2)}
            </span>
          </p>
          <button className="w-full bg-yellow-400 hover:bg-yellow-500 py-2 rounded-lg mt-4 shadow font-medium">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="mt-[7.8rem] min-h-screen bg-white font-sans text-slate-900">
      <Navbar />
      {view === "catalog" && <Catalog />}
      {view === "details" && <ProductDetails />}
      {view === "checkout" && <Checkout />}
    </div>
  );
};

export default EStore;
