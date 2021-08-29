import React from 'react';
import { useParams } from 'react-router-dom';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_GETMYMEETING } from '../utils/queries';

const SingleMeeting = props => {

  const{ id: meetingId } = useParams();

  const { loading, data } = useQuery(QUERY_GETMYMEETING, {
    variables: { _id: meetingId }
  });

  const meeting = data?.meeting || {};
  console.log(meeting);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!Auth.loggedIn()) {
    return (
      <h4>
        You need to be logged in to see this page. Use the navigation links above to sign up or log in!
      </h4>
    );
  }


  //TODO: change this logic to catch error when it's not your meeting
  if (false) {
    return (
      <h4>
        You need to be invited to this meeting to see it!
      </h4>
    );
  }

  return (
    <div>
      <div className="card mb-3">
        <h1>{meeting.title}</h1>
        <div>
            <p>{meeting.date}</p>
        </div>
    </div>
  </div>
  );
};

export default SingleMeeting;