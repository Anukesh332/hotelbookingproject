const { validationResult } = require('express-validator');
const Hotel = require('../models/Hotel');

exports.createHotel = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { name, latitude, longitude, photos = [], defaultPrice } = req.body;
        const hotel = await Hotel.create({
            name,
            location: { type: 'Point', coordinates: [Number(longitude), Number(latitude)] },
            photos,
            defaultPrice: Number(defaultPrice),
        });
        res.status(201).json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addSpecialDate = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { date, price } = req.body;
        const hotel = await Hotel.findById(id);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

        hotel.specialDates.push({ date: new Date(date), price: Number(price) });
        await hotel.save();

        res.json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.addSpecialRange = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { start, end, price } = req.body;
        const hotel = await Hotel.findById(id);
        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

        hotel.specialRanges.push({ start: new Date(start), end: new Date(end), price: Number(price) });
        await hotel.save();

        res.json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};

exports.updateDefaultPrice = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { id } = req.params;
        const { defaultPrice } = req.body;

        const hotel = await Hotel.findByIdAndUpdate(
            id,
            { defaultPrice: Number(defaultPrice) },
            { new: true }
        );

        if (!hotel) return res.status(404).json({ error: 'Hotel not found' });

        res.json(hotel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};