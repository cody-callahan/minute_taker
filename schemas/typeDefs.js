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
        createdBy: User
        members: [User]
        admins: [User]
        memberCount: Int
    }

    type Query {
        users: [User]
        user(username: String!): User
        meetings: [Meeting]
        meeting(_id: String!): Meeting
        teams: [Team]
        team(_id: String!): Team
    }
`;
// export the typeDefs
module.exports = typeDefs;