import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CustomBackground from "../components/CustomBackground";

export default function MainLayout() {
  const location = useLocation();

  return (
    <div className="relative isolate min-h-screen flex flex-col overflow-x-clip bg-white">
      <CustomBackground
        position="fixed"
        zIndex={0}
        particles={160}
        color="#0f172a"
        size={1.35}
        staticity={70}
        ease={22}
        vx={0.04}
        vy={0.03}
        opacityMin={0.18}
        opacityMax={0.62}
        edgeFadeDistance={150}
        overlay="linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.42) 50%, rgba(255,255,255,0.82) 100%)"
      />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.main
          className="relative z-10 flex-1"
          key={location.pathname}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.24, ease: "easeOut" }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <div className="relative z-10">
        <Footer />
      </div>
    </div>
  );
}
