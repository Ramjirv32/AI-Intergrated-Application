import React, { useState } from 'react';

export default function Langgen() {
  const [inputText, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [translatedText, setTranslatedText] = useState('');

  const languages = [
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'it', name: 'Italian' },
    { code: 'pt', name: 'Portuguese' },
    { code: 'ru', name: 'Russian' },
    { code: 'ja', name: 'Japanese' },
    { code: 'ko', name: 'Korean' },
    { code: 'zh', name: 'Chinese' },
    { code: 'hi', name: 'Hindi' }
  ];

  const handleTranslate = async () => {
    // Add your translation logic here
    // This is a placeholder - you'll need to implement actual translation
    setTranslatedText(`Translated text will appear here`);
  };

  return (
    <div 
      className="flex flex-col items-center min-h-screen p-4 md:p-8"
      data-aos="fade-up"
    >
      <div className="w-full max-w-4xl space-y-6">
        <h1 
          className="text-3xl md:text-4xl font-bold text-center text-white mb-8"
          data-aos="fade-down"
        >
          Language Translator
        </h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Section */}
          <div 
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            data-aos="fade-right"
            data-aos-delay="200"
          >
            <textarea
              className="w-full h-48 p-4 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter text to translate..."
              value={inputText}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          {/* Output Section */}
          <div 
            className="bg-gray-800 p-6 rounded-xl shadow-lg"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <div className="h-48 p-4 bg-gray-700 text-white rounded-lg overflow-auto">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>
        </div>

        {/* Controls */}
        <div 
          className="flex flex-col md:flex-row gap-4 items-center justify-center"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="px-4 py-2 rounded-lg bg-gray-700 text-white border border-gray-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>

          <button
            onClick={handleTranslate}
            className="px-6 py-2 bg-pink-500  text-white rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}
