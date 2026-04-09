import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import React, { Suspense, lazy } from "react";
import Fondo from "./assets/fondo-presses.png";
import LandingPage from "./components/LandingPage/LandingPage";
import PrintProjectView from "./components/PrintProjectView/PrintProjectView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EStore from "./components/EStore/EStore";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop.jsx";
import MasterDashboard from "./components/MasterDashboard/MasterDashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLogin from "./components/AdminLogin/AdminLogin.jsx";

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
          <ScrollToTop />
          <Suspense
            fallback={
              <div className="min-h-screen bg-slate-900 flex justify-center items-center text-white">
                Loading...
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/contact2" element={<PrintProjectView />} />
              <Route path="/contact" element={<EStore />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <MasterDashboard />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Suspense>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
