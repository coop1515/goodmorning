import React, { useState } from 'react';
import { CirclePicker } from 'react-color';
import '../../styles/css/Calendar.css';

export default function ColorPicker(props) {
  const [state, setState] = useState({color:'#4caf50'})


  const handleChange = (color) => {
    setState(color.hex)
    props.setClickedColor(color.hex)
  };

  return (
    <>
    <CirclePicker className='circle-picker' color={ props.clickedColor} onChange={ handleChange }/>
    </>
    
    )
  }
