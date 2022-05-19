var mongoose = require('mongoose');

const Schema = mongoose.Schema;

const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    img: {
        data: {
            type: Buffer
        },
        contentType: {
            type: String
        }
    }
})

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;