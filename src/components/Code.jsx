import React, { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ClipboardIcon } from '@heroicons/react/24/outline';
import loadingGIF from './images/AI-think.gif';
import AOS from 'aos';
import 'aos/dist/aos.css';

const CodeGenerator = () => {
  const [inputText, setInputText] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Customize the duration as needed
  }, []);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleGenerateCode = async () => {
    if (!inputText.trim()) {
      showAlert('Please enter a question or request.', 'error');
      return;
    }

    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-pro',
        tools: [{ codeExecution: {} }],
      });

      const result = await model.generateContent(`${inputText} Generate code without comments and explanation.`);
      const codeText = result.response.text();
      setGeneratedCode(codeText);
    } catch (error) {
      showAlert('Failed to generate code. ' + error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedCode)
      .then(() => showAlert('Code copied to clipboard!', 'success'))
      .catch((err) => showAlert('Failed to copy code. ' + err.message, 'error'));
  };

  const showAlert = (text, icon) => {
    Swal.fire({
      text,
      icon,
      background: '#1f2937',
      color: '#f3f4f6',
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-100 p-6 space-y-6">
      <h1 data-aos="fade-up" className="text-4xl font-bold">Code Generator</h1>

      <textarea
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter your request..."
        className="w-full md:w-3/4 p-4 bg-[#2B2F41] rounded-lg border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-pink-500"
        data-aos="fade-right"
      />

      <button
        onClick={handleGenerateCode}
        className={`bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full transition-colors duration-300 ${loading ? 'disabled:opacity-50' : ''}`}
        disabled={loading}
        data-aos="fade-up"
      >
        {loading ? 'Generating...' : 'Generate Code'}
      </button>
      
      {loading && (
        <img src={loadingGIF} alt="Loading..." style={{ width: '350px', height: '200px' }} className="mt-4" data-aos="zoom-in" />
      )}

      {generatedCode && (
        <div className="relative w-full md:w-3/4 bg-[#2B2F41] rounded-lg p-4 mt-4" data-aos="fade-left">
          <button
            onClick={handleCopyToClipboard}
            className="absolute top-2 right-2 text-gray-400 hover:text-white"
            aria-label="Copy code"
          >
            <ClipboardIcon className="h-6 w-6" />
          </button>
          <pre className="whitespace-pre-wrap break-words p-4 bg-[#1E213A] rounded-md overflow-x-auto text-sm text-gray-100">
            {generatedCode}
          </pre>
        </div>
      )}
    </div>
  );
};

export default CodeGenerator;
