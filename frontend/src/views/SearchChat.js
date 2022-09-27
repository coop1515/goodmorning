import { Button, Grid } from '@mui/material';
import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import SearchResult from '../components/search/SearchResult';
import { NavLink, useLocation } from "react-router-dom";
import { shallowEqual, useSelector } from 'react-redux';
import ChatHeader from "../components/chat/ChatHeader"

function SearchChat() {

    return (
        <>
        <SiteLayout>
            <Grid item xs={10} sx={{backgroundColor:'#f7f7fa'}}>
            <ChatHeader/>
            <SearchResult />
            
            <NavLink  to={"/chat/room"} style={{textDecorationLine: "none"}}>
            <Button variant="outlined" sx={{fontFamily: "SUIT-Medium", float: 'right', margin: '10px'}}>검색 결과 닫기 </Button>
            </NavLink>
            <Button variant="outlined" sx={{fontFamily: "SUIT-Medium", float: 'right', margin: '10px'}} onClick={()=> history.back()}>다시 검색하기</Button>
        </Grid>
        
        </SiteLayout>
        </>
    );
}

export default SearchChat;