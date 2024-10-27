import React, { useState } from 'react'
import axios from 'axios'
import { Loader, Search } from 'lucide-react'

export default function FootballVideo() {
  const [searchTerm, setSearchTerm] = useState('boy playing football')
  const [videoUrl, setVideoUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const API_KEY = '9KE77LSWEDUs8sgN5FeGt3yETmsxb2xstHkHSoEQq3MGWWkjuAwWKmMu'

  const handleFetchVideo = async () => {
    if (!searchTerm.trim()) {
      return alert('Please enter a search term.')
    }

    setLoading(true)
    setVideoUrl('')
    try {
      const response = await axios.get('https://api.pexels.com/videos/search', {
        headers: {
          Authorization: API_KEY
        },
        params: {
          query: searchTerm,
          per_page: 5,
          page: 1
        }
      })

      const videos = response.data.videos
      if (videos.length > 0) {
        const firstVideoUrl = videos[0].video_files[0].link
        setVideoUrl(firstVideoUrl)
        console.log('First video URL:', firstVideoUrl)
      } else {
        alert('No videos found for the search query.')
        console.log('No videos found for the search query.')
      }
    } catch (error) {
      console.error('Error accessing Pexels API:', error.response ? error.response.data : error.message)
      alert('Error fetching the video. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-transparent p-4 text-gray-100">
      <h2 className="text-3xl font-bold mb-6">Search for Video</h2>
      <p className="text-sm text-gray-400 mb-4">
        Note: This video generator fetches pre-existing videos based on input values and does not create AI-generated content. The fetched video may not be fully accurate as it pulls from previously saved video content.
      </p>

      <div className="mb-6 flex flex-col sm:flex-row items-center w-full max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Enter search term..."
          className="p-2 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500 text-gray-100 bg-gray-800 flex-grow sm:mr-4 mb-2 sm:mb-0"
        />
        <button
          type="button"
          onClick={handleFetchVideo}
          className="bg-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300 flex items-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Search
        </button>
      </div>

      {loading ? (
        <Loader className="animate-spin text-4xl text-pink-500" />
      ) : (
        videoUrl && (
          <div className="rounded-lg overflow-hidden shadow-lg mt-6 bg-gray-800">
            <video className="w-full h-auto max-w-2xl" controls>
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        )
      )}
    </div>
  )
}
