import React, { useState } from 'react';

const TeamForm = () => {
    const [teamName, setName] = useState('');

    const handleChange = event => {
        setName(event.target.value);
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        setName('');
      };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder="Give Your Team a Name" class="title-input" onChange={handleChange} value={teamName}></input>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default ThoughtForm;