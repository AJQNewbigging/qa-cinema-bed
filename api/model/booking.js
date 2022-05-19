const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookingSchema = new Schema({
    adult: {
        type: Number,
        unique: false,
        required: true
    },
    child: {
        type: Number,
        unique: false,
        required: true
    },
    concession: {
        type: Number,
        unique: false,
        required: true
    },
    forename: {
        type: String,
        unique: false,
        required: true
    },
    surname: {
        type: String,
        unique: false,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    }
});

const Booking = mongoose.model('Booking', bookingSchema);
module.exports = Booking;