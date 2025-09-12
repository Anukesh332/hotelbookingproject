const express = require('express');
const router = express.Router();
const adminAuth = require('../middlewares/auth');
const admin = require('../controllers/admincontroller');


router.post('/hotels', adminAuth, admin.createHotel);
router.post('/hotels/:id/special-date', adminAuth, admin.addSpecialDate);
router.post('/hotels/:id/special-range', adminAuth, admin.addSpecialRange);
router.patch('/hotels/:id/default-price', adminAuth, admin.updateDefaultPrice);


module.exports = router;