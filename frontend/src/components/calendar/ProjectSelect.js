import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function ProjectSelect(props) {
  const projectList = useSelector((state) => state.project, shallowEqual);

  const onChange=(event, value)=>{
    event.preventDefault();
    const no = projectList.filter(project => project.projectName ==value)
    props.setClickedProject(value)
    props.setClickedProjectNo(no[0].id)
}

  return (
    <Stack spacing={3} sx={{ width: 466 }}>
      <Autocomplete
        id="tags-outlined"
        options={projectList.map((option)=>option.projectName)}
        defaultValue={props.state == null? '': props.state.projectName}
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="프로젝트를 입력해주세요"
          />
        )}
      />
    </Stack>
  );
}
