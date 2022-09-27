import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import React, { useCallback, useState } from 'react';
import AddCrew from '../../modal/Crew/AddCrew';

import { Collapse, ListItemButton } from '@mui/material';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { get } from '../../../apis/Axios';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';
import arrowDownIcon from '../../../assets/icons/keyboard_arrow_down.svg';
import arrowUpIcon from '../../../assets/icons/keyboard_arrow_up.svg';
import { setProject } from "../../../redux/project";
import { setTask } from "../../../redux/task";
import NavigationEctItem from './NavigationEctItem';


function NavigationEct({onCreateCrew}) {
    const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const [addChannelModalShow, setAddChannelModalShow] = useState(false);
    const [addCrewModalShow, setAddCrewModalShow] = useState(false);
    const [open, setOpen] = useState(true);
    const dispatch = useDispatch();

    const handleClick = () => {
        setOpen(!open);
    };
    // modal click
    const onClickAddChannelModal = useCallback(() => {
        setAddChannelModalShow(prevAddChannelModalShow => !prevAddChannelModalShow);
    }, [])

    const onClickAddCrewModal = useCallback(() => {
        setAddCrewModalShow(prevAddCrewModalShow => !prevAddCrewModalShow);
    }, [])

    return (
        <>

        <ListItemButton onClick={handleClick} style={{fontSize:'20px', padding:'10px', fontStyle:'bold', borderBottom:'solid 0.5px #5CD1E5',color:'white'}}>
        <Grid item xs={12} textAlign={'center'} style={{fontFamily:'SUIT-Medium'}}> 기능 </Grid>

        {open ? <img src={arrowUpIcon}/> : <img src={arrowDownIcon} />}
        </ListItemButton>
        <Collapse in={open} timeout="auto" unmountOnExit>
        <List style={{height: '300px', overflow: 'auto', listStyle: "none"}}>
            <NavigationEctItem userName={"Alice"} itemName={"채널 생성"} onClickModal={onClickAddCrewModal}>
                <AddCrew modalShow={addCrewModalShow} onClickModal={onClickAddCrewModal} onCreateCrew={onCreateCrew} /> 
            </NavigationEctItem>
            <NavLink to={"/fileshare"} style={{textDecoration:'none', color: 'white'}}>
            <NavigationEctItem itemName={"파일 공유"}/>
            </NavLink>
            <NavLink to={"/project"} state={{crewName:null}} style={{textDecoration:'none', color: 'white'}} onClick={async() => { 
            const getProjects = await get(`/project/${channelNo}/${userNo}`);
            dispatch(setProject(getProjects));}}>
            <NavigationEctItem itemName={"프로젝트 달력"}/>
            </NavLink>
            <Link to={"/task"} state={{projectName:null}}  style={{textDecoration:'none', color: 'white'}} onClick={async() => { 
                const getTasks = await get(`/task/${channelNo}`);
                dispatch(setTask(getTasks));}}>
            <NavigationEctItem itemName={"업무 달력"}/>
            </Link>
        </List>
        </Collapse>
        <Divider />
        </>
    );
}

export default React.memo(NavigationEct);