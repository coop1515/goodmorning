import { Divider } from '@mui/material';
import React from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import emailIcon from '../../../assets/icons/email.svg';
import lockIcon from '../../../assets/icons/lock.svg';
import '../../../styles/css/body.css';

function SignIn({callback, errormessage}) {
  return (
    <div className="SignIn">
        <div style={{padding:'0 35%'}}>
      <Card bg='light' className='card card-authentication1 mx-auto my-5' >
      <Card.Body style={{height: '600px' , backgroundColor:"#34d6ce", color: 'white'}}>
        <Form onSubmit={e => {
                  e.preventDefault();
                  callback(e.target.email.value, e.target.passwd.value);
                }}>
        <Col xs="auto" className="my-5">
        <Card.Text className="card-title text-uppercase text-center py-3" style={{fontWeight:'bolder', fontSize:'30px'}}>
            Sign In
        </Card.Text>
        <Divider style={{backgroundColor: 'white', border: '1px solid white'}}/>

        <Form.Group className="form-group" style={{ width:'70%', margin:'60px auto 10px ',fontWeight:'bolder' }} >
            <Form.Label htmlFor="inlineFormInputGroup" >
                Email address
            </Form.Label>
            <div className="position-relative has-icon-right">      
                <InputGroup className="mb-2" >
                    <Form.Control 
                      className='form-control input-shadow' 
                      type="email" 
                      placeholder="이메일을 입력해주세요" 
                      id="email" 
                      required/> 
                    <InputGroup.Text>
                        <img src={emailIcon}></img>
                    </InputGroup.Text>
                </InputGroup>         
            </div>
          </Form.Group>
              
          <Form.Group className="form-group" style={{ width:'70%', margin:' 50px auto 10px',fontWeight:'bolder'}}>
              <Form.Label htmlFor="inlineFormInputGroup" >
                  Password
              </Form.Label>
              <InputGroup className="mb-2">
              <Form.Control 
                  type="password" 
                  id="passwd" 
                  className="form-control input-shadow" 
                  placeholder="비밀번호를 입력해주세요" 
                  required/>
                  <InputGroup.Text>
                    <img src={lockIcon}></img>
                  </InputGroup.Text>
              </InputGroup>
          </Form.Group>

          <Form.Group className="form-group" style={{margin:'-30px auto 30px'}}>
              <div className='text-center'>
                <Button 
                    className='form-group text-center btn-xs' 
                    style={{margin:'20px 0px -30px 0px' , width:'70%', height: '40px', color: 'white', backgroundColor: '#34d6ce', border: '2px solid white', marginTop:'120px', fontWeight:'bolder'}} 
                    size='sm'
                    type="submit">
                        로그인
                </Button>
              </div>        
          </Form.Group>

        <div className='text-center'>
            {
              errormessage===''?
              <><br/></>:
              <p style={{color:'red'}}>
                <br/>{errormessage}
              </p>
            }
        </div>
        </Col>
      </Form>
      </Card.Body>
      <Divider style={{backgroundColor: 'white'}}/>
      <Card.Footer className="card-footer text-center py-3" style={{backgroundColor:"#34d6ce"}} >
          <Row className="align-items-center">

              <Col sm='6'>
              <NavLink to={'/ResetPw'}>
                <Button 
                    style={{color: 'white', backgroundColor: '#34d6ce', border: '2px solid white', fontWeight:'bolder'}}
                    className='form-group text-right' 
                    >
                    비밀번호 찾기
                </Button>
              </NavLink>
              </Col>

              <Col sm='6'>
                <NavLink to={'/signup'}>
                  <Button 
                      className='mb-0' 
                      style={{color: 'white', backgroundColor: '#34d6ce', border: '2px solid white', fontWeight:'bolder'}}>
                  회원가입하기
                  </Button>
                </NavLink>
              </Col>

          </Row>
      </Card.Footer>

      </Card>
      </div>
    </div>
  );
}

export default SignIn;
