import React from 'react';
import MeetingList from '../components/MeetingList';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import Auth from '../utils/auth';

const Profile = () => {
  const { username: thisUsername } = Auth.getProfile().data.username;

  const { loading, data } = useQuery(QUERY_ME, {
    variables: { username: thisUsername }
  });

  const user = data?.me || {};
  console.log(user);

  if (loading) {
    return <div>Loading...</div>;
  }

  const loggedIn = Auth.loggedIn();
  if ( !loggedIn ) {
    return (
      <h4>
        You need to be logged in to see this. Use the navigation links above to sign up or log in!
      </h4>
    );
  }

  return (
    <div>
      <div className="flex-row mb-3">
        <h2 className="bg-dark text-secondary p-3 display-inline-block">
          My profile.
        </h2>
      </div>

      <div className="flex-row justify-space-between mb-3">
        <div className="col-12 mb-3 col-lg-8">
          <MeetingList meetings={user.meetings} title={`My meetings`} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
