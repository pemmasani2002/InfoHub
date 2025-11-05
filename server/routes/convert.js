const express = require("express");
const router = express.Router();
const axios = require("axios");

// 💱 Example: /api/convert?amount=100
router.get("/", async (req, res) => {
  const amount = parseFloat(req.query.amount || "1");
  if (isNaN(amount)) return res.status(400).json({ error: "Invalid amount" });

  try {
    // ✅ Fetch all exchange rates for INR
    const response = await axios.get(
      "https://api.frankfurter.app/latest?from=INR"
    );

    const rates = response.data.rates;

    // Convert all currencies
    const conversions = {};
    for (const [currency, rate] of Object.entries(rates)) {
      conversions[currency] = (rate * amount).toFixed(2);
    }

    res.json({
      source: "frankfurter.app",
      from: "INR",
      baseAmount: amount,
      conversions,
    });
  } catch (error) {
    console.error("❌ Currency API Error:", error.message);
    res.status(500).json({ error: "Could not convert currency." });
  }
});

module.exports = router;
