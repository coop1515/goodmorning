import React from 'react';
import { Button, Form, Modal } from 'react-bootstrap';

function CrewSetting_set({onClickModal,setTab}) {


    return (
      <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3">
                <Button variant="outline-dark" >
                    이 크루 삭제
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-dark"  onClick={() => {onClickModal()
                              setTab(0)
                              }} >
            취소
          </Button>
          <Button variant="outline-dark"  >
            변경사항 저장
          </Button>
      </Modal.Footer>
    </>
    );
}

export default CrewSetting_set;