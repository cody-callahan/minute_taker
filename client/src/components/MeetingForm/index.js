import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_MEETING } from '../../utils/mutations';
import { QUERY_ME } from '../../utils/queries';

const MeetingForm = () => {
  const [formState, setFormState] = useState({ title: '', date: '' });

    // update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const [addMeeting, { error }] = useMutation(ADD_MEETING, {
      update(cache, { data: { addMeeting } }) {
        const { me } = cache.readQuery({ query: QUERY_ME });
          cache.writeQuery({
          query: QUERY_ME,
          data: { me: { ...me, meetings: [...me.meetings, addMeeting] } }
        });
      }
  });

  const handleFormSubmit = async event => {
      event.preventDefault();
    
      try {
        await addMeeting({
          variables: { ...formState }
        });
    
        setFormState({
          title: '',
          date: ''
        });

      } catch (e) {
        console.error(e);
      }
  };
      

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <input type="text" name="title" placeholder="Give Your Meeting a Name" className="title-input" onChange={handleChange} value={formState.title}></input>
        <input type="date" name="date" className="date-input" onChange={handleChange} value={formState.date}></input>
        <button type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default MeetingForm;