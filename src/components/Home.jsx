'use client'

import React from 'react';
import { MessageSquare, Image, Video, QrCode, CloudSun, Code, Globe } from 'lucide-react';

export default function Component() {
  const getButtonClass = (color) => {
    return `flex items-center space-x-4 p-4 md:p-6 rounded-lg transition-all duration-300 bg-gradient-to-r ${color} hover:scale-105 hover:shadow-lg`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-6 text-center">
        Explore the power of AI
      </h1>
      <p className="text-lg md:text-xl mb-12 text-center max-w-2xl">
        Chat with the smartest AI - Experience the power of AI across various domains
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 gap-4 w-full max-w-5xl">
        <button className={getButtonClass('from-violet-500 to-violet-600')}>
          <MessageSquare className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Conversation</span>
        </button>

        <button className={getButtonClass('from-pink-500 to-pink-600')}>
          <Image className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Image Generation</span>
        </button>

        <button className={getButtonClass('from-emerald-500 to-emerald-600')}>
          <Globe className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Language Translator</span>
        </button>

        <button className={getButtonClass('from-orange-500 to-orange-600')}>
          <Video className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Video Generation</span>
        </button>

        <button className={getButtonClass('from-blue-500 to-blue-600')}>
          <QrCode className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">QR Generator</span>
        </button>

        <button className={getButtonClass('from-cyan-500 to-cyan-600')}>
          <CloudSun className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Weather</span>
        </button>

        <button className={getButtonClass('from-indigo-500 to-indigo-600')}>
          <Code className="w-8 h-8 flex-shrink-0" />
          <span className="text-sm md:text-lg font-semibold">Code Generator</span>
        </button>
      </div>
    </div>
  );
}
