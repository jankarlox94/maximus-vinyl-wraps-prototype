import Hero from "./components/Hero/Hero";
import Navbar from "./components/Navbar/Navbar";
import Fondo from "./assets/fondo-presses.png";
import LandingPage from "./components/LandingPage/LandingPage";

function App() {
  const bgImagen = {
    backgroundImage: `url(${Fondo})`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "bottom",
    backgroundSize: "cover",
    position: "relative",
  };

  return (
    <div className="flex justify-center overflow-hidden min-h-screen">
      <LandingPage />
      {/* <Navbar /> */}

      {/* <Hero /> */}
    </div>
  );
}

export default App;
