const express = require('express');

const viewingController = require('../controller/viewing-controller.js');
const router = express.Router();

router.get('/', viewingController.getAll);
router.get('/:id', viewingController.getById);
router.put('/:id', viewingController.update);
router.delete('/:id', viewingController.delete);
router.post('/:id/add-booking', viewingController.addBooking);

module.exports = router;