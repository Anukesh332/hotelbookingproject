const mongoose = require('mongoose');


const SpecialDateSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    price: { type: Number, required: true }
}, { _id: false });


const SpecialRangeSchema = new mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    price: { type: Number, required: true }
}, { _id: false });


const HotelSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: { type: [Number], required: true } 
    },
    photos: [{ type: String }],
    defaultPrice: { type: Number, required: true },
    specialDates: [SpecialDateSchema],
    specialRanges: [SpecialRangeSchema],
}, { timestamps: true });


HotelSchema.index({ location: '2dsphere' });


module.exports = mongoose.model('Hotel', HotelSchema);