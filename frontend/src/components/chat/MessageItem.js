import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import '../../assets/fonts/font.css';
import '../../styles/css/msItem.css';

function MessageItem({align, message, time, name, url}) {

    return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                        <Avatar alt={"null"} src={url} sx={{width: '50px', height: '50px'}} />
                    </ListItemIcon>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', }} >
                    <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                    <ListItemText align={align} primary={message} sx={{fontFamily:'SUIT-Medium'}} ></ListItemText>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(MessageItem);