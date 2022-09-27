import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React from 'react';
import '../../assets/fonts/font.css';
import shuttleIcons from '../../assets/icons/shuttle1.png';
import questionIcons from '../../assets/icons/question5.png';
import '../../styles/css/msItem.css';

function CommandMessageItem({align, message, time, name, url}) {

    return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0"}}>
                        <Avatar alt={"null"} src={url} />
                    </ListItemIcon>
                    <div style={{height: '50px'}}></div>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', borderColor: 'black', fontFamily:'SUIT-Medium'}} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                        </Grid>
                        <Grid item xs={message === 'none' ? 2.3 : 3.3} sx={{display: 'flex', borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '0 4px 2px 0', borderRadius: '10px', backgroundColor: '#FFFFFF', padding: '0 0 8px 0'}}>
                            <Grid item xs={2} sx={{height: '35px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <img src={message === 'none' ? questionIcons : shuttleIcons} width={30} height={30}/>
                            </Grid>
                            <Grid item xs={10} sx={{margin: ' 0 0 0 5px', display: 'flex', alignItems: 'center'}}>
                                {message === 'none' ? 
                                <div style={{height: '26px', fontFamily:'SUIT-Medium'}}>
                                  {`This project does not exist.`}
                                </div> :
                                <>
                                    <div style={{height: '26px', fontFamily:'SUIT-Medium', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap'}}>
                                      {`Start`} <span style={{color:'skyblue', fontWeight:'bold'}}>{message}</span> {`Repository Deployment`}
                                    </div>
                                </>}
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(CommandMessageItem);