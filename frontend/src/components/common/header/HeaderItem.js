import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import ReactModal from "react-modal";
import settings from '../../../assets/icons/settings.svg';

ReactModal.setAppElement('body');

function HeaderItem({itemName, customStyle, onClickModal, children}) {
    
    return (
        <Grid item xs={2}>
            <List>
                <ListItem 
                    button key="RemySharp" 
                    style={customStyle}
                    onClick={onClickModal}
                    >

                    <ListItemText primaryTypographyProps={{textDecoration:'none' ,color: 'white', fontSize:'22px', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', fontFamily:'Happiness-Sans-Title', textAlign:'center'}} primary={itemName}></ListItemText>
                <img src={settings}/>
                </ListItem>
                    {children}
            </List>
            <Divider/>
        </Grid>
    );
}

export default React.memo(HeaderItem);