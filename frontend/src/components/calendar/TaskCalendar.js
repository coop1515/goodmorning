import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import { useSelector, shallowEqual  } from 'react-redux';
import React, { useEffect, useState } from "react";

import "../../styles/css/Calendar.css";

function TaskCalendar(props) {
  const [state, setState] = useState(taskList)
  const taskList = useSelector((state) => state.task, shallowEqual);

  useEffect(() => {
    setState(props.taskList)
  }, [taskList]);

  // useEffect(() => {
  //   props.taskList
  // }, [taskList]);

  return (
    <div className="demo-app-calendar" id="mycalendartest"
    style={{width: "880px", height: '690px', marginLeft:'2%', fontFamily:'Cascadia Code'}}>
      <FullCalendar
        defaultView="dayGridMonth"
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth",
        }}
        locale="ko"
        eventDurationEditable={true}
        editable={true}
        droppable={true}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        events={props.taskList}
        eventClick={props.eventClickHandler}
        dateClick={props.dateClickHandler}
        eventColor={props.taskList.color}
        height= '700px'
        width = '880px'
      /></div>
  );
}

export default TaskCalendar