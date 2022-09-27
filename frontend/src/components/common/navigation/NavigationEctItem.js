import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import hash2 from '../../../assets/icons/hash2.svg';

function NavigationEctItem({userName, itemName, onClickModal, children}) {
    return (
    <>
        <ListItem button key={userName} onClick={onClickModal}  >
        <img src={hash2}/>
            <ListItemText primary={itemName} style={{textDecoration:'none', color: 'white'}}></ListItemText>
        </ListItem>
        {children}
    </>
    );
}

export default React.memo(NavigationEctItem);