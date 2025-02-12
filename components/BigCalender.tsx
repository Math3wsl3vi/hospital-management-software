'use client';
import { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DatesSetArg } from '@fullcalendar/core';
import { calendarEvents } from '@/lib/data';
// import '@fullcalendar/common/main.css';
// import '@fullcalendar/daygrid/main.css';
// import '@fullcalendar/timegrid/main.css';

const FullCalendarComponent = () => {
  const [currentView, setCurrentView] = useState('timeGridWeek');

  const handleViewChange = (arg: DatesSetArg) => {
    setCurrentView(arg.view.type);
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
      initialView={currentView}
      events={calendarEvents} 
      headerToolbar={{
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      }}
      editable={true}
      selectable={true}
      allDaySlot={false}
      slotMinTime="08:00:00"
      slotMaxTime="17:00:00"
      height="98%"
      datesSet={handleViewChange}
    />
  );
};

export default FullCalendarComponent;