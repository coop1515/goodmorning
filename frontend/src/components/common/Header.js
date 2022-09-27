import Grid from '@mui/material/Grid';
import React, { useCallback, useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { get } from '../../apis/Axios';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import { setChannel } from '../../redux/channel';
import { setCHANNELCREWFOCUS } from '../../redux/focus';
import ChannelSetting from '../modal/Channel/ChannelSetting';
import HeaderItem from './header/HeaderItem';
import HeaderSearch from './header/HeaderSearch';
import HeaderUser from './header/HeaderUser';

function Header({setChattingList}) {
    const [totalSum, setTotalSum] = useState(0);
    const [channelModalIsOpen, setChannelModalIsOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [masterChannelUser, setMasterChannelUser] = useState([]);
    const [masterChannelNo, setMasterChannelNo] = useState(0);
    const [search, setSearch] = useState();
    const [userInfo, setUserInfo] = useState("");
    const user = getLocalStorageAuthUser();
    const userNo = user.no;

    const dispatch = useDispatch();
    const channelList = useSelector(state => (state.channel), shallowEqual);

    const channelName = useSelector(state => {
        return state.focus.channelName;
    }, shallowEqual);

    const channelNo = useSelector(state => {
        return state.focus.channelNo;
    }, shallowEqual);
  
    /**
     * 채널 목록
     * @param userNo 채널 번호
     */
    const initialChannel = useCallback(async(channelNo, userNo) => {
      const channels = await get(`/channel/${channelNo}/${userNo}`);
      dispatch(setChannel(channels));
      }, [channelNo])

    const initialFocus = useCallback(async(userNo) => {
        const Focus = await get(`/channel/${userNo}`);
        const {no, name, crewNo, crewName} = Focus[0];
        dispatch(setCHANNELCREWFOCUS({
            channelName: name, 
            channelNo: no,
            crewName: crewName,
            crewNo: crewNo
        }))
    }, [])

    const initialUser = useCallback(async() => {
        const result = await get(`/user/email/${channelNo}`);
        setUsers(() => [].concat(result));
    }, [users, channelNo])

    const MasterChannelUserNo = useCallback(async() => {
        const result = await get(`/channel/master/${channelNo}`);
        setMasterChannelUser(result[0]);
    }, [masterChannelUser, channelNo])

    const onChangeChannel = useCallback(async(channelNo, userNo) => {
        const result = await get(`/channel/change/${channelNo}/${userNo}`);
        const {no, name, crewNo, crewName} = result[0];
        dispatch(setCHANNELCREWFOCUS({
            channelName: name, 
            channelNo: no,
            crewName: crewName,
            crewNo: crewNo
        }))
    }, [])
    
    useEffect(() => {
        if (channelNo === null)
            initialFocus(userNo);
        
        if (channelNo !== null)
            initialChannel(channelNo, userNo);
      }, [channelNo,userInfo])

    const channelStyle = {height:'60px', whiteSpace:'no-wrap', overflow:'hidden', textOverflow:'ellipsis'};

    const onClickChannelModal = useCallback(() => {
        setChannelModalIsOpen(prevChannelModalIsOpen => !prevChannelModalIsOpen);
        initialUser();
        MasterChannelUserNo();
    }, [channelNo, users, masterChannelUser])

    return (
        <Grid container style={{backgroundColor:'#1bc6d9', color:'white', borderBottom:'solid 0.5px #5CD1E5'}}>            
            <HeaderItem itemName={channelName} modalIsOpen={channelModalIsOpen} customStyle={channelStyle} onClickModal={onClickChannelModal}>
                <ChannelSetting modalShow={channelModalIsOpen} onClickModal={onClickChannelModal} users={users} initialUser={initialUser} masterChannelUser={masterChannelUser}/>
            </HeaderItem>
            <HeaderSearch search={search} setSearch={setSearch}/>
            <HeaderUser user={user} channelList ={channelList} onChangeChannel={onChangeChannel} 
                        totalSum={totalSum} setTotalSum={setTotalSum} setUserInfo={setUserInfo}
                        setChattingList={setChattingList}/>
        </Grid>
    );
}

export default React.memo(Header);