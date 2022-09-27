import { Collapse, ListItemButton } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';
import NavigationItem from './NavigationItem';

function NavigationCrew({crewList, onClickCrew}) {
    const chatAlarmList = useSelector(state => (state.chatAlarm));
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };
    
    return (
    <>
        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold',borderTop:'solid 1px #5CD1E5', borderBottom:'solid 1px #5CD1E5',color:'white'}}>
        <Grid item xs={12} textAlign={'center'} style={{fontFamily:'SUIT-Medium'}}>채널 목록</Grid>
        {open ? <img src={arrowUpIcon}/> : <img src={arrowDownIcon} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{height: '300px', overflow: 'auto'}}>
            {               
                (crewList !== null && chatAlarmList !== null ?
                (crewList.length !== 0 ? 
                (
                    
                crewList.map((crew, index) => {
                    let count;
                chatAlarmList.map((chatAlarm) => {
                
                    if(crew.no === chatAlarm.crewNo) 
                        count = chatAlarm.count;                                       
                })

                return (<NavigationItem
                    key={index}
                    navLink={"/"}
                    crewName={crew.name}
                    crewNo={crew.no}
                    onClickCrew={onClickCrew}
                    chatAlarmCount={count} />)
})


                ) :
                '') : '')
            }
        </List>
        </Collapse>
        <Divider />
    </>
    );
}

export default React.memo(NavigationCrew);