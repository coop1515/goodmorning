import React, { memo  } from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Task from '../components/calendar/Task'


function TaskCalendar() {
  
return (
    <SiteLayout>
        <Task/>
    </SiteLayout>
  );
}

export default memo(TaskCalendar);