import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import { useLocation } from "react-router-dom";
import githubIcon from '../../assets/icons/github.svg';
import jenkinsIcon from '../../assets/icons/jenkins.png';
import FileMessageItem from '../chat/FileMessageItem';
import GitMessageItem from '../chat/GitMessageItem';
import JenkinsMessageItem from '../chat/JenkinsMessageItem';
import MessageItem from '../chat/MessageItem';
import SendPreviewMessage from '../chat/SendPreviewMessage';

function SearchResult() {
    const searchList = useSelector(state => (state.chat), shallowEqual);

    const location = useLocation();
    const { state } = location;
    const searchText = state.search;
    const sendDate = state.sendDate;
    const scrollRef = useRef();
    const scrollToBottom = useCallback(() => {
        if(!!scrollRef.current){
        scrollRef.current.scrollIntoView({behavior: 'smooth', block: "center"})}
    }, [searchList])

    useEffect (() => {scrollToBottom()}, [searchList])
    
    return (
    <>
        <List style={{ height: '650px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
            {searchList!=null? searchList.map((chat, index, array) =>{
                if(searchList !== undefined && chat.sendDate !== undefined){  
                    const date = chat.sendDate.split(" ")[0];
                    const time = chat.sendDate.split(" ")[1].substring(0, 5);
                    let dateDivider;
                    
                    if(array.length > index + 1) {
                        if (chat.sendDate.split(" ")[0] !== array[index + 1].sendDate.split(" ")[0]){
                            dateDivider = <Divider>{date.slice(0, date.length - 1) + String(Number(date.charAt(date.length-1)) + 1)}</Divider>
                        }
                        else null;
                    }

                    return (<div><Fragment key={index}>
                                {(chat.type === 'CHAT' || chat.type === "COMMAND") ? 
                                chat.message==searchText && chat.sendDate == sendDate?
                                <div style={{backgroundColor:'#C9C8C8'}}>
                                    <MessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={chat.userName}
                                        url={chat.profileUrl}
                                        /> </div>:
                                        <MessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={time}
                                        name={chat.userName}
                                        url={chat.profileUrl}
                                        />:
                                <div></div>}
                                {(chat.type === 'GITHUB') ?
                                chat.message==searchText && chat.sendDate == sendDate?
                                <div style={{backgroundColor:'#C9C8C8'}}>
                                    <GitMessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={chat.sendDate}
                                        name={"GitHub"}
                                        url={githubIcon}/></div>:
                                        <GitMessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={chat.sendDate}
                                        name={"GitHub"}
                                        url={githubIcon}/> :
                                null}
                                {(chat.type === 'JENKINS') ?
                                chat.message==searchText && chat.sendDate == sendDate?
                                <div style={{backgroundColor:'#C9C8C8'}}>
                                    <JenkinsMessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={chat.sendDate}
                                        name={'Jenkins'}
                                        url={jenkinsIcon}/></div> :
                                    <JenkinsMessageItem 
                                        align={"left"}
                                        message={chat.message} 
                                        time={chat.sendDate}
                                        name={'Jenkins'}
                                        url={jenkinsIcon}/>:    
                                null}
                                {chat.type === 'PREVIEW' ?
                                chat.message==searchText?
                                <div style={{backgroundColor:'#C9C8C8'}}>
                                    <SendPreviewMessage
                                        message={chat.message}/></div> :
                                    <SendPreviewMessage
                                        message={chat.message}/> :     
                                null}
                                {chat.type === 'FILE' ?
                                chat.message==searchText?
                                <div style={{backgroundColor:'#C9C8C8'}}>
                                    <FileMessageItem
                                        align={"left"}
                                        message={chat.message}
                                        time={chat.sendDate}
                                        name={chat.userName}
                                        url={chat.profileUrl}/></div> :
                                    <FileMessageItem
                                        align={"left"}
                                        message={chat.message}
                                        time={chat.sendDate}
                                        name={chat.userName}
                                        url={chat.profileUrl}/> :     
                                null}
                                {dateDivider}
                            </Fragment>
                            
                            {chat.message==searchText && chat.sendDate == sendDate?<div ref={scrollRef}/> :<div></div>}

                            </div>)
                }
                 }):''}

        </List>
        <Divider />
    </>
    );
}

export default React.memo(SearchResult);