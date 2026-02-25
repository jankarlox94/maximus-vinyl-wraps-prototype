import React from "react";

const products = [
  {
    id: 1,
    size: '24" x 36"',
    name: "Large Statement Poster",
    ratio: "2:3",
    price: 45.99,
    tag: "Best Seller",
    desc: "Gold standard for living rooms and offices.",
    comparison: "Above a standard office desk",
  },
  {
    id: 2,
    size: '18" x 24"',
    name: "Medium-Large Print",
    ratio: "3:4",
    price: 32.5,
    tag: "Popular",
    desc: "Great for gallery walls or bedrooms.",
    comparison: "Scale of a standard carry-on suitcase",
  },
  {
    id: 3,
    size: '16" x 20"',
    name: "The Classic Portrait",
    ratio: "4:5",
    price: 28.0,
    tag: "",
    desc: "The traditional portrait look.",
    comparison: "Half the width of a standard doorway",
  },
  {
    id: 4,
    size: '11" x 14"',
    name: "Small-Medium Personal",
    ratio: "11:14",
    price: 18.99,
    tag: "",
    desc: "Ideal for office desks or hallways.",
    comparison: "Slightly larger than a standard sheet of paper",
  },
  {
    id: 5,
    size: '12" x 12"',
    name: "Instagram Square",
    ratio: "1:1",
    price: 15.0,
    tag: "Trending",
    desc: "Modern minimalist decor and multi-panel sets.",
    comparison: "Size of a vinyl record sleeve",
  },
  {
    id: 6,
    size: '11" x 17"',
    name: "Tabloid / Small Poster",
    ratio: "11:17",
    price: 12.99,
    tag: "",
    desc: "The go-to for bulletin boards and shop windows.",
    comparison: "Standard menu size",
  },
  {
    id: 7,
    size: '22" x 28"',
    name: "Retail Standard Sign",
    ratio: "11:14",
    price: 38.0,
    tag: "",
    desc: "Standard sign size for malls and theaters.",
    comparison: "Fits inside a standard metal stanchion",
  },
  {
    id: 8,
    size: "2' x 6'",
    name: "Vertical Banner",
    ratio: "1:3",
    price: 85.0,
    tag: "Commercial",
    desc: "Perfect for trade shows or sidewalk A-frames.",
    comparison: "Human height (approx. 6ft tall)",
  },
  {
    id: 9,
    size: "3' x 6'",
    name: "Universal Vinyl Banner",
    ratio: "1:2",
    price: 110.0,
    tag: "Best Value",
    desc: "The 'Grand Opening' standard.",
    comparison: "Width of a double-door entrance",
  },
  {
    id: 10,
    size: "4' x 8'",
    name: "Outdoor Giant",
    ratio: "1:2",
    price: 195.0,
    tag: "Heavy Duty",
    desc: "Large outdoor marketing and construction sites.",
    comparison: "Full sheet of plywood / SUV side profile",
  },
];

const Storefront = () => {
  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Amazon-style Navbar */}
      <nav className="bg-[#131921] text-white p-3 flex items-center justify-between sticky top-0 z-50">
        <div className="text-2xl font-bold px-4">
          ScaleStore<span className="text-[#febd69]">.io</span>
        </div>
        <div className="flex-1 max-w-2xl mx-10 hidden md:block">
          <div className="flex">
            <input
              type="text"
              className="w-full p-2 rounded-l text-black"
              placeholder="Search sizes (e.g. 24x36)..."
            />
            <button className="bg-[#febd69] p-2 px-5 rounded-r text-black hover:bg-[#f3a847]">
              🔍
            </button>
          </div>
        </div>
        <div className="flex gap-6 px-4 text-sm">
          <div>
            Returns <br />
            <b>& Orders</b>
          </div>
          <div className="text-lg">
            🛒 <b>Cart</b>
          </div>
        </div>
      </nav>

      <div className="flex max-w-[1500px] mx-auto">
        {/* Sidebar */}
        <aside className="w-64 p-4 hidden lg:block bg-white border-r">
          <h3 className="font-bold mb-2">Department</h3>
          <ul className="text-sm space-y-1 mb-6">
            <li className="font-bold text-[#c45500]">All Pre-defined Sizes</li>
            <li className="hover:text-orange-700 cursor-pointer">
              Indoor Posters
            </li>
            <li className="hover:text-orange-700 cursor-pointer">
              Outdoor Banners
            </li>
            <li className="hover:text-orange-700 cursor-pointer">
              Retail Signage
            </li>
          </ul>
          <h3 className="font-bold mb-2">Customer Reviews</h3>
          <div className="text-yellow-500 text-sm">⭐⭐⭐⭐ & Up</div>
        </aside>

        {/* Product Grid */}
        <main className="flex-1 p-4">
          <h1 className="text-xl font-bold mb-4">Results</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-sm hover:shadow-lg transition-shadow overflow-hidden flex flex-col"
              >
                {/* Scale Comparison Image Placeholder */}
                <div className="bg-gray-200 h-64 relative flex items-center justify-center p-6">
                  <div className="absolute top-2 left-2 bg-red-600 text-white text-[10px] font-bold px-2 py-1 rounded">
                    {product.tag}
                  </div>
                  {/* This represents the visual scale logic */}
                  <div className="border-4 border-dashed border-gray-400 flex flex-col items-center justify-center p-4 text-center">
                    <span className="text-xs text-gray-500 mb-2 italic">
                      Comparison: {product.comparison}
                    </span>
                    <div
                      className="bg-white shadow-xl border border-gray-300 flex items-center justify-center font-bold text-gray-800"
                      style={{
                        width: "120px",
                        aspectRatio: product.ratio === "1:3" ? "1/3" : "3/4",
                      }}
                    >
                      {product.size}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col flex-grow">
                  <h2 className="text-lg font-medium leading-tight hover:text-[#c45500] cursor-pointer">
                    {product.name} - {product.size} Professional Print
                  </h2>
                  <div className="flex items-center mt-1">
                    <span className="text-yellow-500 text-sm">⭐⭐⭐⭐☆</span>
                    <span className="text-blue-600 text-xs ml-2">
                      421 ratings
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 flex-grow">
                    {product.desc}
                  </p>

                  <div className="mt-4">
                    <span className="text-sm align-top mt-1">$</span>
                    <span className="text-2xl font-bold">
                      {Math.floor(product.price)}
                    </span>
                    <span className="text-sm align-top mt-1">
                      {(product.price % 1).toFixed(2).substring(1)}
                    </span>
                  </div>

                  <p className="text-xs text-green-700 font-bold">In Stock</p>
                  <button className="mt-3 w-full bg-[#ffd814] hover:bg-[#f7ca00] py-2 rounded-full text-sm shadow-sm">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Storefront;
