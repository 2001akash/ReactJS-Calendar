import React, { useState, useEffect } from 'react';
import ResourceColumn from './ResourceColumn';
import '../styles/styles.css';

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [resources, setResources] = useState([
    'Resource A',
    'Resource B',
    'Resource C',
    'Resource D',
    'Resource E',
    'Resource F',
    'Resource G',
  ]);

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem('events'));
    if (storedEvents) setEvents(storedEvents);
  }, []);

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const addEvent = (resource, newEvent) => {
    setEvents([...events, { ...newEvent, resource }]);
  };

  const deleteEvent = (eventToDelete) => {
    setEvents(events.filter(event => event !== eventToDelete));
  };

  const renderDates = () => {
    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const dates = [];
    for (let date = startOfMonth; date <= endOfMonth; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }
    return dates;
  };

  const today = new Date().toDateString();
  const dates = renderDates();

  return (
    <div className="calendar">
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>Previous</button>
        <h2>{currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}</h2>
        <button onClick={handleNextMonth}>Next</button>
      </div>
      <div className="calendar-body">
        <div className="date-row">
          <div className="resource-header">Resources</div>
          {dates.map(date => (
            <div key={date} className={`date-cell ${date.toDateString() === today ? 'today' : ''}`}>
              {date.getDate()} {date.toLocaleString('default', { month: 'short' })}
            </div>
          ))}
        </div>
        {resources.map(resource => (
          <ResourceColumn
            key={resource}
            resource={resource}
            dates={dates}
            events={events.filter(event => event.resource === resource)}
            addEvent={addEvent}
            deleteEvent={deleteEvent}
            today={today}
          />
        ))}
      </div>
    </div>
  );
};

export default Calendar;
