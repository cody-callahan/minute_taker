const { User, Meeting, Team } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id })
                .select('-__v -password')
                .populate('meetings');
          
              return userData;
            }
          
            throw new AuthenticationError('Not logged in');
        },
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
    },
    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
          
            return { token, user };
          },
          login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
          
            if (!user) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const correctPw = await user.isCorrectPassword(password);
          
            if (!correctPw) {
              throw new AuthenticationError('Incorrect credentials');
            }
          
            const token = signToken(user);
            return { token, user };
          }
      }
  };
  
  module.exports = resolvers;