const { User, Meeting } = require('../models');

const userController = {
    // get all users
    getAllUser(req, res) {
        User.find({})
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            res.json(err);
            return;
        });
    },

    // get one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.userId })
        .populate({
            path: 'reactions',
            select: '-__v'
        })
        .select('-__v')
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.json(err);
            return;
        });
    },

    addUser({ body }, res) {
        console.log(body);
        User.create(body)
        .then(dbUsesrData => {
            res.json(dbUserData);
        })
        .catch(err => {
            res.json(err);
            return;
        });
      },

    //create user and add it to users array on correct meeting
    addUserToMeeting({ params, body }, res) {
        console.log(body);
        User.create(body)
        .then(({ _id }) => {
            return Meeting.findOneAndUpdate(
                { _id: params.meetingId },
                { $push: { users: _id } },
                { new: true }
            )
            .populate({
                path: 'users',
                select: '-__v'
            })
            .select('-__v');
        })
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

    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.userId }, body, { new: true })
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
    },

    //remove user and then remove the user id from the user array on the meeting who created it
    removeUser({params}, res) {
        User.findOneAndDelete({ _id: params.userId })
        .then(deletedUser => {
            if (!deletedUser) {
              return res.status(404).json({ message: 'No user with this id!' });
            }
            return Meeting.findOneAndUpdate(
              { _id: params.meetingId },
              { $pull: { users: _id } },
              { new: true }
            )
            .populate({
                path: 'users',
                select: '-__v'
            })
            .select('-__v');
          })
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
}

module.exports = userController;