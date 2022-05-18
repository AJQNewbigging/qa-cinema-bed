const express = require('express');

const viewingController = require('../controller/viewing-controller.js');
const router = express.Router();

router.get('/', viewingController.getAll);
router.get('/:id', viewingController.getById);
router.post('/', viewingController.create);
router.put('/:id', viewingController.update);
router.delete('/:id', viewingController.delete);

module.exports = router;