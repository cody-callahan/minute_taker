const express = require('express');
const router = express.Router();

// Meeting Model
const Meeting = require('../../models/Meeting');

// @route GET api/meetings
// @description Get All Meetings
// @access Public
router.get('/', (req, res) => {
    Meeting.find()
        .sort({ date: -1 })
        .then(meetings => res.json(meetings))
});

// @route POST api/meetings
// @description Create a meeting
// @access Public
router.post('/', (req, res) => {
    const newMeeting = new Meeting({
        name: req.body.name
    });

    newMeeting.save().then(meeting => res.json(meeting));
});

// @route DELETE api/meetings/:id
// @description Delete a meeting
// @access Public
router.delete('/:id', (req, res) => {
    Meeting.findById(req.params.id)
        .then(meeting => meeting.remove().then(() => res.json({success:true})))
        .catch(err => res.status(404).json({success: false}));
});

module.exports = router;