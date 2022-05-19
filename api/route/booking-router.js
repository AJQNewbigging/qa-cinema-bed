const express = require('express');

const bookingController = require('../controller/booking-controller.js');
const router = express.Router();

router.get('/', bookingController.getBookings);
router.get('/:id', bookingController.getBookingById);
router.post('/', bookingController.createBooking);
router.put('/:id', bookingController.updateBooking);
router.delete('/:id', bookingController.deleteBooking);

module.exports = router;