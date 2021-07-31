const mongoose = require('mongoose');

const countrySchema = new mongoose.Schema({
    name: { type: String, required: true },
    capital: { type: String, required: true },
});

module.exports = mongoose.model('Country', countrySchema);
