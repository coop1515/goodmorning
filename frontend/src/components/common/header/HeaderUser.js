import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import React, { useCallback, useEffect, useState } from 'react';

import List from '@mui/material/List';

import { Badge } from '@mui/material';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { get } from '../../../apis/Axios';
import { resetCHATALARM } from '../../../redux/chatAlarm';
import '../../../styles/css/DropDown.css';
import ProfileInfo from '../../modal/User/ProfileInfo';


function HeaderUser({user, channelList, onChangeChannel, totalSum, setTotalSum, setUserInfo, setChattingList}) {
  
  const [profileModalShow, setProFileModalShow] = useState(false);
  const chatAlarmList = useSelector(state => (state.chatAlarm));
  const dispatch = useDispatch();

  const onClickProfileModal = useCallback(() => {
    setProFileModalShow(prevprofileModalShow => !prevprofileModalShow);
  }, [])

  useEffect(() => {
 
    let _totalSum2 = 0;
    channelList.map((channel) => {
    chatAlarmList.map((chatAlarm) => {
          if(chatAlarm.channelNo == channel.no){
              _totalSum2= _totalSum2 +  chatAlarm.count;
              setTotalSum( _totalSum2);
          }
      })

    })
    }, [channelList, chatAlarmList])
  
  const onClickLogout = async function() {
    try {
          const response =  await get('/user/logout');
          localStorage.setItem('authUser',false);
          localStorage.removeItem('authorization');
          location.href="/signin"
        } catch(err) {
          alert(err)
      } 
    }

    return (
        <Grid item xs={3}>
            <List>
                    <Navbar expand="lg" style={{height: '60px'}}>
                        <Container >
                            <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                            <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ms-auto">
                            <Navbar.Brand style={{fontSize: '1.2rem', color: 'white', fontWeight: 'bold',overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap', width:'120px', textAlign:'right'}}>
                              {user.name}
                            </Navbar.Brand>

                            <Nav.Link onClick={onClickProfileModal} style={{fontSize: '1rem', color: 'white'}}>내정보</Nav.Link>
                            <ProfileInfo modalShow={profileModalShow} onClickModal={onClickProfileModal} 
                                          user={user} setUserInfo={setUserInfo}
                                          setChattingList={setChattingList}/>

                            <Badge 
                            badgeContent={totalSum === 0 ? null : totalSum} 
                            color="warning"  sx={{ "& .MuiBadge-badge": { fontSize: 15, height: 20, minWidth: 20, margin: '0px 20px 0px 0px' } }} anchorOrigin={{
                              vertical: 'top',
                              horizontal: 'right',
                            }} >
                            <NavDropdown
                              id="nav-dropdown"
                              title={"워크스페이스 목록"}
                              menuVariant="white"
                            >
                          
                          { 
                              channelList.length !== 0 ?                            
                             
                                (channelList.map((channel, index) => {
                                  let sum = 0;
                                  chatAlarmList.map((chatAlarm) => {
                                      if(chatAlarm.channelNo == channel.no){
                                          sum = sum + chatAlarm.count;                                        
                                      }
                                  })
                                return (
                                <NavDropdown.Item
                                onClick={() => {
                                  dispatch(resetCHATALARM());
                                  return onChangeChannel(channel.no, user.no)}}
                                  key={index} >
                                    {channel.name}   {sum}
                                </NavDropdown.Item>)
                                })) : ''
                            }
                            </NavDropdown>
                            </Badge>
                                <Nav.Link href="#signin" onClick={onClickLogout} style={{fontSize: '1rem', color: 'white', fontWeight: 'bold'}}>Logout</Nav.Link>
                                
                            </Nav>
                            
                            </Navbar.Collapse>
                            
                        </Container>
                    </Navbar>
            </List>
            <Divider />
        </Grid>
    );
}

export default React.memo(HeaderUser);