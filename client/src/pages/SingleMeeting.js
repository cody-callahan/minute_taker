import React, { useState } from 'react';
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

  const [formState, setFormState] = useState({ title: meeting.title, date: meeting.date, minutes: meeting.minutes, invitee: ''});
  console.log(formState.title);
  // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

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
        <div className="container">
            <input className="input-h1 w-75" type="text" name="title" onChange={handleChange} value={meeting.title}></input>
            <div>
                <input className="input-p w-25" name="date" onChange={handleChange} value={meeting.date}></input>
            </div>
            <div>
                <p>{meeting.host.username}</p>
            </div>
            <div>
              <h3>Invitees:</h3>
              <ul>
                  {meeting.invitees.map(invitee => (<li key={invitee._id}>{invitee.username}</li>)) }
                  <li><input className="input-li w-50" type="text" name="invitee" placeholder="Invite another team member" onChange={handleChange} value={formState.invitee}></input></li>
                </ul>
            </div>
            <div>
              <textarea className="w-100" rows="50" name="minutes" placeholder="Record the minutes for the meeting here!" onChange={handleChange} value={formState.minuets}></textarea>
            </div>
            <div>
              <button>Save Meeting Changes</button>
            </div>
        </div>
    </div>
  </div>
  );
};

export default SingleMeeting;