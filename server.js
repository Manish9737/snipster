const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const path = require('path');
var logger = require("morgan");
const { redirectToOriginalUrl } = require("./controllers/urlController");

dotenv.config();
const app = express();

const corsOptions = {
  origin: [
    "https://snipster.onrender.com",
    "https://manish9737.github.io/snipster",
    "http://localhost:1220"
  ],
  methods: ["GET", "POST", "PUT", "DELETE"], // Ensure allowed methods are included
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected :"+process.env.PORT))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use("/api/url", urlRoutes);

app.get('/:shortCode', redirectToOriginalUrl);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
