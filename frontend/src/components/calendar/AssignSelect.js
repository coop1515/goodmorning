import Autocomplete from "@mui/material/Autocomplete";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import React from "react";
import { shallowEqual, useSelector } from "react-redux";

export default function AssignSelect(props) {
  const crewUserList = useSelector((state) => state.crewUser, shallowEqual);

  const onChange=(event, value)=>{

    // 작업자가 있는 작업이라면 새로 업데이트된 작업자만 addedAssigns에 담는다.
    if(props.defaultValue.userName){
        const prevAssigns = [props.defaultValue]
        const addedAssignList = value.filter((prevAssign)=>  prevAssigns.some((assign) => assign.userName != prevAssign.userName))
        const includesCheck = (value.filter((prevAssign)=>  prevAssigns.some((assign) => assign.userName == prevAssign.userName))).length > 0 ? true: false
        const addedAssignNo = addedAssignList.map((addedAssign)=> addedAssign)
        props.setAddedAssigns(addedAssignNo)
        props.setIncludeCheck(includesCheck)
    }else{
        const addedAssignNo = value.map((option)=> option)
        props.setAddedAssigns(addedAssignNo)

    }
}

  return (
    <Stack spacing={3} sx={{ width: 466 }}>
      {props.defaultValue && Object.keys(props.defaultValue).length > 4 ? (<Autocomplete
        multiple
        id="tags-outlined"
        options={crewUserList}
        getOptionLabel={(option) => option.userName}
        filterSelectedOptions
        isOptionEqualToValue={(option, defaultValue) => props.defaultValue &&option.userName == defaultValue.userName}        
        defaultValue={[props.defaultValue || '']}
        
        onChange={onChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="작업자"
            placeholder="작업자를 입력해주세요"
          />
        )}
        
      />):(
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
            label="작업자"
            placeholder="작업자를 입력해주세요"
          />
        )}
        
      />
      )}
    </Stack>
  );
}
