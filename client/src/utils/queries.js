import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      meetingCount
      meetings {
        _id
        title
        date
      }
    }
  }
`;

export const QUERY_GETMYMEETING = gql`
  query getMyMeeting($_id: String!) {
    meeting(_id: $_id) {
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

export const QUERY_ME = gql`
  {
    me {
        _id
        username
        email
        meetings {
          _id
          title
          date
        }
        team {
          _id
          name
          members {
            _id
            username
            email
          }
        }
      }
  }
`;