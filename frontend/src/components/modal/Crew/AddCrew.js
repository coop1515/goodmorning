import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { shallowEqual, useSelector } from 'react-redux';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function AddCrew({modalShow, onClickModal, onCreateCrew }) {
  const [name,setName] = useState("");
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const crew = {name}
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>채널 생성</Modal.Title>
        </Modal.Header>
        <Form>
        <Modal.Body>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>채널 이름</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Channel Name"
                    autoFocus
                    onChange={(e) =>{
                      setName(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.creationname">
                    <Form.Label>만드는 사람</Form.Label>
                    <Form.Control
                type="create"
                placeholder="이름을 입력해주세요"
                readOnly
                value={user.name}               
                />
                </Form.Group>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="outline-dark" type="button" onClick={onClickModal} >
              취소
            </Button>
            <Button variant="outline-dark" type="button" onClick={(e) => {
                        onCreateCrew(channelNo,crew,userNo)
                        onClickModal()
                       }}
                       onKeyDown={(e) => { if(e.key === 'Enter') { 
                        onCreateCrew(channelNo,crew,userNo)
                        onClickModal()} }} >
              생성
            </Button>
            
        </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default AddCrew;