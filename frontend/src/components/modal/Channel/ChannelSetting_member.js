import React, { useCallback, useState } from 'react';
import { Button, Form, ListGroup, Modal } from 'react-bootstrap';
import ProfileOthers from '../User/ProfileOthers';

function ChannelSetting_member({users, onClickModal, setTab, channelNo,onClickChannelInvite}) {
    const [value, setValue] = useState();
    const [userInfo, setUserInfo] = useState({
      name: "",
      email: ""
    });
    const [profileOthersModalShow, setProFileOthersModalShow] = useState(false);

    const onClickProfileOthersModal = useCallback(() => {
      setProFileOthersModalShow(profileOthersModalShow => !profileOthersModalShow);
    }, [])

    return (
      <>
        <Modal.Body>
            <Form>
            <Form.Group className="mb-3" controlId="channelForm.invite">
                    <Form.Label>사용자 추가</Form.Label>
                    <Form.Control
                type="email"
                placeholder="example@gmail.com"
                autoFocus
                onChange={(e) =>{
                    setValue(e.target.value)
                }}
                value={value || ''}
                onKeyDown={(e) => { if(e.key === 'Enter') 
                                          {onClickModal()
                                            setTab(0)}}}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="channelForm.footer">
            <Button variant="outline-dark" onClick={() => {onClickChannelInvite(channelNo,value)
                                                            setValue("")}}>
                    추가
                    </Button>
                    </Form.Group>
                      <Form.Group className="mb-3" controlId="user">
                      <Form.Label>워크스페이스 멤버</Form.Label>
                <ListGroup style={{height:"200px",overflow:"auto"}}>
                  {users.map((user)=><ListGroup.Item action onClick = {(e) => {e.preventDefault();
                                                    setUserInfo(user); 
                                                    onClickProfileOthersModal();
                                                    
                                                  }} key={user.no}>{user.name} ({user.email})</ListGroup.Item>)}
                </ListGroup>
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark"  onClick={() => {onClickModal()
                              setTab(0)
                              }} >
            확인
          </Button>
      </Modal.Footer>
      <ProfileOthers modalShow={profileOthersModalShow} onClickModal={onClickProfileOthersModal} user={userInfo} />
    </>
    );
}

export default ChannelSetting_member;