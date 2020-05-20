var mongoose = require('mongoose');

var LogoSchema = new mongoose.Schema({
  id: String,
  title: String,
  texts: [{ text: String, color: String, fontSize: { type: Number, min: 2, max: 144 }, x: Number, y: Number }],
  images: [{ url: String, width: Number, height: Number, x: Number, y: Number }],
  backgroundColor: String,
  borderColor: String,
  borderRadius: { type: Number, min: 2, max: 144},
  borderWidth: {type: Number, min: 2, max: 144},
  padding: {type: Number, min: 2, max: 144},
  margin: {type: Number, min: 2, max: 144},
  height: { type: Number, min: 5, max: 10000},
  width: { type: Number, min: 5, max: 10000},
  lastUpdate: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Logo', LogoSchema);