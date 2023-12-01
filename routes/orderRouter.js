const express = require('express');
const orderController = require('../controllers/orderController')
const permission = require('../middlewares/permission')
const router = express.Router();

router.get('/', permission('user'), orderController.getUserBookings)
router.get('/', orderController.getUserBookings)
router.post('/', orderController.createBooking)
router.put('/', orderController.updateRoomBookingStatus)

module.exports = router;
