const moment = require('moment');

const Viewing = require('../model/viewing.js');
const NotFound = require('../error/viewing-not-found-error.js');

module.exports = {

    getAll: async (req, res, next) => {
        const viewings = await Viewing.find({}).populate(['movie', 'bookings']);

        res.status(200).json(viewings);
    },

    getById: async (req, res, next) => {
        const id = req.params.id;
        const viewing = await Viewing.findById(id).populate(['movie', 'bookings']);
        if (viewing) {
            res.status(200).json(viewing);
            return;
        }
        next(new NotFound(id));
    },

    create: async (req, res, next) => {
        const viewing = new Viewing(req.body);

        if (viewing.timeAndDate) {
            viewing.timeAndDate = moment.utc(viewing.timeAndDate);
        }
        try {
            await viewing.save();
            res.status(200).json(viewing);
        } catch (error) {
            next(error);
        }
    },

    update: async (req, res, next) => {
        const id = req.params.id;
        const updatedViewing = req.body;

        const viewing = await Viewing.updateOne({ _id: id }, updatedViewing);

        if (viewing) {
            res.status(200).json(viewing);
            return;
        }
        next(new NotFound(id));
    },

    delete: async (req, res, next) => {
        const filter = { _id: req.params.id };

        const viewing = await Viewing.findOneAndDelete(filter);
        if (viewing) {
            return res.status(200).json(viewing);
        }
        next(new NotFound(id));
    }

}