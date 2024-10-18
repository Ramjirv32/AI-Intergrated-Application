import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import Main from './components/Main';
import Image from './components/Image';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="h-full w-full bg-gradient-to-br from-gray-900 to-gray-800 p-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/main" element={<Main />} />
              <Route path="/image" element={<Image />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;