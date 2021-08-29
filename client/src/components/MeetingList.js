import React from 'react';
import { Link } from 'react-router-dom';

const MeetingList = ({ meetings, title }) => {
  if (!meetings.length) {
    return <h3>No Thoughts Yet</h3>;
  }

  return (
    <div>
      <h3>{title}</h3>
      {meetings &&
        meetings.map(meeting => (
          <div key={meeting._id} className="card mb-3">
              <h3 className="card-header">
                <Link
                    to={`/meeting/${meeting._id}`}
                    style={{ fontWeight: 700 }}
                    className="text-light"
                >
                    {meeting.title}
                </Link>            
              </h3>
              <div><p>{meeting.date}</p></div>
          </div>
        ))}
    </div>
  );
};

export default MeetingList;
