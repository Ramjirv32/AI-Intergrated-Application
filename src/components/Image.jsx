import React, { useRef, useState } from 'react';
import { MdSend } from 'react-icons/md';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { AiOutlineDownload } from 'react-icons/ai'; // Import download icon

const Image = () => {
  const [imageu, setImageu] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const placeholderImage = "https://v0.dev/placeholder.svg?height=400&width=400";
  const key = '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';

  const fetchImage = async (event) => {
    event.preventDefault();
    if (inputRef.current?.value === "") {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-dev", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${key}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: inputRef.current?.value }),
      });
      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
      const blob = await response.blob();
      const imageUrl = URL.createObjectURL(blob);
      setImageu(imageUrl);
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-4xl font-bold text-center text-white mb-8">
          AI image <span className="text-pink-500">generator</span>
        </h1>
        <div className="w-full aspect-square bg-gray-800 rounded-lg overflow-hidden flex items-center justify-center relative">
          {loading ? (
            <AiOutlineLoading3Quarters className="w-24 h-24 text-pink-500 animate-spin" />
          ) : (
            <img src={imageu === "" ? placeholderImage : imageu} className="w-full h-full object-cover" alt="Generated" />
          )}
          {imageu && !loading && (
            <a 
              href={imageu} 
              download="generated-image.png" // Default filename for download
              className="absolute bottom-2 right-2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
              aria-label="Download image"
            >
              <AiOutlineDownload className="w-5 h-5" />
            </a>
          )}
        </div>
        <div className="w-full relative">
          <input
            type="text"
            ref={inputRef}
            placeholder="Describe what you want to see"
            className="w-full py-3 px-4 bg-gray-700 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <button 
            onClick={fetchImage} 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-pink-500 text-white p-2 rounded-full hover:bg-pink-600 transition-colors"
          >
            <MdSend className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Image;
