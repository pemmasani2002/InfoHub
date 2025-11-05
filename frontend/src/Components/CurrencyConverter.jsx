import React, { useState } from "react";
import axios from "axios";

export default function CurrencyConverter() {
  const [amount, setAmount] = useState(100);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRates = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(`/api/convert?amount=${amount}`);
      setData(res.data.conversions);
    } catch (err) {
      setError("Could not fetch currency data.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">
        💱Indian Currency → Global Currency 
      </h2>

      <div className="flex justify-center mb-4">
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded px-3 py-1 w-28 mr-2"
        />
        <button
          onClick={getRates}
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-600"
        >
          Convert
        </button>
      </div>

      {loading && <p className="text-gray-500">Loading live rates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {data && (
        <div className="bg-blue-50 p-3 rounded text-left">
          <h3 className="font-medium text-gray-800 mb-2">
            ₹{amount} INR equals:
          </h3>
          <ul className="list-disc pl-5">
            {Object.entries(data)
              .sort(([aKey, aVal], [bKey, bVal]) => bVal - aVal)
              .map(([currency, value]) => (
                <li key={currency} className="text-gray-700">
                  <strong>{currency}</strong>: {value}
                </li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
