import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar.jsx';
import Home from './components/Home.jsx';
import Main from './components/Main.jsx';
import Image from './components/Image.jsx';
import Music from './components/Music.jsx';
import Video from './components/Video.jsx';
import Langgen from './components/Langgen.jsx';
import Qr from "./components/Qr.jsx";
import Code from "./components/Code.jsx";
// import Pdf from "./components/pdf.jsx"
import Weather from "./components/Weather.jsx"

function App() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      once: false,
      mirror: true
    });
  }, []);

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
              <Route path="/Music" element={<Music />} />
              <Route path="/Langgen" element={<Langgen />} />
              <Route path="/video" element={<Video />} />
              <Route path="/Qr" element={<Qr />} />
              <Route path="/Code" element={<Code />} />
              <Route path="/Weather" element={<Weather/>} />

            </Routes>
          </div>
        </div>
      </div>
    </Router>
 

  );
}

export default App;