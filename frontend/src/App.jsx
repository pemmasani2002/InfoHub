import React, { useState } from "react";
import WeatherModule from "./Components/WeatherModule";
import CurrencyConverter from "./Components/CurrencyConverter";
import QuoteGenerator from "./Components/QuoteGenerator";

export default function App() {
  const [activeTab, setActiveTab] = useState("weather");

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">🌐 InfoHub Real-Time Weather, Indian Currency & Quotes Web App</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "weather"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => setActiveTab("weather")}
        >
          Weather
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "currency"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => setActiveTab("currency")}
        >
          Currency
        </button>
        <button
          className={`px-4 py-2 rounded-lg ${
            activeTab === "quotes"
              ? "bg-blue-600 text-white"
              : "bg-white border border-gray-300"
          }`}
          onClick={() => setActiveTab("quotes")}
        >
          Quotes
        </button>
      </div>

      {/* Render Components */}
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
        {activeTab === "weather" && <WeatherModule />}
        {activeTab === "currency" && <CurrencyConverter />}
        {activeTab === "quotes" && <QuoteGenerator />}
      </div>
    </div>
  );
}
