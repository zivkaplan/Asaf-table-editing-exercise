const express = require('express');
const mongoose = require('mongoose');
const Country = require('../../models/Country');

const router = express.Router();

// @route GET api/countries
// @desc get all countries
// @access Public
router.get('/', async (req, res) => {
    const countries = await Country.find().sort({ name: 1 });
    res.json(countries);
});

// @route POST api/countries
// @desc add country
// @access Public
router.post('/', async (req, res) => {
    const { name, capital } = req.body;
    const newCountry = new Country({ name, capital });
    await newCountry.save();
    res.send(newCountry);
});

module.exports = router;
