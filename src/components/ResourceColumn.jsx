import React from 'react';
import Event from './Event';
import Draggable from 'react-draggable';

const ResourceColumn = ({ resource, dates, events, addEvent, deleteEvent, today }) => {
  const handleAddEvent = (date) => {
    const title = prompt('Enter the event title:');
    const time = prompt('Enter time (HH:MM) for the event:');
    const [hours, minutes] = time.split(':').map(Number);
    if (!title) {
      alert('Event title is required.');
      return;
    }
    if (!Number.isNaN(hours) && hours >= 0 && hours < 24 && !Number.isNaN(minutes) && minutes >= 0 && minutes < 60) {
      const newEvent = { date: new Date(date.setHours(hours, minutes, 0)), title };
      addEvent(resource, newEvent);
    } else {
      alert('Invalid time format. Please enter in HH:MM format.');
    }
  };

  return (
    <div className="resource-column">
      <div className="resource-header">{resource}</div>
      {dates.map(date => (
        <div key={date} className={`date-cell ${date.toDateString() === today ? 'today' : ''}`} onDoubleClick={() => handleAddEvent(new Date(date))}>
          {events.filter(event => new Date(event.date).toDateString() === date.toDateString()).map(event => (
            <Draggable key={event.date}>
              <div>
                <Event event={event} deleteEvent={deleteEvent} />
              </div>
            </Draggable>
          ))}
        </div>
      ))}
    </div>
  );
};

export default ResourceColumn;
