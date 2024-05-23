import React from 'react';

const Event = ({ event, deleteEvent }) => {
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      deleteEvent(event);
    }
  };

  return (
    <div className="event" onDoubleClick={handleDelete} style={{ backgroundColor: `#${Math.floor(Math.random() * 16777215).toString(16)}` }}>
      <p>{event.title}</p>
      <p>{new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
    </div>
  );
};

export default Event;
