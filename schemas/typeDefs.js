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

    type Auth {
        token: ID!
        user: User
      }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        meetings: [Meeting]
        meeting(_id: String!): Meeting
        teams: [Team]
        team(_id: String!): Team
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
    }
`;
// export the typeDefs
module.exports = typeDefs;