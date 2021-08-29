// import the gql tagged template function
const { gql } = require('apollo-server-express');

// create our typeDefs
const typeDefs = gql`
    type User {
        _id: ID
        username: String
        email: String
        meetings: [Meeting]
        meetingCount: Int
        team: Team
    }

    type Meeting{
        _id: ID
        title: String
        createdAt: String
        date: String
        minutes: String
        host: User
        recordKeeper: User
        invitees: [User]
        userCount: Int
    }

    type Team{
        _id: ID
        name: String
        createdAt: String
        members: [User]
        admins: [User]
        memberCount: Int
    }

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
        getMyMeeting(_id: String!): Meeting,
        getMyTeam(_id: String!): Team,
        getMyAdminTeam(_id: String!): Team,
        users: [User]
        user(username: String!): User
        meetings: [Meeting]
        meeting(_id: String!): Meeting
        teams: [Team]
        team(_id: String!): Team
    }

    type Mutation {
        login( email: String!, password: String! ): Auth
        addSeedUser( userId: String! ): Auth
        addUser( username: String!, email: String!, password: String! ): Auth
        addMeeting( title: String!, date: String! ): Meeting
        addTeam( name: String! ): Team
        addInvitee( inviteeId: ID!, meetingId: ID! ): User
        addMember( memberId: ID!, teamID: ID ): User
        addHost( hostId: ID!, meetingId: ID! ): User
        addRecordKeeper( recordKeeperId: ID!, meetingId: ID! ): User
        addAdmin( adminId: ID!, teamId: ID! ): User
    }
`;
// export the typeDefs
module.exports = typeDefs;