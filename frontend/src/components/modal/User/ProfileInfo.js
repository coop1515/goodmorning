import React, { useCallback, useEffect, useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { checkResponse, fetchResponse, getLocalStorageAuthUser } from '../../../apis/Fetch';
import channelIcon from '../../../assets/icons/channel.png';
import dateIcon from '../../../assets/icons/date.png';
import phoneIcon from '../../../assets/icons/phone.png';
import EditProfile from './Profile';

function Profileinfo({ modalShow, onClickModal, setUserInfo, setChattingList}) {

  const user = getLocalStorageAuthUser();
  const { name, job, phoneNumber, profileUrl } = user;
  const [profile, setProfile] = useState({
    name: name,
    job: job,
    phoneNumber: phoneNumber,
    profileUrl: profileUrl
  })
  const userNo = user.no;
  const [isInitial, setInitial] = useState(false);
  const [url, seturl] = useState('');
  
  useEffect(() => {
    (async () => {
      const profileUrl = await getProfileImg(userNo)
      seturl(profileUrl);
      setInitial(true)
    })();
  }, [profile]);

  const getProfileImg = async function (userNo) {
    try {
      const data = {
        no: userNo
      }
      const response = await fetchResponse('/api/fileManagement/profileImg', 'post', 'jsonjsonHeader', JSON.stringify(data));
      const json = await checkResponse(response);
      return json.data.profileUrl;
    } catch (err) {
    }
  }

  const [editProfileModalShow, seteditProfileModalShow] = useState(false);
  const onClickeditProfileModal = useCallback(() => {
    seteditProfileModalShow(preveditProfileModalShow => !preveditProfileModalShow);
  }, [])

  return (
    <>
      {
        isInitial ?
      (<><Modal show={modalShow} onHide={onClickModal}>
            <Modal.Header closeButton>
              <Modal.Title>내 프로필</Modal.Title>
            </Modal.Header>
            <Form>
              <Modal.Body>
                <div style={{ textAlign: 'center'}}>
                  <img src={url} name='profileImg' style={{overflow: 'hidden', width:'230px', height:'230px', objectFit:'cover', borderRadius:'60%'}}></img>
                </div>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'center', marginTop:'7px' }}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.9em', color:'#5a7391'}}>{user.name}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'center'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.2em', color:'#5b9bd1'}}> {user.email}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start', paddingLeft:'35px'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={dateIcon} style={{width:'40px', heigh:'40px'}}></img> : {user.signUpDate ? user.signUpDate : '값이 없음'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start' , paddingLeft:'35px'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={channelIcon} style={{width:'40px', heigh:'40px'}}></img>: {user.job ? user.job : '직함이 등록되지 않았습니다!'}</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name" style={{ textAlign: 'start' , paddingLeft:'35px'}}>
                  <Form.Label style={{fontWeight:'bold', fontSize:'1.1em'}}><img src={phoneIcon} style={{width:'40px', heigh:'40px'}}></img>: {user.phoneNumber ? user.phoneNumber : '전화번호가 등록되지 않았습니다!'}</Form.Label>
                </Form.Group>
                
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-dark" type="button" onClick={onClickModal}>
                  취소
                </Button>
                <Button variant="outline-dark" type="button" onClick={onClickeditProfileModal}>
                  프로필 편집
                </Button>

              </Modal.Footer>
            </Form>
          </Modal>

          <EditProfile modalShow={editProfileModalShow}
              onClickModal={onClickeditProfileModal}
              user={user}
              profile={profile}
              setProfile={setProfile}
              setUserInfo={setUserInfo}
              setChattingList={setChattingList}/>
             </>) 
                   : (null)}

      </>  
      );

}
export default Profileinfo;