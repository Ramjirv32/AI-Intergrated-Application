'use client'

import React, { useState } from 'react'
import Swal from 'sweetalert2'

const languages = [
  { code: 'en', name: 'English' },
  { code: 'ta', name: 'Tamil' },
  { code: 'fr', name: 'French' },
  { code: 'es', name: 'Spanish' }
];

export default function LanguageTranslator() {
  const [inputText, setInputText] = useState('')
  const [translatedText, setTranslatedText] = useState('')
  const [sourceLang, setSourceLang] = useState('en') 
  const [targetLang, setTargetLang] = useState('ta')
  const [isLoading, setIsLoading] = useState(false)

  const handleTranslate = async () => {
    setIsLoading(true)
    setTranslatedText('') 
    if (!inputText) {
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
      const response = await fetch(`http://127.0.0.1:9000/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          source: sourceLang, // Use selected source language
          target: targetLang,
        }),
      })

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch translation');
      }

      const data = await response.json();
      setTranslatedText(data.translatedText);
    } catch (error) {
      Swal.fire({
        text: 'Server returned an error response.',
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      })
      setTranslatedText('Translation failed. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-transparent shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-center text-white mb-6">Language Translator</h2>
        <div className="space-y-4">
          <textarea
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="w-full min-h-[100px] p-2 border border-gray-500 rounded focus:outline-none focus:ring-2 focus:ring-pink-500 bg-gray-800 text-white"
            maxLength={500} 
          />

          {/* Source Language Dropdown */}
          <select
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="w-full p-2 border border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          {/* Target Language Dropdown */}
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="w-full p-2 border border-gray-900 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 bg-gray-800 text-white"
          >
            {languages.map(lang => (
              <option key={lang.code} value={lang.code}>{lang.name}</option>
            ))}
          </select>

          <button 
            onClick={handleTranslate} 
            disabled={isLoading || !inputText}
            className="w-full py-2 px-4 bg-pink-700 text-white font-semibold rounded-lg shadow-md hover:bg-pink-600 focus:outline-none"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>

          <div>
            <h2 className="text-xl font-bold mb-2 text-white">Translated Text:</h2>
            <div className="p-2 bg-[#3B3F4C] rounded min-h-[100px] border border-gray-500 text-white">
              {translatedText || 'Translation will appear here...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
