import { Avatar, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import '../../assets/fonts/font.css';
import '../../styles/css/msItem.css';

function JenkinsMessageItem({align, message, time, name, url}) {
    const [messageItem, setMessageItem] = useState({
        fullUrl: '',
        buildNumber: '',
        duration: '',
        status: '',
        branch: '',
        commit: '',
        projectName: ''
    });

    useEffect(() => {
        const messageItemArray = message.split('#$#');

        setMessageItem((prevMessageItem) => ({
            ...prevMessageItem, 
            fullUrl: messageItemArray[0], 
            buildNumber: messageItemArray[1],
            duration: messageItemArray[2],
            status: messageItemArray[3],
            branch: messageItemArray[4],
            commit: messageItemArray[5].slice(0, 7),
            projectName: messageItemArray[6]
          }))
    }, [message]);

  return (
        <ListItem key="1" >
            <Grid container spacing={1}>
                <Grid item xs={0.5} >
                    <ListItemIcon sx={{padding: "7px 0 0 0", width: '45px', height: '45px'}}>
                        <Avatar alt={"null"} src={url} />
                    </ListItemIcon>
                    <div style={{height: '100px'}}></div>
                </Grid>
                <Grid item xs={11.5} style={{width:'max-content', padding:'10px 50px 10px 30px', borderColor: 'black'}} >
                    <Grid container spacing={1} >
                        <Grid item xs={12} >
                            <ListItemText align={align} style={{fontWeight:'bolder'}} >{name}  {time}</ListItemText>
                        </Grid>
                        <Grid item xs={0.005} sx={messageItem.status === 'SUCCESS' ?
                                                  {backgroundColor: 'green', borderRadius: '10px', borderWidth: '1px', padding: '0'} :
                                                  {backgroundColor: 'red', borderRadius: '10px', borderWidth: '1px', padding: '0'}}>
                            <div style={{height: '65px', padding: '0'}}></div>
                        </Grid>
                        <Grid item xs={9} >
                            <Grid item xs={12}>
                                <ListItemText align={align} primary={`#${messageItem.buildNumber}`} sx={{fontFamily:'SUIT-Medium', padding: '0 0 0 10px'}} ></ListItemText>
                            </Grid>
                            <Grid item xs={12} sx={{display: 'flex'}}>
                                <div style={{margin: '0 0 8px 10px', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', color: 'blue', borderRadius: '5px'}}>
                                  {`${messageItem.commit}`}
                                </div>
                                <div>&nbsp;</div>
                                <div style={{margin: '0 0 8px 0', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', color: '#48967e', borderRadius: '5px'}}>
                                  {`${messageItem.status}`}
                                </div>
                                <div>&nbsp;</div>
                                <div style={{margin: '0 0 8px 0'}}>
                                  {`after ${Math.floor(messageItem.duration * 0.001 * 100)/100} sec`}
                                </div>                             
                                <div>&nbsp;</div>
                                <div style={{margin: '0 0 8px 0'}}>{`to`}</div>
                                <div>&nbsp;</div>
                                <div style={{margin: '0 0 8px 0', backgroundColor: '#e8ebed', border: '1px solid #E1E1E9', color: 'red', borderRadius: '5px'}}>
                                  {messageItem.branch}
                                </div>    
                            </Grid>
                            <Grid item xs={12} sx={{margin: '0px'}}>
                                <div style={{display: 'flex', justifyContent: 'flex-start'}}>
                                    <a href={messageItem.fullUrl} target={'_blank'} style={{textDecoration: 'none'}}>
                                        <Avatar alt={"null"} src={url} sx={{width: '30px', height: '30px', margin: '0 5px 0 10px', verticalAlign: 'middle'}}/>
                                    </a>
                                    <a href={messageItem.fullUrl} target={'_blank'} style={{textDecoration: 'none'}}>
                                        <ListItemText align={align} primary={messageItem.projectName}  sx={{fontFamily:'SUIT-Medium'}}/>
                                    </a>
                                </div>                          
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(JenkinsMessageItem);