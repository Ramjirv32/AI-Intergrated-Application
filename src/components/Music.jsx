"use client"

import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2'
import WaveSurfer from 'wavesurfer.js'
import { Loader, Music as MusicIcon } from 'lucide-react'

export default function Music() {
  const [prompt, setPrompt] = useState('')
  const [duration, setDuration] = useState(30)
  const [audioUrl, setAudioUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const waveSurferRef = useRef(null)
  const waveformRef = useRef(null)

  useEffect(() => {
    if (waveformRef.current) {
      waveSurferRef.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor: 'rgba(255, 255, 255, 0.5)',
        progressColor: '#ec4899',
        cursorColor: '#ec4899',
        backgroundColor: 'transparent',
      })
    }

    return () => {
      if (waveSurferRef.current) {
        waveSurferRef.current.destroy()
      }
    }
  }, [])

  const handleGenerateMusic = async () => {
    if (!prompt.trim()) {
      Swal.fire({
        text: 'Please enter a description for the music generation.',
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      })
      return
    }

    setLoading(true)
    const formData = new FormData()
    formData.append('prompt', prompt)
    formData.append('duration', duration)

    try {
      const response = await fetch('/generate-music', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        const result = await response.json()
        setAudioUrl(result.url)

        if (waveSurferRef.current) {
          waveSurferRef.current.load(result.url)
        }
      } else {
        Swal.fire({
          text: 'Server returned an error response.',
          icon: 'error',
          background: '#1f2937',
          color: '#f3f4f6',
        })
      }
    } catch (error) {
      Swal.fire({
        text: 'Failed to fetch the audio.',
        icon: 'error',
        background: '#1f2937',
        color: '#f3f4f6',
      })
    }

    setLoading(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6 flex items-center">
        <MusicIcon className="mr-2" /> Music Generator
      </h1>
      
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Enter your description for the music..."
        className="w-full md:w-3/4 p-4 mb-4 bg-gray-800 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100"
      />
      
      <div className="w-full md:w-3/4 mb-4">
        <label htmlFor="duration" className="block mb-2">Duration: {duration} seconds</label>
        <input
          id="duration"
          type="range"
          min="10"
          max="120"
          value={duration}
          onChange={(e) => setDuration(Number(e.target.value))}
          className="w-full"
        />
      </div>
      
      <button
        onClick={handleGenerateMusic}
        className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-6 rounded-full disabled:opacity-50 transition-colors duration-300 flex items-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <Loader className="animate-spin mr-2" />
            Generating...
          </>
        ) : (
          <>
            <MusicIcon className="mr-2" />
            Generate Music
          </>
        )}
      </button>

      <div className="w-full md:w-3/4 mt-6 bg-gray-800 rounded-lg p-4" ref={waveformRef} style={{ height: '200px' }}></div>

      {audioUrl && (
        <div className="w-full md:w-3/4 mt-4 flex flex-col items-center">
          <audio id="audioPlayer" controls className="w-full">
            <source src={audioUrl} type="audio/mp3" />
          </audio>
          
          <a href={audioUrl} download className="mt-4 text-pink-400 hover:text-pink-300 underline transition-colors duration-300">
            Download Generated Music
          </a>
        </div>
      )}
    </div>
  )
}