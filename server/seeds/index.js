if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const mongoose = require('mongoose');
const Country = require('../models/Country');

const countriesJson = require('../seeds/countries.json');
const countries = countriesJson.countries;

mongoose.connect(
    process.env.DB_URL || 'mongodb://localhost:27017/react-db-REST',
    {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
    }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console.error, 'conection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const seedDb = async () => {
    let i = 0;
    for (let country of countries) {
        country = new Country({
            name: country.countryName,
            capital: country.capital,
            index: i++,
        });
        await country.save();
    }
};

const dropReviewsDb = async () => {
    mongoose.connection.dropCollection('countries', function (err, result) {
        if (result) {
            console.log('Collection dropped');
        } else {
            console.log('Collection Not Found');
        }
    });
};

dropReviewsDb()
    .then(() => seedDb())
    .then(() => {
        mongoose.connection.close();
        console.log('Database closed');
    });
