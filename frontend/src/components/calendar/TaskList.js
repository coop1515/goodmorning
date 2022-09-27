import React from "react";
import "../../styles/css/Calendar.css";

function TaskList(props) {

  return (
    <div  style={{ height:'500px', overflow: 'auto'}}>
      <div style={{textAlign:'center'}}><strong>개인 업무</strong></div>
      <br/>
      {props.taskList.map((event, index) => (
        <div
          key={index}
          className="fc-event"
          title={event.title}
          data={event.id}
          style={{
            backgroundColor: event.color,
            textAlign:'left',
          }}
        >
          {event.title}
        </div>
        ))
      }
    </div>
  );
}

export default TaskList;