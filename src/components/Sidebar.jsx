import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaComments, FaImage, FaUser, FaVideo, FaLanguage, FaMusic, FaQrcode } from "react-icons/fa";

function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-[#1f1f2e] text-white flex flex-col py-8 px-4 transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <h2
          className={`text-2xl font-bold transition-opacity duration-300 ${
            isCollapsed ? "opacity-0" : "opacity-100"
          }`}
        >
          AI Navigator
        </h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white focus:outline-none"
        >
          {isCollapsed ? ">>" : "<<"}
        </button>
      </div>

      <nav className="mt-10 flex flex-col gap-6">
        <Link
          to="/"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaHome />
          {!isCollapsed && <span>Home</span>}
        </Link>

        <Link
          to="/main"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaComments />
          {!isCollapsed && <span>Conversation</span>}
        </Link>

        <Link
          to="/image"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaImage />
          {!isCollapsed && <span>Image Generation</span>}
        </Link>

        <Link
          to="/video"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaVideo />
          {!isCollapsed && <span>Video Generator</span>}
        </Link>

        <Link
          to="/Langgen"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaLanguage />
          {!isCollapsed && <span>Language Translator</span>}
        </Link>

        <Link
          to="/music"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaMusic />
          {!isCollapsed && <span>Music Generator</span>}
        </Link>

        {/* New Link for QR Code Generator */}
        <Link
          to="/qr"
          className="flex items-center gap-3 text-lg hover:text-pink-400 transition-colors"
        >
          <FaQrcode />
          {!isCollapsed && <span>QR Code Generator</span>}
        </Link>
      </nav>

      <div className="mt-auto flex items-center gap-3">
        <FaUser />
        {!isCollapsed && (
          <div>
            <p>Ramji</p>
            <p className="text-sm text-gray-400">Web Developer</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
