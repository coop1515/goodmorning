import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function ProjectAssign(props) {
  const crewUserList = useSelector((state) => state.crewUser, shallowEqual);

  const onChange=(event, value)=>{
    props.setClickedAssign(value)
}

  return (
    <Stack spacing={3} sx={{ width: 466 }}>
      <Autocomplete
        multiple
        id="tags-outlined"
        options={crewUserList}
        getOptionLabel={(option) => option.userName}
        filterSelectedOptions
        isOptionEqualToValue={(option, defaultValue) => props.defaultValue &&option.userName == defaultValue.userName}        
        
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="참여자"
            placeholder="참여자를 입력해주세요"
          />
        )}
        
      />
    </Stack>
  );
}
