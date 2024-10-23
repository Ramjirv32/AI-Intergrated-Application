import React, { useState, useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";
import download from "downloadjs";
import Swal from "sweetalert2"

const Qr = () => {
  const [link, setLink] = useState("");
  const qrRef = useRef(null);

  const handleGenerate = () => {
    if (!link) {
        Swal.fire({
            text: 'please provide link',
            icon: 'error',
            background: '#1f2937',
            color: '#f3f4f6',
          })
      return;
    }

    toPng(qrRef.current).then((dataUrl) => {
      download(dataUrl, "qr-code.png");
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white">
      <h1 className="text-4xl font-bold mb-6 text-pink-500">QR Code Generator</h1>

      <input
        type="text"
        placeholder="Enter your link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="p-2 mb-4 border border-gray-600 rounded shadow-sm w-80 bg-gray-800 text-white"
      />

      <div
        className="p-4 border-4 border-dashed border-gray-600 bg-gray-800 rounded-lg"
        ref={qrRef}
      >
     
        <QRCode value={link || ""} size={300} />
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 px-4 py-2 bg-pink-500 text-white rounded hover:bg-pink-600"
      >
        Generate QR Code
      </button>
    </div>
  );
};

export default Qr;
