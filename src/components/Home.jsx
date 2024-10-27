import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Image, Video, QrCode, CloudSun, Code } from 'lucide-react';
import { Globe } from 'lucide-react'; // Import the Globe icon for Language Translator
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Component() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const features = [
    { name: 'Conversation', icon: MessageSquare, to: '/main', color: 'from-violet-500 to-violet-600' },
    { name: 'Image Generation', icon: Image, to: '/image', color: 'from-pink-500 to-pink-600' },
    { name: 'Language Translator', icon: Globe, to: '/Langgen', color: 'from-emerald-500 to-emerald-600' }, // Updated line
    { name: 'Video Generation', icon: Video, to: '/video', color: 'from-orange-500 to-orange-600' },
    { name: 'QR Generator', icon: QrCode, to: '/qr', color: 'from-blue-500 to-blue-600' },
    { name: 'Weather', icon: CloudSun, to: '/weather', color: 'from-cyan-500 to-cyan-600' },
    { name: 'Code Generator', icon: Code, to: '/code', color: 'from-indigo-500 to-indigo-600' },
  ];

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-4">
      <h1 
        className="text-4xl md:text-5xl font-bold mb-6 text-center"
        data-aos="fade-down"
      >
        Explore the power of AI
      </h1>
      <p 
        className="text-xl mb-12 text-center max-w-2xl"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Chat with the smartest AI - Experience the power of AI across various domains
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
        {features.map((feature, index) => (
          <Link
            key={feature.name}
            to={feature.to}
            className={`flex items-center space-x-4 p-6 rounded-lg transition-all duration-300 bg-gradient-to-r ${feature.color} hover:shadow-lg hover:-translate-y-1`}
            data-aos="zoom-in"
            data-aos-delay={100 * (index + 1)}
          >
            <feature.icon className="w-8 h-8 flex-shrink-0" />
            <span className="text-lg font-semibold">{feature.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
