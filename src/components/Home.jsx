import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="h-full flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-8">Welcome to AI Navigator</h1>
      <p className="text-xl mb-8">Explore the power of AI with our conversation and image generation tools.</p>
      <div className="flex gap-4">
        <Link to="/main" className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded transition-colors">
          Start Conversation
        </Link>
        <Link to="/image" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition-colors">
          Generate Images
        </Link>
      </div>
    </div>
  );
}

export default Home;