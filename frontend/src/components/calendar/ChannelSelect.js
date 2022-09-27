import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React, { useEffect } from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function ChannelSelect(props) {
  const crewList = useSelector((state) => state.crew, shallowEqual);
  const onChange=(event, value)=>{
    event.preventDefault();
    const no = crewList.filter(crew => crew.name ==value)
    props.setClickedCrewName(value)
    props.setClickedCrewNo(no[0].no)

  }

  return (
    <Stack spacing={3} sx={{ width: '466' }}>
      <Autocomplete
        id="tags-outlined"
        options={crewList.map((option)=>option.name)}
        defaultValue={props.clickedCrewName == null ? '': props.clickedCrewName}
        onChange={onChange}
        isOptionEqualToValue={(option, value) => option.value === value.value}
        renderInput={(params) => (
          <TextField
            {...params}
            label="채널"
            placeholder="채널을 입력해주세요"
          />
        )}
      />
    </Stack>
  );
}
