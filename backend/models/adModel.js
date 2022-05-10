const mongoose = require('mongoose');

const adsSchema = {
  date: String,
  advertisementTitle: String,
  advertisementDescription: String,
  advertisementUrl: String,
  advertisementStatus: String,
  advertisementTokenId: String,
};

const Advertisement = mongoose.model('Advertisement', adsSchema, 'advertisementsV2');

module.exports = Advertisement;
