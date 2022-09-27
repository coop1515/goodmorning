import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';


function ChannelSetting_info({onClickHandler,channelName, onClickModal, masterChannelUser}) {
    const [name, setName] = useState(channelName);
    const user = getLocalStorageAuthUser();

    return (
    <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="channelForm.name">
                  <Form.Label>워크스페이스 이름</Form.Label>
                  {masterChannelUser.masterChannelUserNo === user.no ? 
                  <Form.Control
                    type="text"
                    placeholder="WorkSpace Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                    defaultValue={channelName}
                    onKeyDown={(e) => { if(e.key === 'Enter') 
                                          {onClickHandler(name)}}}
                    />
                    :<Form.Group className="mb-3" controlId="crewForm.name"> <Form.Label> {channelName} </Form.Label> </Form.Group>}
                </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>만든 사람 </Form.Label><br/>
                  <Form.Control
                    type="text"
                    placeholder="WorkSpace Name"
                    
                    defaultValue={masterChannelUser.name + " " + masterChannelUser.email}
                    readOnly
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>생성 날짜 </Form.Label><br/>
                  <Form.Control
                    type="text"
                    placeholder="WorkSpace Name"
                    
                    defaultValue={masterChannelUser.creationDate}
                    readOnly
                    />
                    </Form.Group>
                    {masterChannelUser.masterChannelUserNo === user.no ?
                    "":
                  <Form.Group className="mb-3">
                <Button variant="outline-dark" onClick={onClickModal} >
                    이 워크스페이스에서 나가기
                  </Button>
                  </Form.Group>
                    }
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={() => {onClickHandler(name)}}
                                            >
              변경사항 저장
            </Button>
        </Modal.Footer>
        
    </>
    );
}

export default ChannelSetting_info;