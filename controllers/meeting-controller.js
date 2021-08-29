const { User, Meeting } = require('../models');

const meetingController = {
    // get all meetings
    getAllMeeting(req, res) {
        Meeting.find({})
        .populate({
            path: 'users',
            select: '-__v'
        })
        .select('-__v')
        .then(dbMeetingData => res.json(dbMeetingData))
        .catch(err => {
            res.json(err);
            return;
        });
    },

    // get one meeting by id
    getMeetingById({ params }, res) {
        Meeting.findOne({ _id: params.meetingId })
        .populate({
            path: 'users',
            select: '-__v'
        })
        .select('-__v')
        .then(dbMeetingData => {
            if (!dbMeetingData) {
                res.status(404).json({ message: 'No meeting found with this id!' });
                return;
            }
            res.json(dbMeetingData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
            return;
        });
    },

    //create meeting and add it to meetings array on correct user
    addMeeting({ body }, res) {
        console.log(body);
        Meeting.create(body)
        .then(dbMeetingData => {
            res.json(dbMeetingData);
        })
        .catch(err => {
            res.json(err);
            return;
        });
      },

    //update meeting by id
    updateMeeting({ params, body }, res) {
        Meeting.findOneAndUpdate({ _id: params.meetingId }, body, { new: true })
        .then(dbMeetingData => {
            if (!dbMeetingData) {
                res.status(404).json({ message: 'No meeting found with this id!' });
                return;
            }
            res.json(dbMeetingData);
        })
        .catch(err => {
            res.json(err);
            return;
        });
    },

    //remove meeting and then remove the meeting id from the meeting array on the user who created it
    removeMeeting({params}, res) {
        Meeting.findOneAndDelete({ _id: params.meetingId })
        .then(deletedMeeting => {
            if (!deletedMeeting) {
              return res.status(404).json({ message: 'No meeting with this id!' });
            }
            return User.findOneAndUpdate(
              { _id: params.userId },
              { $pull: { meetings: _id } },
              { new: true }
            )
            .populate({
                path: 'meetings',
                select: '-__v'
            })
            .select('-__v');
          })
          .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => {
              res.json(err);
              return;
            });
    }
}

module.exports = meetingController;