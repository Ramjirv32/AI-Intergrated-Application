import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaImage,
  FaLanguage,
  FaQrcode,
  FaCloudSun,
  FaAngleLeft,
  FaAngleRight,
  FaCode,
  FaVideo
} from "react-icons/fa";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true); 

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      } else {
        setIsCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div
        className={`h-screen ${
          isCollapsed ? "w-16 sm:w-20 px-2" : "w-48 sm:w-64 px-4"
        } bg-[#1f1f2e] text-white flex flex-col py-4 sm:py-8 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-xl sm:text-2xl font-bold transition-opacity duration-300 ${
              isCollapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            AI Navigator
          </h2>
        </div>

        <nav className="mt-6 sm:mt-10 flex flex-col gap-6">
          <Link to="/" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaHome />
            {!isCollapsed && <span>Home</span>}
          </Link>

          <Link to="/main" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaComments />
            {!isCollapsed && <span>Conversation</span>}
          </Link>

          <Link to="/image" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaImage />
            {!isCollapsed && <span>Image Generation</span>}
          </Link>

          <Link to="/Video" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaVideo />
            {!isCollapsed && <span>Video Fetcher</span>}
          </Link>

          <Link to="/Langgen" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaLanguage />
            {!isCollapsed && <span>Language Translator</span>}
          </Link>

          <Link to="/qr" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaQrcode />
            {!isCollapsed && <span>QR Code Generator</span>}
          </Link>

          <Link to="/Code" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaCode />
            {!isCollapsed && <span>Code Generator</span>}
          </Link>

          <Link to="/Weather" className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors">
            <FaCloudSun />
            {!isCollapsed && <span>Weather</span>}
          </Link>
        </nav>
      </div>

      {!isCollapsed && (
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`absolute top-8 -right-3 bg-[#1f1f2e] text-white p-1 rounded-full focus:outline-none`}
        >
          {isCollapsed ? <FaAngleRight /> : <FaAngleLeft />}
        </button>
      )}
    </div>
  );
}

export default Sidebar;
