const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const viewingSchema = new Schema({
    timeAndDate: {
        type: Date,
        required: true
    },
    screenNum: {
        type: Number,
        required: true,
        minLength: 1 
    },
    numOfSeats: {
        type: Number
    },
    special: [
        {
            type: String
        }
    ],
    bookings: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Booking'
        }
    ],
    pricePerTicket: {
        type: mongoose.Decimal128,
        required: true
    }
})

const Viewing = mongoose.model('Viewing', viewingSchema);

module.exports = Viewing;