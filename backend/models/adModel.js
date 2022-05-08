const mongoose = require('mongoose');

const adsSchema = {
  advertisementId: Number,
  date: String,
  advertisementTitle: String,
  advertisementDescription: String,
  advertisementUrl: String,
  advertisementStatus: String,
};

const Advertisement = mongoose.model('Advertisement', adsSchema, 'advertisementsV2');

module.exports = Advertisement;
