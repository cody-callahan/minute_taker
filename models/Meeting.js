const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Schema
const MeetingSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    minutes: {
        type: Object
    }
});

module.exports = Meeting = mongoose.model('meeting', MeetingSchema);