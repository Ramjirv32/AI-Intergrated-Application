

import React, { useState, useRef, useEffect } from "react"
import QRCode from "react-qr-code"
import { toPng } from "html-to-image"
import download from "downloadjs"
import Swal from "sweetalert2"
import AOS from "aos"
import "aos/dist/aos.css"

export default function QrCodeGenerator() {
  const [link, setLink] = useState("")
  const qrRef = useRef(null)

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    })
  }, [])

  const handleGenerate = () => {
    if (!link) {
      Swal.fire({
        text: "Please provide a link",
        icon: "error",
        background: "#1f2937",
        color: "#f3f4f6",
      })
      return
    }

    toPng(qrRef.current).then((dataUrl) => {
      download(dataUrl, "qr.png")
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent text-white p-4">
      <h1
        className="text-4xl font-bold mb-6 text-pink-500"
        data-aos="fade-down"
      >
        QR Code Generator
      </h1>

      <input
        type="text"
        placeholder="Enter your link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="p-2 mb-4 border border-gray-600 rounded shadow-sm w-full max-w-md bg-gray-800 text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
        data-aos="fade-right"
      />

      <div
        className="p-4 border-4 border-dashed border-gray-600 bg-gray-800 rounded-lg"
        ref={qrRef}
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <QRCode value={link || "https://example.com"} size={256} />
      </div>

      <button
        onClick={handleGenerate}
        className="mt-6 px-6 py-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        Generate QR Code
      </button>
    </div>
  )
}