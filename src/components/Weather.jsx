import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function Weather() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [image, setImage] = useState('');
  const [isFetched, setIsFetched] = useState(false);
  
  const key = process.env.REACT_APP_WEATHER_API_KEY;

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!key) {
      setError('API Key is missing. Please check your environment variables.');
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;

    try {
      const response = await axios.get(url);
      const w = response.data;

      let o;
      if (w.main.temp > 35) {
        o = 's1';
      } else if (w.main.temp > 30) {
        o = 'cs1';
      } else if (w.main.temp > 20) {
        o = 'rain';
      } else if (w.main.temp > 15) {
        o = 'rain2';
      } else {
        o = 'mist';
      }

      setWeather(w);
      setImage(o);
      setError(null);
      setIsFetched(true);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('City not found or API request failed.');
      setWeather(null);
      setImage('');
      setIsFetched(false);
    }
  };

  const slideStyle = {
    transform: isFetched ? 'translateX(0)' : 'translateX(100%)',
    transition: 'transform 0.5s ease-in-out',
    width: '100%',
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-transparent text-white p-4">
      <div className="bg-[#24283b] p-4 md:p-6 rounded-lg shadow-lg w-full max-w-lg mx-4" data-aos="fade-up">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-center">
          AI Weather Forecast
        </h1>
        
        <form className="flex flex-col md:flex-row gap-3 md:gap-4 mb-6">
          <input
            type="text"
            className="w-full p-3 rounded-full bg-[#1a1b26] text-sm md:text-base"
            name="city"
            id="box"
            placeholder="Enter location"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button className="w-full md:w-auto px-6 py-3 rounded-full">
            <Search className="w-5 h-5 mx-auto" />
          </button>
        </form>

        {error && <p className="text-center text-red-500 mt-4">{error}</p>}

        {weather && (
          <div className="mt-6 space-y-4">
            <div className="text-center">
              <img
                src={`img/${image}.png`}
                className="mx-auto h-[150px] md:h-[200px] w-auto"
                alt="Weather Icon"
              />
              <h4 className="text-pink-400 text-xl mt-4">{weather.weather[0].description}</h4>
              <p className="text-4xl text-gray-100 mt-2">{weather.main.temp} °C</p>
            </div>

            <div className="flex justify-around mt-6 text-gray-300 flex-wrap">
              <div className="text-center">
                <i className="fa-solid fa-wind text-pink-400 text-2xl mb-2"></i>
                <p className="text-lg">{weather.wind.speed} Km/hr</p>
                <h6 className="text-sm text-gray-400">Wind Speed</h6>
              </div>
              <div className="text-center">
                <i className="bi bi-droplet-fill text-pink-400 text-2xl mb-2"></i>
                <p className="text-lg">{weather.main.humidity} %</p>
                <h6 className="text-sm text-gray-400">Humidity</h6>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
