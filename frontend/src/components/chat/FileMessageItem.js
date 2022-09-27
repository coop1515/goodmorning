import { Avatar, Link, ListItemIcon } from '@mui/material';
import Grid from '@mui/material/Grid';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import React, { useEffect, useState } from 'react';
import { fileDownload } from '../../apis/Fetch';
import '../../assets/fonts/font.css';
import fileIcons from '../../assets/icons/fileUpload.png';
import fileDownloadIcons from '../../assets/icons/file_download.png';
import '../../styles/css/msItem.css';

function FileMessageItem({align, message, time, name, url}) {
    const [messageItem, setMessageItem] = useState({
        name: '',
        size: '',
        type: '',
        link: ''
    });
//
    useEffect(() => {
        const messageItemArray = message.split('#$#');
        setMessageItem((prevMessageItem) => ({
            ...prevMessageItem, 
            name: messageItemArray[0], 
            size: messageItemArray[1].slice(0, 1),
            type: messageItemArray[2],
            link:messageItemArray[3]
          }))
    }, [message]);


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
                        <Grid item xs={3} sx={{display: 'flex', borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '0 4px 2px 0', borderRadius: '10px', backgroundColor: '#FFFFFF', padding: '0 0 8px 0'}}>
                            <Grid item xs={2} sx={{height: '52px', display: 'flex', justifyContent: 'center'}}>
                                <img src={fileIcons}/>
                            </Grid>
                            <Grid item xs={8} sx={{margin: ' 0 0 0 5px'}}>
                                <div style={{padding: '0 0 0 10px', height: '26px', fontFamily:'SUIT-Medium',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>
                                  {`${messageItem.name}`}
                                </div>
                                <div style={{padding: '0 0 0 10px', height: '26px', display: 'flex', fontFamily:'SUIT-Medium'}}>
                                    <div>{`${messageItem.size}KB`}</div>
                                </div>
                            </Grid>
                            <Grid item xs={2} sx={{height: '52px', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Link target="_blank" underline={'none'} color="inherit" style={{cursor:'pointer'}} onClick={() =>{ 
                                                                                                    let spliturl = messageItem.link;
                                                                                                    spliturl=spliturl.split('/')
                                                                                                    return fileDownload(spliturl[2])}
                                                                                                    }>
                                    <img src={fileDownloadIcons} width={30} height={30}/>
                                </Link>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </ListItem>
    );
}

export default React.memo(FileMessageItem);