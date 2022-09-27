import { Box, Grid, Link, ListItem, ListItemText } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { linkPreview } from '../../apis/LinkPreview';
import '../../styles/css/textBox.css';

function SendPreviewMessage({message}) {
    const [linkPreviewMetaOG, setLinkPreviewMetaOG] = useState(null);

    const metaOGCallback = async () => {
        const gitData = message.split('/');

        if (gitData[0] === 'undefined')
            gitData[0] = ''

        if (gitData[1] === 'undefined')
            gitData[1] = ''

        const gitJsonData = JSON.stringify({gitId: gitData[0], projectName: gitData[1]})
        const metaOG = await linkPreview(`/html/github`, gitJsonData);

        setLinkPreviewMetaOG(metaOG);
    }

    useEffect(() => {
        metaOGCallback();
    }, [])

  const linkPreviewRender = () => {
    if(!!linkPreviewMetaOG) {
    return <>
              <ListItem>
              
                  <Grid container spacing={0} >
                      <Grid item xs={1.4} sx={{borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '2px 0px', backgroundColor: '#FFFFFF'}}>
                          <Link href={linkPreviewMetaOG.url}  target="_blank" underline={'none'} color="inherit">
                          <Box
                              component="img"
                              sx={{
                                height: 175,
                                width: 180,
                                maxHeight: { xs: 175, md: 175 },
                                maxWidth: { xs: 180, md: 180 },
                              }}
                              alt={`${linkPreviewMetaOG["image:alt"]}`}
                              src={`${linkPreviewMetaOG.image}`}
                              />
                              </Link>
                      </Grid>

                      <Grid item xs={4} sx={{borderColor: '#E1E8ED', borderStyle: 'solid', borderWidth: '2px 4px 2px 0px', backgroundColor: '#FFFFFF'}}>
                          <Grid container spacing={0} >
                              <Grid item xs={12} sx={{verticalAlign:'middle'}}>
                              <ListItemText
                                  className={'ellipsis1'}
                                  align={"left"} 
                                  primaryTypographyProps={{
                                      fontWeight:'bold',
                                      fontSize:'27px', 
                                      fontFamily:'SongMyung',
                                      lineHeight: '35px',
                                      }} 
                                  style={{height: '60px', margin: '0',  padding: '9px 9px 0'}}>
                                  {linkPreviewMetaOG.title}
                              </ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                              <ListItemText 
                                  className={'ellipsis2'}
                                  align={"left"} 
                                  primaryTypographyProps={{
                                        fontWeight:'normal', 
                                        fontSize:'22px', 
                                        fontFamily:'SongMyung',
                                        lineHeight: '29px'
                                        }} 
                                  style={{height: '70px', margin: '0', padding: '5px 9px'}}
                                  >
                                  {linkPreviewMetaOG.description}
                              </ListItemText>
                              </Grid>
                              <Grid item xs={12}>
                              <ListItemText
                                  className={'ellipsis1'}
                                  align={"left"}
                                  primaryTypographyProps={{
                                        fontWeight:'normal', 
                                        fontSize:'17px', 
                                        fontFamily:'SongMyung'
                                        }} 
                                  style={{height: '45px', margin: '0', padding: '9px'}}>
                                  {linkPreviewMetaOG.site_name}
                              </ListItemText>
                              </Grid>
                          </Grid>                                              
                      </Grid>

                      <Grid item xs={6.6} />

                  </Grid>
                  
              </ListItem>
          </>
    }
  }

  return (
      linkPreviewRender()
  );
}

export default SendPreviewMessage;