import * as React from 'react';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

export default function UserCheckbox(props) {
  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      {props.user.map((e,i)=>
      <FormControlLabel
        key={i}
        label={e.name}
        control={
        <Checkbox 
          defaultChecked 
          onChange={(event) =>{
            e.check = event.target.checked
            props.setUser(props.user)
            props.reRenderCallback()
          }} />}
      /> )}
    </Box>
    </div>
  );
}
