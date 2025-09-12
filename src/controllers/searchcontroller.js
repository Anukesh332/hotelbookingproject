const Hotel = require('../models/Hotel');
const { computeTotalPrice } = require('../utils/pricing');


exports.searchHotels = async (req, res) => {
    try {
        const { latitude, longitude, radius = 10, startDate, endDate, page = 1, limit = 10 } = req.query;
        if (!latitude || !longitude || !startDate || !endDate) {
            return res.status(400).json({ error: 'latitude, longitude, startDate, endDate required' });
        }


        const lng = Number(longitude);
        const lat = Number(latitude);
        const meters = Number(radius) * 1000;


        const skip = (Math.max(1, Number(page)) - 1) * Number(limit);

        const hotels = await Hotel.find({
            location: {
                $near: {
                    $geometry: { type: 'Point', coordinates: [lng, lat] },
                    $maxDistance: meters
                }
            }
        }).skip(skip).limit(Number(limit));


        const results = hotels.map(h => {
            const { total, nightsCount } = computeTotalPrice(startDate, endDate, h);
            return {
                id: h._id,
                name: h.name,
                photos: h.photos,
                location: { latitude: h.location.coordinates[1], longitude: h.location.coordinates[0] },
                defaultPrice: h.defaultPrice,
                nights: nightsCount,
                totalPrice: total
            };
        });

        res.json({ count: results.length, results });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
};