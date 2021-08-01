const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
    index: { type: Number, min: 0, required: true },
});

module.exports = mongoose.model('Country', countrySchema);
