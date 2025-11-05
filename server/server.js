require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// import routes
const weatherRoute = require("./routes/weather");
const convertRoute = require("./routes/convert");
const quoteRoute = require("./routes/quote");

const app = express();

// CORS
const corsOptions = process.env.ALLOWED_ORIGIN
  ? { origin: process.env.ALLOWED_ORIGIN }
  : {};
app.use(cors(corsOptions));

app.use(express.json());

// healthcheck
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// API routes
app.use("/api/weather", weatherRoute);
app.use("/api/convert", convertRoute);
app.use("/api/quote", quoteRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const distPath = path.join(__dirname, "../frontend/dist");
  app.use(express.static(distPath));
  app.get("*", (req, res) => {
    res.sendFile(path.join(distPath, "index.html"));
  });
}

// default route (non-production visibility)
app.get("/", (req, res) => {
  res.send("✅ InfoHub Backend is Running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
