const express = require('express');
const mongoose = require('mongoose');
const Country = require('../../models/Country');

const router = express.Router();

// @route POST api/countries
// @desc add country
// @access Public
router.post('/', async (req, res) => {
    try {
        const { name, capital, index } = req.body;
        const newCountry = new Country({ name, capital, index });
        await newCountry.save();
        res.send(newCountry);
    } catch (e) {
        res.status(404).json({ success: false });
        console.log(e);
    }
});

// @route PUT api/countries/edit/:id
// @desc edit a country
// @access Public
router.put('/edit/:id', async (req, res) => {
    try {
        const { name, capital } = req.body;
        const item = await Country.findByIdAndUpdate(req.params.id, {
            name,
            capital,
        });
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route PUT api/countries/reorder/
// @desc edit a country's index
// @access Public
router.put('/reorder', async (req, res) => {
    try {
        // console.log(req.body);
        const { mainCountry, neighborCountry } = req.body;
        await Country.findByIdAndUpdate(mainCountry._id, mainCountry);
        await Country.findByIdAndUpdate(neighborCountry._id, neighborCountry);
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route DELETE api/countries/:id
// @desc delete a country
// @access Public
router.delete('/:id', async (req, res) => {
    try {
        const item = await Country.findById(req.params.id);
        await item.remove();
        res.json({ success: true });
    } catch (e) {
        res.status(404).json({ success: false });
    }
});

// @route GET api/countries
// @desc get all countries
// @access Public
router.get('/', async (req, res) => {
    const countries = await Country.find().sort({ index: 1 });
    res.json(countries);
});

module.exports = router;
