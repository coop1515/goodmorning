import { Badge, ListItemButton } from '@mui/material';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import { NavLink } from "react-router-dom";
import hash2 from '../../../assets/icons/hash2.svg';


function NavigationItem({navLink, crewName, chatAlarmCount, crewNo, onClickCrew}) {

    return (
        <NavLink to={navLink} style={{textDecoration:'none'}}>
            <ListItemButton sx={{ pl: 4, padding: '8px 16px 8px 16px' }} onClick={() => {onClickCrew(crewNo,crewName)}}>
            <img src={hash2}/>                
                    <ListItemText primaryTypographyProps = {{fontSize: '1rem', color: 'white', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'150px'}}  primary={crewName}/>
                    <ListItemText secondary={<Badge 
                            badgeContent={!chatAlarmCount ? null : chatAlarmCount} 
                            color="warning"  sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 20 } }}/>} align="center" /> 
                
            </ListItemButton>
        </NavLink>
    );
}

export default React.memo(NavigationItem);