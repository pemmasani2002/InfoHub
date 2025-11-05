require("dotenv").config();
const express = require("express");
const cors = require("cors");

// import routes
const weatherRoute = require("./routes/weather");
const convertRoute = require("./routes/convert");
const quoteRoute = require("./routes/quote");

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use("/api/weather", weatherRoute);
app.use("/api/convert", convertRoute);
app.use("/api/quote", quoteRoute);

// default route
app.get("/", (req, res) => {
  res.send("✅ InfoHub Backend is Running");
});

// start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
