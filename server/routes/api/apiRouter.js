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

// @route PUT api/countries/:id
// @desc edit a country
// @access Public
router.put('/:id', async (req, res) => {
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

module.exports = router;
