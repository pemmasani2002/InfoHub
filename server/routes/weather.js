const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/weather?city=London
router.get("/", async (req, res) => {
  const city = req.query.city;
  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const apiKey = process.env.OPENWEATHER_KEY;
    if (!apiKey) {
      return res.json({
        source: "mock",
        city,
        tempC: 28,
        description: "Sunny (Mock Data)",
        humidity: 45,
      });
    }

    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;
    res.json({
      source: "openweathermap",
      city: data.name,
      tempC: data.main.temp,
      description: data.weather[0].description,
      humidity: data.main.humidity,
    });
  } catch (error) {
    res.status(500).json({ error: "Could not fetch weather data." });
  }
});

module.exports = router;
