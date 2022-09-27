import React, { useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import channelIcon from '../../../assets/icons/channel.png';
import dateIcon from '../../../assets/icons/date.png';
import phoneIcon from '../../../assets/icons/phone.png';

function ProfileOthers({ modalShow, onClickModal, user}) {
  const [isInitial, setInitial] = useState(false);
  
  useEffect(() => {
      setInitial(true)
  }, []);

  return (
    <>
      {
        isInitial ?
      (<><Modal show={modalShow} onHide={onClickModal}>
            <Modal.Header closeButton>
              <Modal.Title>{user.name} 프로필</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>

                <div style={{ textAlign: 'center'}}>
                  <img src={user.profileUrl} name='profileImg' style={{overflow: 'hidden', width:'230px', height:'230px', objectFit:'cover', borderRadius:'60%'}}></img>
                </div>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'center', marginTop:'7px' }}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.9em', color:'#5a7391'}}>{user.name}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'center'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.2em', color:'#5b9bd1'}}> {user.email}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={dateIcon} style={{width:'40px', heigh:'40px'}}></img> : {user.signUpDate ? user.signUpDate : '값이 없음'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={channelIcon} style={{width:'40px', heigh:'40px'}}></img>: {user.job ? user.job : '직함이 등록되지 않았습니다!'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={phoneIcon} style={{width:'40px', heigh:'40px'}}></img>: {user.phoneNumber ? user.phoneNumber : '전화번호가 등록되지 않았습니다!'}</Form.Label>
                </Form.Group>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" type="button" onClick={onClickModal}>
                  취소
                </Button>


              </Modal.Footer>
            </Form>
          </Modal>

        
            </>) 
                  : (null)}
      </>  
      );

}
export default ProfileOthers;