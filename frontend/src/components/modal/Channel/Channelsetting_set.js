import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';


function ChannelSetting_member({onClickModal, onClickHandler,setTab}) {


    return (
    <>
         <Modal.Body>
            <Form>
                  <Button variant="outline-dark" onClick={onClickModal} >
                  이 워크스페이스 삭제
                  </Button>
            </Form>
        </Modal.Body>
              <Modal.Footer>
            <Button variant="outline-dark" onClick={() =>{onClickModal() 
                                                          setTab(0)}} >
              취소
            </Button>
            <Button variant="outline-dark" onClick={() => {onClickHandler()
                                                            setTab(0)}} >
              변경사항 저장
            </Button>
        </Modal.Footer> 
        
    </>
    );
}

export default ChannelSetting_member;