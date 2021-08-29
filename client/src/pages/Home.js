import React from 'react';
import Auth from '../utils/auth';
import { Redirect } from 'react-router-dom';

const Home = () => {  
  if (Auth.loggedIn()) {
    return <Redirect to="/profile" />;
  }
  return (
    <main>
      <div>
        <h1>About Minute Taker</h1>
        <p>Maybe put some info here to convince people to sign up.</p>
      </div>
    </main>
  );
};

export default Home;
