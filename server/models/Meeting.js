const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Create Schema
const MeetingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
        get: dateVal => dateFormat(dateVal),
        required: true
    },
    minutes: {
        type: String
    },
    host: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    recordKeeper: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    invitees: [ { type: Schema.Types.ObjectId, ref: 'User' } ], //Array of id values referencing meeting model
},
{
  toJSON: { virtuals: true },
  id: false
});

MeetingSchema.virtual('inviteeCount').get(function() {
    return this.invitees.length;
});

const Meeting = model('Meeting', MeetingSchema);

module.exports = Meeting;