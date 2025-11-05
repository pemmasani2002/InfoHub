import React, { useState } from "react";
import axios from "axios";

export default function QuoteGenerator() {
  const [quote, setQuote] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getQuote = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("/api/quote");
      setQuote(res.data);
    } catch (err) {
      setError("Could not fetch quote.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        💬 Motivational Quote
      </h2>

      <button
        onClick={getQuote}
        className="bg-blue-500 text-white px-4 py-1 rounded mb-4"
      >
        Get Quote
      </button>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {quote && (
        <blockquote className="bg-blue-50 p-3 rounded italic">
          “{quote.text}” — <strong>{quote.author}</strong>
        </blockquote>
      )}
    </div>
  );
}

