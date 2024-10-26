

import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import AOS from 'aos';
import 'aos/dist/aos.css';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' }
];

export default function LanguageTranslator() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ta');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleTranslate = async () => {
    setIsLoading(true);
    setTranslatedText('');
    if (inputText === '') {
      Swal.fire({
        text: 'Input text cannot be empty.',
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      });
      setIsLoading(false);
      return;
    }
    try {
      const response = await fetch(`http://51.20.8.79:5000//translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Error Response:", errorData); 
        throw new Error(errorData.detail || 'Failed to fetch translation');
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      Swal.fire({
        text: 'Translation failed: ' + error.message,
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      });
      setTranslatedText('Translation failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-transparent shadow-lg rounded-lg overflow-hidden" data-aos="fade-up">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6" data-aos="fade-down">Language Translator</h2>
        <div className="space-y-4">
          <textarea
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full min-h-[100px] p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white"
            maxLength={500}
            data-aos="fade-right"
          />

          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-2 border border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white"
            data-aos="fade-right"
            data-aos-delay="100"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <button
            onClick={handleTranslate}
            className="w-full py-2 px-4 bg-pink-700 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>

          <div data-aos="fade-left" data-aos-delay="400">
            <h2 className="text-xl font-bold mb-2 text-white">Translated Text:</h2>
            <div className="p-2 bg-[#3B3F4C] rounded min-h-[100px] border border-gray-500 text-white">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}