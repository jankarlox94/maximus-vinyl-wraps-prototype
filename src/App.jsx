import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Fondo from "./assets/fondo-presses.png";
import LandingPage from "./components/LandingPage/LandingPage";
import PrintProjectView from "./components/PrintProjectView/PrintProjectView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EStore from "./components/EStore/EStore";
import Storefront from "./components/StoreFront/StoreFront";

function App() {
  const bgImagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    position: "relative",
  };

  return (
    <BrowserRouter>
      <div className="flex justify-center overflow-hidden min-h-screen">
        <div className="min-h-screen bg-[#0f1115] text-gray-100 font-sans selection:bg-cyan-500/30">
          <Navbar />

          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/contact" element={<PrintProjectView />} />
            <Route path="/contact2" element={<EStore />} />
            <Route path="/contact3" element={<Storefront />} />
          </Routes>
        </div>

        {/* <Navbar /> */}

        {/* <Hero /> */}
      </div>
    </BrowserRouter>
  );
}

export default App;
