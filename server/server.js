require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");

// import routes
const weatherRoute = require("./routes/weather");
const convertRoute = require("./routes/convert");
const quoteRoute = require("./routes/quote");

const app = express();

// CORS (supports multiple origins)
const allowedList = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((s) => s.trim()).filter(Boolean)
  : process.env.ALLOWED_ORIGIN
  ? [process.env.ALLOWED_ORIGIN]
  : null; // null/undefined → allow all

const corsOptions = {
  origin: (origin, callback) => {
    // Allow requests with no origin (same-origin, curl) or when no list is set
    if (!allowedList || !origin) return callback(null, true);
    if (allowedList.includes(origin)) return callback(null, true);
    return callback(new Error("Not allowed by CORS"));
  },
};
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
