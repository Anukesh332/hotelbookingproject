const express = require('express');
const router = express.Router();
const search = require('../controllers/searchcontroller');


router.get('/hotels/search', search.searchHotels);


module.exports = router;