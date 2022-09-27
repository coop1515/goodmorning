import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { putJson } from '../../../apis/Axios';
import { updateCREW } from '../../../redux/crew';
import { setCREWFOCUS } from '../../../redux/focus';

function CrewSetting_info({onClickModal, crewName, setTab, crewNo, onClickCrewDelete, userNo, masterCrew}) {

    const [name, setName] = useState(crewName);
    
    const dispatch = useDispatch();

    const onClickHandler = async(crewName, crewNo) => {
      const updateCrew = JSON.stringify({
            no: crewNo,
            name: crewName
        })

        const result = await putJson(`/crew/update`, updateCrew);
        if (result.data === 'success'){
        dispatch(setCREWFOCUS({name: crewName, no: crewNo}));
        dispatch(updateCREW({no: crewNo, name: crewName}))
        }
        onClickModal();
    }

    return (
      <>
        <Modal.Body>
            <Form>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>채널 이름</Form.Label>
                  {crewName === '기본 채널' ? <Form.Group className="mb-3" controlId="crewForm.name"> <Form.Label> {crewName} </Form.Label> </Form.Group> : 
                    masterCrew.masterCrewUserNo
                    === userNo ?
                  <Form.Control
                    type="text"
                    placeholder="Channel Name"
                    autoFocus
                    defaultValue={crewName}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => { 
                      if(e.key === 'Enter') 
                       { onClickHandler(name,crewNo)}} }
                    /> :  <Form.Group className="mb-3" controlId="crewForm.name"> <Form.Label> {crewName} </Form.Label> </Form.Group>
                    }
                  
                </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>만든 사람 </Form.Label><br/>
                  <Form.Control
                    type="text"
                    placeholder="Create User"
                    
                    defaultValue={masterCrew.name + " " + masterCrew.email}
                    readOnly
                    />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>생성 날짜 </Form.Label><br/>
                  <Form.Control
                    type="text"
                    placeholder="Creation Date"
                    
                    defaultValue={masterCrew.creationDate}
                    readOnly
                    />
                    </Form.Group>
                <Form.Group className="mb-3">
                <Button variant="outline-dark" 
                        onClick={() => {onClickCrewDelete()}} >
                    이 채널에서 나가기
                  </Button>
                  </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button 
              variant="outline-dark"  
              onClick={() => {onClickModal()
                              setTab(0)
                              }}
               >
            취소
          </Button>
          <Button variant="outline-dark" onClick={()=> onClickHandler(name,crewNo)}>
            변경사항 저장
          </Button>
      </Modal.Footer>
        
     </>
    );
}

export default CrewSetting_info;