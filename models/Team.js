const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

//Create Schema
const TeamSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal),
        required: true
    },
    admins: [ { type: Schema.Types.ObjectId, ref: 'User' } ] ,
    members: [ { type: Schema.Types.ObjectId, ref: 'User' } ] //Array of id values referencing user model
},
{
  toJSON: { virtuals: true },
  id: false
});

TeamSchema.virtual('memberCount').get(function() {
    return this.members.length;
});

const Team = model('Team', TeamSchema);

module.exports = Team;