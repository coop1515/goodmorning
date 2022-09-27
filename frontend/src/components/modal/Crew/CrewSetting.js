import React, { useCallback, useState } from 'react';
import { Modal, Nav } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import { get, getJson, postJson, remove } from '../../../apis/Axios';
import { setCHANNELCREWFOCUS } from '../../../redux/focus';
import CrewSetting_info from './CrewSetting_info';
import CrewSetting_member from './CrewSetting_member';

function CrewSetting({modalShow,onClickModal, users, crewName, channelNo, crewNo, initialUser, userNo, masterCrew, publishEnter }) {

  let [tab, setTab] = useState(0);
  const dispatch = useDispatch();

  const onClickCrewInvite = async(email) => {
    const userEmail = JSON.stringify({email: email})
    const result = await postJson(`/crew/invite/${channelNo}/${crewNo}`, userEmail);
    
    if(result.data == "success"){
      Swal.fire({
          icon: 'success',
          title: '채널 초대에 성공하셨습니다.',
        })
    } else{
      Swal.fire({
          icon: 'error',
          title: '채널 초대에 실패하셨습니다.',
          text: '이메일을 다시 확인해 주세요.'
        })
      return;
      }
      const result2 = await get(`/crew/invite/message/${email}`);
      initialUser();
      
      
      publishEnter(result2.name);
  }
  
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

  const onClickCrewDelete = async() => {
    if(crewName === '기본 채널'){
      Swal.fire({
          icon: 'error',
          title: '현재 채널은 기본 채널입니다.',
          text: '모든 워크스페이스에는 이 워크스페이스의 모든 멤버가 포함된 하나의 채널이 있습니다. 바로 이 채널을 사용하면 됩니다.'
        })
      }
    else{
    await remove(`/crew/delete/${crewNo}/${userNo}`);
    onClickModal();
    initialFocus(userNo);
    }
  }

  function TabContent() {
      if (tab === 0) return <CrewSetting_info 
                            crewName={crewName} 
                            onClickModal={onClickModal} 
                            setTab={setTab}
                            crewNo={crewNo}
                            onClickCrewDelete={onClickCrewDelete}
                            masterCrew={masterCrew}
                            userNo={userNo}
                            />
      else if (tab === 1) return <CrewSetting_member 
                          users={users} 
                          onClickModal={onClickModal} 
                          setTab={setTab}
                          onClickCrewInvite={onClickCrewInvite}
                          />
    }
    
  return (
      <>
      <Modal show={modalShow} onHide={onClickModal} backdrop="static">
      <Modal.Header closeButton>
          <Modal.Title>{crewName}</Modal.Title>
      </Modal.Header>
    <Nav variant="tabs" defaultActiveKey="link-0">
      <Nav.Item>
        <Nav.Link eventKey="link-0" onClick={() => setTab(0)}>
          정보
        </Nav.Link>
      </Nav.Item>
      <Nav.Item>
        <Nav.Link eventKey="link-1" onClick={() => setTab(1)}>
          멤버
        </Nav.Link>
      </Nav.Item>
    </Nav>
    <TabContent />
    </Modal>
      </>
    );
}

export default CrewSetting;