import React, { useCallback } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { postFile, put } from '../../../apis/Axios';


function Profile({modalShow, onClickModal,profile, setProfile, user, setUserInfo, setChattingList}) {
  
  const {name, job, phoneNumber, profileUrl} = profile
  const userinfo = {no: user.no, name, job, phoneNumber};
  let setUser = {no: user.no, email:user.email, name, passwd: null, signUpDate:user.signUpDate, job, phoneNumber, profileUrl, enable: true};
  
  const handleSubmit = useCallback(async(e) => {
    e.preventDefault();
    const file = e.target['uploadFile'].files[0];

    // Validation
    if (e.target['uploadFile'].files.length !== 0) {

        const formData = new FormData();
        formData.append('userNo', user.no)
        formData.append('file', file);
        const result = await postFile(`/user/upload`,formData);
        setProfile((prevProfile)=> ({
          ...prevProfile,
          profileUrl:result.data
          }))
          setUser = {no: user.no, email:user.email, name, passwd: null, signUpDate:user.signUpDate, job, phoneNumber, profileUrl: result.data, enable: true};
      }

      await put(`/user/update`, userinfo);
      localStorage.setItem('authUser',JSON.stringify(setUser));
      setUserInfo(setUser);
      setChattingList(setUser);
      onClickModal();
  },[profile])  

  return (
    <>
    <Modal show={modalShow} onHide={onClickModal}>
        <Modal.Header closeButton>
            <Modal.Title>내 프로필 편집</Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
                <Form.Group controlId="formFile" className="mb-3">
                    <Form.Control 
                        type={'file'}
                        accept='image/*'
                        name={'uploadFile'}
                        placeholder={'프로필 사진 업로드'}
                        
                        // onChange={(e) =>{
                        //   setProfile((prevProfile)=> ({
                        //     ...prevProfile,
                        //     profileUrl:e.target.value.split("\\")[2]
                        //   }))
                        // }}     
                        />
                    </Form.Group>
                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>성명</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Name"
                    autoFocus
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        name: e.target.value
                      }))
                    }}
                    defaultValue={user.name}
                    
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="channelForm.invite">
                    <Form.Label>이메일</Form.Label>
                    <Form.Control
                type="email"
                placeholder="example@gmail.com"
                
                readOnly
                value={user.email}               
                />
                <Form.Label>이메일은 변경할 수 없습니다.</Form.Label>
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>가입한 날짜</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="CreateDate"
                    
                    readOnly
                    value={user.signUpDate}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>직함 또는 직업</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Job"
                    
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        job: e.target.value
                      }))
                    }}
                    defaultValue={user.job}
                    
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="crewForm.name">
                  <Form.Label>전화 번호</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="PhoneNumber"
                    
                    onChange={(e) =>{
                      setProfile((prevProfile)=> ({
                        ...prevProfile, 
                        phoneNumber: e.target.value
                      }))
                    }}
                    defaultValue={user.phoneNumber}
                  />
                </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
              <Button variant="outline-dark" type="button" onClick={onClickModal} >
                취소
              </Button>
              <Button variant="outline-dark" type="submit" onClick={(e) => {
                                                              new Event("submit", {cancelable: true, bubbles: true})}}
                        >
                저장
              </Button>
          </Modal.Footer>
        </Form>
    </Modal>
    </>
  );
}

export default Profile;