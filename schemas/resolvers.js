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
            return User.findOne({ username :username })
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
            return Meeting.findById({ _id })
                .select('-__v' )
                .populate('invitees')
                .populate('host')
                .populate('recordKeeper');
        },
        teams: async () => {
            return Team.find()
                .select('-__v')
                .populate('members')
                .populate('admins');
        },
        team: async (parent, { _id }) => {
            return Team.findById({ _id })
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
        },
        addMeeting: async (parent, args, context) => {
            if (context.user) {
                const meeting = await Meeting.create({ ...args });
        
                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { meetings: meeting._id } },
                    { new: true }
                );

                const updatedMeeting = await Meeting.findByIdAndUpdate(
                    { _id: meeting._id },
                    { $push: { invitees: context.user._id }, host: context.user._id },
                    { new: true }
                );
                return updatedMeeting;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addTeam: async (parent, args, context) => {
            if (context.user) {
                const team = await Team.create({ ...args });

            const updatedTeam = await Team.findByIdAndUpdate(
                { _id: team._id },
                { $push: { members: context.user._id, admins: context.user._id } },
                { new: true }
            );

            return updatedTeam;
            }

            throw new AuthenticationError('You need to be logged in!');
        },
        addInvitee: async (parent, { inviteeId, meetingId }, context) => {
            if (context.user) {
                const myData = await User.findOne({ _id: context.user._id })
                    .select('-__v -password')
                    .populate('meetings');

                const myMeetingIndex = myData.meetings.indexOf(meetingId);
                if(myMeetingIndex != -1)
                {
                    const updatedMeeting = await Meeting.findOneAndUpdate(
                        { _id: meetingId },
                        { $addToSet: { invitees: inviteeId } },
                        { new: true }
                    ).populate('invitees');
                
                    return updatedMeeting;
                }else{
                    throw new AuthenticationError('You can\'t update a meeting you\'re not invited to!');
                }
            }
        throw new AuthenticationError('You need to be logged in!');
        },
        //TODO: test invitee restrictions and then add to other functions
        addRecordKeeper: async (parent, { recordKeeperId, meetingId }, context) => {
            if (context.user) {
                const updatedMeeting = await Meeting.findOneAndUpdate(
                    { _id: meetingId },
                    { recordKeeper: recordKeeperId },
                    { new: true }
                ).populate('recordKeeper');
            
                return updatedMeeting;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addMember: async (parent, { memberId, teamId }, context) => {
            if (context.user) {
                const updatedTeam = await Team.findOneAndUpdate(
                    { _id: teamId },
                    { $addToSet: { members: memberId } },
                    { new: true }
                ).populate('members');
            
                return updatedTeam;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
        addAdmin: async (parent, { adminId, teamId }, context) => {
            if (context.user) {
                const updatedTeam = await Team.findOneAndUpdate(
                    { _id: teamId },
                    { $addToSet: { admins: amind } },
                    { new: true }
                ).populate('admins');
            
                return updatedTeam;
            }
            throw new AuthenticationError('You need to be logged in!');
        }
    }
  };
  
  module.exports = resolvers;