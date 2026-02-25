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
import ElevenBy14 from "../../assets/11x14.webp";
import EighteenBy24 from "../../assets/18-by-24-medium-sized-poster.jpg";
import TwentyfourBy36 from "../../assets/24by36.jpg";
import TwentytwoBy28 from "../../assets/22_28_HOLDING_MOCKUP.jpg";
import Twoby6feet from "../../assets/2by6banner.png";
import Threeby6feet from "../../assets/3by6.png";
import Fourby8feet from "../../assets/4by8.png";

// const products = [
//   {
//     id: 1,
//     size: '24" x 36"',
//     name: "Large Statement Poster",
//     ratio: "2:3",
//     price: 45.99,
//     tag: "Best Seller",
//     desc: "Gold standard for living rooms and offices.",
//     comparison: "Above a standard office desk",
//   },
//   {
//     id: 2,
//     size: '18" x 24"',
//     name: "Medium-Large Print",
//     ratio: "3:4",
//     price: 32.5,
//     tag: "Popular",
//     desc: "Great for gallery walls or bedrooms.",
//     comparison: "Scale of a standard carry-on suitcase",
//   },
//   {
//     id: 3,
//     size: '16" x 20"',
//     name: "The Classic Portrait",
//     ratio: "4:5",
//     price: 28.0,
//     tag: "",
//     desc: "The traditional portrait look.",
//     comparison: "Half the width of a standard doorway",
//   },
//   {
//     id: 4,
//     size: '11" x 14"',
//     name: "Small-Medium Personal",
//     ratio: "11:14",
//     price: 18.99,
//     tag: "",
//     desc: "Ideal for office desks or hallways.",
//     comparison: "Slightly larger than a standard sheet of paper",
//   },
//   {
//     id: 5,
//     size: '12" x 12"',
//     name: "Instagram Square",
//     ratio: "1:1",
//     price: 15.0,
//     tag: "Trending",
//     desc: "Modern minimalist decor and multi-panel sets.",
//     comparison: "Size of a vinyl record sleeve",
//   },
//   {
//     id: 6,
//     size: '11" x 17"',
//     name: "Tabloid / Small Poster",
//     ratio: "11:17",
//     price: 12.99,
//     tag: "",
//     desc: "The go-to for bulletin boards and shop windows.",
//     comparison: "Standard menu size",
//   },
//   {
//     id: 7,
//     size: '22" x 28"',
//     name: "Retail Standard Sign",
//     ratio: "11:14",
//     price: 38.0,
//     tag: "",
//     desc: "Standard sign size for malls and theaters.",
//     comparison: "Fits inside a standard metal stanchion",
//   },
//   {
//     id: 8,
//     size: "2' x 6'",
//     name: "Vertical Banner",
//     ratio: "1:3",
//     price: 85.0,
//     tag: "Commercial",
//     desc: "Perfect for trade shows or sidewalk A-frames.",
//     comparison: "Human height (approx. 6ft tall)",
//   },
//   {
//     id: 9,
//     size: "3' x 6'",
//     name: "Universal Vinyl Banner",
//     ratio: "1:2",
//     price: 110.0,
//     tag: "Best Value",
//     desc: "The 'Grand Opening' standard.",
//     comparison: "Width of a double-door entrance",
//   },
//   {
//     id: 10,
//     size: "4' x 8'",
//     name: "Outdoor Giant",
//     ratio: "1:2",
//     price: 195.0,
//     tag: "Heavy Duty",
//     desc: "Large outdoor marketing and construction sites.",
//     comparison: "Full sheet of plywood / SUV side profile",
//   },
// ];
// --- Mock Data ---
const PRODUCTS = [
  //   {
  //     id: 1,
  //     title: "Custom Canvas Print - Large Format",
  //     tag: "Popular",
  //     price: 89.99,
  //     rating: 4.8,
  //     reviews: 124,
  //     sizes: ['20" x 40"', '24" x 36"', '30" x 40"'],
  //     papers: ["Matte Finish", "Satin Luster", "Glossy Metallic"],
  //     laminations: ["None", "UV Protective Gloss", "Matte Soft-Touch"],
  //     image:
  //       "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?auto=format&fit=crop&w=400",
  //   },
  //   {
  //     id: 2,
  //     title: "Fine Art Giclée Print",
  //     tag: "Popular",
  //     price: 45.0,
  //     rating: 4.9,
  //     reviews: 89,
  //     sizes: ['8" x 10"', '11" x 14"', '16" x 20"'],
  //     papers: ["Hahnemühle Photo Rag", "Archival Matte"],
  //     laminations: ["None"],
  //     image:
  //       "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400",
  //   },
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
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
    papers: ["Hahnemühle Photo Rag", "Archival Matte"],
    laminations: ["None"],
    image: Fourby8feet,
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
              {product.name} - {product.size}
            </h3>
            <h3 className="font-medium text-lg text-blue-800  truncate">
              {product.size}
            </h3>
            <h2 className="text-lg font-medium leading-tight hover:text-[#c45500] cursor-pointer">
              {product.desc}
            </h2>
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
