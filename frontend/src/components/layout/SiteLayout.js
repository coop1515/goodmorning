import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import * as StompJs from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import * as SockJS from "sockjs-client";
import { get, postJson, putUrl } from '../../apis/Axios';
import { chatCommand, chatFileVo, chatPreviewVo, chatVo, msgChat, msgCommand, msgConnect, msgFile, msgPreview, chatEnter, msgEnter } from '../../apis/ChatVo.js';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import { addChat, setChat } from '../../redux/chat';
import { addCHATALARM, resetCHATALARM, setCHATALARM, updateCHATALARM } from '../../redux/chatAlarm';
import { setSearch } from '../../redux/search';
import '../../styles/css/SiteLayout.css';
import Project from '../calendar/Project';
import Chat from '../chat/Chat';
import Header from '../common/Header';
import Navigation from '../common/Navigation';

function SiteLayout({children}) {
    const client = useRef({});
    const authUser = getLocalStorageAuthUser();
    const [loading, setLoading] = useState(true);
    const [sendMessage, setSendMessage] = useState("");

    const dispatch = useDispatch();
    const flag = localStorage.getItem("flag");
    const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
    const chatList = useSelector(state => (state.chat), shallowEqual);
    const { crewNo } = useSelector(state => (state.focus), shallowEqual);
    const [ChattingList, setChattingList] = useState([]);

    useEffect(() => {
        setLoading(true);
        connect()
        return () => {disconnect()};
    }, [crewNo, ChattingList]);

    // 자원 할당(소켓 연결)
    const connect = () => {
        client.current = new StompJs.Client({
            webSocketFactory: () => new SockJS("http://34.64.235.225:8080/ws-stomp"),
            debug: function (str) {},
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
            onConnect: () => {initialSubscribe()}, // 연결 직후 작동하는 이벤트 
            onStompError: (frame) => {console.error("[ERROR]", frame)},
        });

        client.current.activate();
    };

    // 자원 해제
    const disconnect = () => {client.current.deactivate()};

    /**
     * 유저가 로그인 후 자기가 속한 크루에 대한 채팅 및 알림 세팅
     * @param {number} focusChannelNo 현재 focus 된 채널
     * @param {number} focusCrewNo 현재 focus 된 크루
     * @param {object} crewList 구독 중인 크루 리스트
     */
    const initialSubscribe = async() => {
        const crewList = await get(`/crew/${authUser.no}`);

        dispatch(resetCHATALARM());
        await crewList.map(async (crew) => {
            const connectChat = msgConnect(crew.no, authUser.no);
            
            // 레디스 리스너 추가용
            client.current.publish({destination: `/pub/chat`, body: connectChat});
            // 공통 영역
            // focus 안된 크루에 대한 메시지 알림 기능
            if(crew.no !== crewNo) {

                // 이전 안읽은 메시지 카운트 가져오고
                const result = await get(`/chat/count/${crew.no}/${authUser.no}`);
                dispatch(addCHATALARM({crewNo:crew.no, count:result.unReadCount, channelNo:result.channelNo}));

                client.current.subscribe(`/sub/${crew.no}`, () => {
                    dispatch(updateCHATALARM({crewNo:crew.no}))
                })

                return;
            };

            // focus 된 [채널/크루]의 전체 메시지 리스트 DB에서 가져와 출력
            const getChatList = await get(`/chat/${crewNo}`);
            const getSearchList = await get(`/chat/channel/${channelNo}`);
            dispatch(setChat(getChatList));
            dispatch(setSearch(getSearchList));
            dispatch(setCHATALARM({crewNo:crewNo}))

            // 읽음 업데이트
            await putUrl(`/chatUser/${crewNo}/${authUser.no}`);

            // focus 된 크루의 다른 사용자가 입력한 메시지 추가(구독 이벤트 등록)
            const result = await get(`/chat/count/${crew.no}/${authUser.no}`);
            dispatch(addCHATALARM({crewNo:crew.no, count:result.unReadCount, channelNo:result.channelNo}));

            client.current.subscribe(`/sub/${crewNo}`,async (data) => {

                // 다른데 가있으면 작동
                if(flag === 'true') {
                    
                    dispatch(updateCHATALARM({crewNo:crew.no}))
                }
                if(flag !== 'true') {
                const chatData = JSON.parse(data.body);

                if(chatData.type === 'GITHUB')
                    chatData.sendDate = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ");
                
                if(chatData.type === 'JENKINS')
                    chatData.sendDate = new Date(+new Date() + 3240 * 10000).toISOString().replace("T", " ");

                const result = await putUrl(`/chatUser/${crewNo}/${authUser.no}`);
                
                console.log("Before addChat !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", chatData)
                // if(result.data !== 'success') 
                //     return;
                
                dispatch(addChat(chatData));
                console.log("After addChat @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", chatData)
                
                dispatch(setCHATALARM({crewNo:crewNo}))
                }         
            })
            return;
        })
    };

    //  해당 크루에 속한 사람 전부에게 메시지 보내기(메시지 객체 생성 -> DB 저장 -> STOMP 통신))
    const publish = async() => {
        if (!client.current.connected) 
            return;

        // 메시지 공백이면 보내지 않기
        if (sendMessage === '')
            return;
        
        //  메시지 객체 생성
        let addChat = chatVo(crewNo, authUser.no, sendMessage);
        let pubChat = msgChat(crewNo, authUser.no, sendMessage, authUser.name, authUser.profileUrl);

        if(sendMessage.includes('jenkins') && sendMessage.includes('start') && sendMessage.includes('-p')) {
            const jenkinsCommand = sendMessage.split(' ');

            if(jenkinsCommand[0] === 'jenkins' && jenkinsCommand[1] === 'start' && jenkinsCommand[2] === '-p') {
                // 자기 크루에 속한 프로젝트 인지 확인하는 코드(서버에서 체크)
                const result = await get(`/jenkinsHook/${crewNo}/${jenkinsCommand[3]}`);
                if(result !== 0) {
                    addChat = chatCommand(crewNo, authUser.no, jenkinsCommand[3]);
                    pubChat = msgCommand(crewNo, authUser.no, jenkinsCommand[3], authUser.name, authUser.profileUrl);
                }

                else {
                    addChat = chatCommand(crewNo, authUser.no, 'none');
                    pubChat = msgCommand(crewNo, authUser.no, 'none', authUser.name, authUser.profileUrl);
                }
            }
        }
        
        //  DB 저장
        const result = await postJson(`/chat/${crewNo}/${authUser.no}`, addChat);

        // DB INSERT 성공 시 STOMP 통신
        if(result.data !== 'success')
            return;
        

        // const pubChat = msgChat(crewNo, authUser.no, sendMessage, authUser.name, authUser.profileUrl);
        client.current.publish({destination: `/pub/chat`, body: pubChat});
        setSendMessage("");
    };

    const publishLinkPreview = async(gitName, repoName, projectCrewNo) => {
        if (!client.current.connected) 
          return;

          // 메시지 객체 생성 및 DB 저장
          const addChat = chatPreviewVo(projectCrewNo, authUser.no, `${gitName}/${repoName}`);
          const result = await postJson(`/chat/${projectCrewNo}/${authUser.no}`, addChat);

          // DB INSERT 성공 시 STOMP 통신
          if(result.data !== 'success')
            return;
          
          const pubChat = msgPreview(projectCrewNo, authUser.no, `${gitName}/${repoName}`, authUser.name);
          client.current.publish({destination: `/pub/chat`, body: pubChat});
    }

    const publishFileUpload = async(fileName) => {
      if (!client.current.connected) 
        return;

        // 메시지 객체 생성 및 DB 저장
        const addChat = chatFileVo(crewNo, authUser.no, fileName);
        const result = await postJson(`/chat/${crewNo}/${authUser.no}`, addChat);

        // DB INSERT 성공 시 STOMP 통신
        if(result.data !== 'success')
          return;
        
        const pubChat = msgFile(crewNo, authUser.no, fileName, authUser.name, authUser.profileUrl);
        client.current.publish({destination: `/pub/chat`, body: pubChat});
  }

  const publishEnter = async(userName) => {
    if (!client.current.connected) 
      return;

      // 메시지 객체 생성 및 DB 저장
      const addChat = chatEnter(crewNo, authUser.no, userName);
      const result = await postJson(`/chat/${crewNo}/${authUser.no}`, addChat);

      // DB INSERT 성공 시 STOMP 통신
      if(result.data !== 'success')
        return;
      
      const pubChat = msgEnter(crewNo, authUser.no, userName);
      client.current.publish({destination: `/pub/chat`, body: pubChat});
    }

    return (
        <div>
            <Grid container component={Paper}>
                <Header setChattingList = {setChattingList}/>
                <Navigation />
                {
                    (children.type === Chat) ? 
                    <Chat 
                        chatList={chatList} 
                        sendMessage={sendMessage} 
                        setSendMessage={setSendMessage} 
                        publish={publish}
                        publishFileUpload={publishFileUpload}
                        publishEnter={publishEnter}
                        loading={loading}
                        setLoading={setLoading}
                        /> :
                    (
                        (children.type === Project) ?
                        <Project 
                            publishLinkPreview={publishLinkPreview}
                            />:
                        children
                    )
                }
            </Grid>
        </div>
    );
}

export default React.memo(SiteLayout);