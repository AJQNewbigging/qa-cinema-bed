const Viewing = require('../model/viewing.js');
const NotFound = require('../error/viewing-not-found-error.js');
const Booking = require('../model/booking.js');

module.exports = {

    getAll: async (req, res, next) => {
        const viewings = await Viewing.find({}).populate(['bookings']);

        res.status(200).json(viewings);
    },

    getById: async (req, res, next) => {
        const id = req.params.id;
        const viewing = await Viewing.findById(id).populate(['bookings']);
        if (viewing) {
            res.status(200).json(viewing);
            return;
        }
        next(new NotFound(id));
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
    },

    addBooking: async (req, res, next) => {
        const id = req.params.id;
        const booking = new Booking(req.body);
        const viewing = await Viewing.findById(id);

        if (viewing) {
            await booking.save();
            viewing.bookings.push(booking);
            await viewing.save();

            res.status(200).json(viewing);
            return;
        }
        next(new NotFound(id));
    }
}