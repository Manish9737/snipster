const mongoose = require("mongoose");
const shortid = require("shortid");

const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  shortCode: { type: String, default: shortid.generate },
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date },
  clickCount: { type: Number, default: 0 },
});

module.exports = mongoose.model("Url", urlSchema);
