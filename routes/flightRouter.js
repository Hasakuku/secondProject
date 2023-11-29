const express = require('express');
const flightController= require('../controllers/flightController')
const router = express.Router();

router.get('/search', flightController.searchList) // 검색후 항공편 목록
router.post("/", flightController.createFlight) // 항공편 생성

router.post("/order", flightController.createBooking) // 항공편 예약 생성

module.exports = router;