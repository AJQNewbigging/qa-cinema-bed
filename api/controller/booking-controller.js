const BookingNotFoundError = require('../error/booking-not-found-error.js');
const Booking = require('../model/booking.js');

module.exports = {

    getBookings: async (req, res, next) => {
        const bookings = await Booking.find({});
        res.status(200).json(bookings);
    },

    getBookingById: async (req, res, next) => {
        const id = req.params.id;
        const booking = await Booking.findById(id);
        if (booking) {
            res.status(200).json(booking);
            return;
        }
        next(new BookingNotFoundError(id));
    },

    createBooking: async (req, res, next) => {
        const booking = new Booking(req.body);
        try {
            await booking.save();
            res.status(200).json(booking);
        } catch (error) {
            next(error);
        }
    },


    updateBooking: async (req, res, next) => {
        const id = req.params.id;
        const updates = req.body;
        const booking = await Booking.updateOne({_id: id}, updates);

        if (booking) {
            res.status(200).json(booking);
            return;
        }
        next(new BookingNotFoundError(id));
    },


    deleteBooking: async (req, res, next) => {
        const booking = bookings.find((booking) => booking.id === Number(req.params.id))

        if(!booking) {
            return res.status(404).json({success: false, msg: `The booking with the id you requested could not be found`})
        }

        const newBookings = bookings.filter((booking) => booking.id !== Number(req.params.id))
        return res.status(200).json({success: true, data: newBookings})
    }
}