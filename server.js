const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const urlRoutes = require("./routes/urlRoutes");
const path = require('path');
const { redirectToOriginalUrl } = require("./controllers/urlController");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

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
