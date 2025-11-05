import React, { useState } from "react";
import axios from "axios";

export default function WeatherModule() {
  const [city, setCity] = useState("Hyderabad");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchWeather = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(
        `/api/weather?city=${city}`
      );
      setData(res.data);
    } catch (err) {
      setError("Could not fetch weather data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        🌦 Weather Information
      </h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="border border-gray-300 rounded px-2 py-1 flex-1"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-800"
        >
          Get
        </button>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-blue-50 p-3 rounded">
          <p>
            <strong>City:</strong> {data.city}
          </p>
          <p>
            <strong>Temperature:</strong> {data.tempC} °C
          </p>
          <p>
            <strong>Condition:</strong> {data.description}
          </p>
          <p>
            <strong>Humidity:</strong> {data.humidity}%
          </p>
        </div>
      )}
    </div>
  );
}
