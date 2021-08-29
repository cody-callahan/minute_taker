import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_MEETING = gql`
  mutation addMeeting($title: String!, $date: String! ) {
    addMeeting(title: $title, date: $date) {
      _id
      title
      date
      host { username, email }
      recordKeeper { username, email }
      invitees {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_TEAM = gql`
  mutation addTeam($name: String!) {
    addMeeting(name: $name) {
      _id
      name
      members {
        _id
        username
        email
      }
      admins{
        _id
        username
        email
      }
    }
  }
`;