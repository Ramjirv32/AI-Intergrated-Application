'use client'

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare, Image, Video, QrCode, CloudSun, Code, Globe } from 'lucide-react';

export default function Component() {
  const navigate = useNavigate();

  const getButtonClass = (color) => {
    return `flex items-center justify-center space-x-2 md:space-x-4 p-3 md:p-6 rounded-lg transition-all duration-300 bg-gradient-to-r ${color} hover:scale-105 hover:shadow-lg w-full`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4 md:p-8">
      <h1 
        data-aos="fade-down"
        className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 text-center"
      >
        Explore the power of AI
      </h1>
      <p 
        data-aos="fade-up"
        data-aos-delay="100"
        className="text-base md:text-xl mb-8 md:mb-12 text-center max-w-2xl px-4"
      >
        Chat with the smartest AI - Experience the power of AI across various domains
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 w-full max-w-5xl px-2 sm:px-4">
        <button 
          data-aos="zoom-in"
          data-aos-delay="200"
          onClick={() => navigate('/main')} 
          className={getButtonClass('from-violet-500 to-violet-600')}
        >
          <MessageSquare className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Conversation</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="300"
          onClick={() => navigate('/image')} 
          className={getButtonClass('from-pink-500 to-pink-600')}
        >
          <Image className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Image Generation</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="400"
          onClick={() => navigate('/Langgen')} 
          className={getButtonClass('from-emerald-500 to-emerald-600')}
        >
          <Globe className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Language Translator</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="500"
          onClick={() => navigate('/video')} 
          className={getButtonClass('from-orange-500 to-orange-600')}
        >
          <Video className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Video Generation</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="600"
          onClick={() => navigate('/Qr')} 
          className={getButtonClass('from-blue-500 to-blue-600')}
        >
          <QrCode className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">QR Generator</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="700"
          onClick={() => navigate('/Weather')} 
          className={getButtonClass('from-cyan-500 to-cyan-600')}
        >
          <CloudSun className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Weather</span>
        </button>

        <button 
          data-aos="zoom-in"
          data-aos-delay="800"
          onClick={() => navigate('/Code')} 
          className={getButtonClass('from-indigo-500 to-indigo-600')}
        >
          <Code className="w-5 h-5 md:w-8 md:h-8" />
          <span className="text-sm md:text-lg font-semibold">Code Generator</span>
        </button>
      </div>
    </div>
  );
}
