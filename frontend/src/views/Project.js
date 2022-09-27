import React, { memo } from 'react';
import Project from '../components/calendar/Project';
import SiteLayout from '../components/layout/SiteLayout';


function ProjectCalendar() {

  return (
    <SiteLayout>
        <Project/>
    </SiteLayout>
  );
}

export default memo(ProjectCalendar);