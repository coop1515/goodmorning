import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';

function AddChannel({modalShow, onClickModal,onCreateChannel}) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const channel = {name, description, masterChannelUserNo:userNo}

    return (
      <>
      <Modal show={modalShow} onHide={onClickModal}>
          <Modal.Header closeButton>
              <Modal.Title>채널 생성</Modal.Title>
          </Modal.Header>
          <Form>
          <Modal.Body>

                  <Form.Group className="mb-3" controlId="channelForm.name">
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
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-dark"  onClick={onClickModal} >
                취소
              </Button>
              <Button variant="outline-dark" onClick={() => {onCreateChannel(channel)
                                                            onClickModal();}}
                                            onKeyDown={(e) => { if(e.key === 'Enter') { 
                                              onCreateChannel(channel)
                                              onClickModal();} }} >
                생성
              </Button>
          </Modal.Footer>
          </Form>
      </Modal>
      </>
    );
}

export default AddChannel;