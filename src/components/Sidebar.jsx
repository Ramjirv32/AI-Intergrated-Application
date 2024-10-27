import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaHome,
  FaComments,
  FaImage,
  FaUser,
  FaLanguage,
  FaQrcode,
  FaCloudSun,
  FaAngleLeft,
  FaAngleRight,
  FaCode,
  FaVideo,
  FaEye
} from "react-icons/fa";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(true); // Start collapsed

  // Effect to manage sidebar state based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false); // Expand on larger screens
      } else {
        setIsCollapsed(true); // Collapse on mobile
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Initial check

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <div
        className={`h-screen ${isCollapsed ? "w-20 px-2" : "w-64 px-4"} bg-[#1f1f2e] text-white flex flex-col py-8 transition-all duration-300`}
      >
        <div className="flex items-center justify-between">
          <h2
            className={`text-2xl font-bold transition-opacity duration-300 ${isCollapsed ? "opacity-0" : "opacity-100"}`}
          >
            AI Navigator
          </h2>
        </div>

        <nav className="mt-10 flex flex-col gap-6">
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

        <div className="mt-auto flex items-center gap-3">
          <FaUser />
          {!isCollapsed && (
            <div className="flex flex-col">
              <div className="flex items-center">
                <p className="text-sm text-gray-400">Ramji</p>
                <p className="text-sm text-gray-400 ml-3">Web Developer</p>
              </div>
              <a
                href="https://portfolio-tan-iota-74.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center mt-1"
              >
                View Portfolio
                <FaEye className="text-gray-400 hover:text-pink-400 transition-colors ml-4" />
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Toggle button only visible on larger screens */}
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
