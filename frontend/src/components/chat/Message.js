import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import React, { Fragment, useCallback, useEffect, useRef } from 'react';
import githubIcon from '../../assets/icons/github.svg';
import jenkinsIcon from '../../assets/icons/jenkins.png';
import botIcon from '../../assets/icons/monster3.png';
import CommandMessageItem from './CommandMessageItem';
import FileMessageItem from './FileMessageItem';
import GitMessageItem from './GitMessageItem';
import JenkinsMessageItem from './JenkinsMessageItem';
import Loading from './Loading';
import MessageItem from './MessageItem';
import SendPreviewMessage from './SendPreviewMessage';

function Message({chatList, loading, setLoading }) {
    const scrollRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        scrollRef.current.scrollIntoView({behavior: 'smooth'})
    }, [chatList])

    useEffect (() => {
        setLoading(false);
        if(!loading)
            scrollToBottom();
    }, [chatList])

    useEffect (() => {
        if(!loading)
            scrollToBottom();
    }, [loading])

    return (
    <>
        {loading ? 
        <Loading /> :
        (<>
            <List style={{ height: '650px', overflow: 'auto', backgroundColor:'#f7f7fa' }}>
                {chatList.map((chat, index, array) =>{
                    if(chatList !== undefined && chat.sendDate !== undefined){
                        const date = chat.sendDate.split(" ")[0];
                        const time = chat.sendDate.split(" ")[1].substring(0, 5);
                        let dateDivider = null;
                        
                        if(array.length > index + 1) 
                            if (chat.sendDate.split(" ")[0] !== array[index + 1].sendDate.split(" ")[0])
                                dateDivider = <Divider>{array[index + 1].sendDate.split(" ")[0]}</Divider>

                        // if(array.length === index + 1)
                            // setLoading(false);

                        return (<Fragment key={index}>
                                    {(chat.type === 'CHAT') ?
                                        <MessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={chat.userName}
                                            url={chat.profileUrl}/> :
                                    null}
                                    {(chat.type === 'ENTER') ?
                                        <MessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={""}
                                            url={botIcon}/> :
                                    null}
                                    {(chat.type === 'COMMAND') ?
                                        <CommandMessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={chat.userName}
                                            url={chat.profileUrl}/> :
                                    null}
                                    {(chat.type === 'GITHUB') ?
                                        <GitMessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={"GitHub"}
                                            url={githubIcon}/> :
                                    null}
                                    {(chat.type === 'JENKINS') ?
                                        <JenkinsMessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={'Jenkins'}
                                            url={jenkinsIcon}/> :
                                    null}
                                    {chat.type === 'PREVIEW' ?
                                        <SendPreviewMessage
                                            message={chat.message}/> :
                                    null}
                                    {(chat.type === 'FILE') ?
                                        <FileMessageItem 
                                            align={"left"}
                                            message={chat.message} 
                                            time={time}
                                            name={chat.userName}
                                            url={chat.profileUrl}/> :
                                    null}
                                    {dateDivider}
                                </Fragment>)
                    }
                })}
                <div ref={scrollRef}></div>
            </List>
            <Divider />     
        </>)}
    </>
    );
}

export default React.memo(Message);