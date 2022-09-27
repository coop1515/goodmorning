import { Divider } from '@mui/material';
import React from 'react';
import { Button, Card, Col, Form, InputGroup } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import emailIcon from '../../../assets/icons/email.svg';

function ResetPw({callback,errormessage}) {
  return (
    <div className="SignIn">
    <div style={{padding:'0 35%'}}>
        <Card bg='light' className='card card-authentication1 mx-auto my-5'>
          <Card.Body style={{height: '430px' , backgroundColor:"#34d6ce", color: 'white'}}>
              <Form onSubmit={e => {
                        e.preventDefault();
                        callback(e.target.email.value);
                      }}>
                  <Col xs="auto" className="my-5">
                      <Form.Group  className="form-group" style={{ width:'70%', margin:'40px auto 10px ',fontWeight:'bolder' }}>
                          <Card.Text className="card-title text-uppercase pb-2">
                            RESET PASSWORD
                            <br/>
                          </Card.Text>
                          <Form.Label htmlFor="inlineFormInputGroup">회원가입 시 작성했던 이메일을 입력해주세요. <br></br> 이메일로 임시비밀번호를 보내드립니다.</Form.Label>
                          <div className="position-relative has-icon-right">
                              <Form.Label htmlFor="inlineFormInputGroup"><br/>Email address<br/><br/></Form.Label>
                              <InputGroup className="mb-2">
                                <Form.Control className='form-control input-shadow' type="email" id="email" placeholder="이메일을 입력해주세요" required/>
                                <InputGroup.Text><img src={emailIcon}></img></InputGroup.Text>
                              </InputGroup>
                          </div>
                        </Form.Group>
                      <div className='text-center'>
                          <Button className="btn btn-light btn-block" style={{margin:'37px 0px -30px 0px' , width:'65%', height: '40px', 
                              color: 'white', backgroundColor: '#34d6ce', border: '2px solid white',fontWeight:'bolder'}} size='sm' type="submit"  variant="outline-dark">
                            비밀번호 수정
                          </Button>
                          <div className='text-center'>
                            {
                              errormessage===''?
                              <><br/><br/></>:
                              <p style={{color:'red'}}>
                                <br/><br/>{errormessage}
                              </p>
                            }
                          </div>
                      </div>
                  </Col>
              </Form>
          </Card.Body>
          <Divider style={{backgroundColor: 'white'}}/>
          <Card.Footer className="card-footer text-center py-3" style={{backgroundColor:"#34d6ce"}} >
            <NavLink to={'/signin'}>
                <Button style={{color: 'white', backgroundColor: '#34d6ce', border: '2px solid white', fontWeight:'bolder'}}>
                  돌아가기
                </Button>
            </NavLink>
          </Card.Footer>
        </Card>
      </div>
    </div>
  );
}

export default ResetPw;
