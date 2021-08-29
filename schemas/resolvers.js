const { User, Meeting, Team } = require('../models');

const resolvers = {
    Query: {
      users: async () => {
        return User.find()
            .select('-__v -password')
            .populate('meetings');
      },
      user: async (parent, { username }) => {
        return User.findOne({ username })
            .select('-__v -password')
            .populate('meetings');
      },
      meetings: async () => {
        return Meeting.find()
            .select('-__v')
            .populate('invitees')
            .populate('host')
            .populate('recordKeeper');
      },
      meeting: async (parent, { _id }) => {
        return Meeting.findOne({ _id })
            .select('-__v' )
            .populate('invitees')
            .populate('host')
            .populate('recordKeeper');
      },
      teams: async () => {
        return Team.find()
            .select('-__v')
            .populate('members')
            .populate('admins')
      },
      team: async (parent, { _id }) => {
        return Team.findOne({ _id })
            .select('-__v' )
            .populate('members')
            .populate('admins');
      }
    }
  };
  
  module.exports = resolvers;