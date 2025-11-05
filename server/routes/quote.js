const express = require("express");
const router = express.Router();
const axios = require("axios");

// GET /api/quote
router.get("/", async (req, res) => {
  try {
    // Fetch random quote from ZenQuotes API
    const response = await axios.get("https://zenquotes.io/api/random");

    const quoteData = response.data[0];
    const quote = quoteData.q;
    const author = quoteData.a;

    res.json({
      source: "zenquotes.io",
      text: quote,
      author: author,
    });
  } catch (error) {
    console.error("❌ Quote API Error:", error.message);
    res.status(500).json({ error: "Could not fetch quote." });
  }
});

module.exports = router;
