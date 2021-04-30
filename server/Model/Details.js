const mongoose = require('mongoose')

const DetailsSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name: {
        type: String,
        required: true
    },
    beds: [
        {
            title: {
                type: String,
                required: true
            },
            available: {
                type: Number,
                required: true
            },
            filled: {
                type: Number,
                required: true
            }
        }
    ],
    date: {
        type: Date,
        default: Date.now
    },
    location: {
        type: String,
        requird: true
    }

})

module.exports = mongoose.model('details', DetailsSchema)