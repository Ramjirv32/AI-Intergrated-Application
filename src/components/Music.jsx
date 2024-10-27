

import React, { useState, useEffect, useRef } from 'react';
import Swal from 'sweetalert2';
import WaveSurfer from 'wavesurfer.js';
import { Loader, Music as MusicIcon } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const languages = {
  en: "English",
  ta: "Tamil",
  es: "Spanish",
  fr: "French",
  de: "German",

};

export default function SpeechGenerator() {
  const [prompt, setPrompt] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [sourceLang, setSourceLang] = useState('en');
  const [targetLang, setTargetLang] = useState('ta');
  const [translatedText, setTranslatedText] = useState('');
  const waveSurferRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });

    if (waveformRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(255, 255, 255, 0.5)',
        progressColor: '#ec4899',
        cursorColor: '#ec4899',
        backgroundColor: 'transparent',
      });
    }
    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy();
      }
    };
  }, []);

  const query = async (data) => {
    const response = await fetch("https://api-inference.huggingface.co/models/suno/bark", {
      headers: {
        Authorization: "Bearer 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",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const audioBlob = await response.blob();
    return audioBlob;
  };

  const handleGenerateMusic = async () => {
    if (!prompt.trim()) {
      Swal.fire({
        text: 'Please enter a description for the speech generation.',
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      });
      return;
    }

    setLoading(true);
    try {
      const audioBlob = await query({ inputs: prompt });
      const audioObjectUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioObjectUrl);
      waveSurferRef.current?.load(audioObjectUrl);
      await handleTranslateText(); 
    } catch (error) {
      Swal.fire({
        text: 'Failed to fetch the audio. ' + error.message,
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTranslateText = async () => {
    try {
      const response = await fetch('http://127.0.0.1:9000/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: prompt,
          source_lang: sourceLang,
          target_lang: targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to translate text');
      }

      const data = await response.json();
      setTranslatedText(data.translated_text);
    } catch (error) {
      Swal.fire({
        text: 'Translation error: ' + error.message,
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center" data-aos="fade-down">
        <MusicIcon className="mr-2" /> Speech Generator
      </h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your text for speech generation..."
        className="w-full md:w-3/4 p-4 mb-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100"
        data-aos="fade-up"
        data-aos-delay="200"
      />

      <div className="flex space-x-4 mb-4">
        <div>
          <label htmlFor="sourceLang" className="text-sm">Source Language:</label>
          <select
            id="sourceLang"
            value={sourceLang}
            onChange={(e) => setSourceLang(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="targetLang" className="text-sm">Target Language:</label>
          <select
            id="targetLang"
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="bg-gray-800 border border-gray-700 rounded-lg p-2 text-gray-100"
          >
            {Object.entries(languages).map(([code, name]) => (
              <option key={code} value={code}>{name}</option>
            ))}
          </select>
        </div>
      </div>

      <button
        onClick={handleGenerateMusic}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors duration-300 flex items-center"
        disabled={loading}
        data-aos="fade-up"
        data-aos-delay="400"
      >
        {loading ? (
          <>
            <Loader className="animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <MusicIcon className="mr-2" />
            Generate Speech
          </>
        )}
      </button>

      <div
        className="w-full md:w-3/4 mt-6 bg-gray-800 rounded-lg p-4"
        ref={waveformRef}
        style={{ height: '200px' }}
        data-aos="fade-up"
        data-aos-delay="600"
      ></div>

      {audioUrl && (
        <div
          className="w-full md:w-3/4 mt-4 flex flex-col items-center"
          data-aos="fade-up"
          data-aos-delay="800"
        >
          <audio id="audioPlayer" controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>

          <a
            href={audioUrl}
            download="generated_speech.wav"
            className="mt-4 text-pink-400 hover:text-pink-300 underline transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-pink-500 rounded"
          >
            Download Generated Speech
          </a>
        </div>
      )}

      {translatedText && (
        <div className="w-full md:w-3/4 mt-4 p-4 bg-gray-800 rounded-lg">
          <h2 className="text-lg font-bold">Translated Text:</h2>
          <p>{translatedText}</p>
        </div>
      )}
    </div>
  );
}
