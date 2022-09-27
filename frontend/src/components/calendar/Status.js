import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import React, { useState } from 'react';

function Status(props) {
  const [value, setValue] = useState("Todo");
  
  if(props.clickedStatus==null){
    props.setClickedStatus('Todo')
  }

  const handleChange = (event) => {
    setValue(event.target.value);
    props.setClickedStatus(event.target.value)
  };
  return (
    <>
      <FormControl>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.clickedStatus || "Todo"}
        defaultValue={"Todo"}
        onChange={handleChange}
      >
        <FormControlLabel value="Todo" control={<Radio />} label="진행전" />
        <FormControlLabel value="Doing" control={<Radio />} label="진행중" />
        <FormControlLabel value="Done" control={<Radio />} label="종료" />
        
      </RadioGroup>
    </FormControl>
    </>
  );
}
export default Status