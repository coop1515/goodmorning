import { Divider } from '@mui/material';
import React, { useState } from 'react';
import { Button, Card, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { NavLink } from "react-router-dom";
import checkIcon from '../../../assets/icons/check.png';
import closeIcon from '../../../assets/icons/close.png';
import emailIcon from '../../../assets/icons/email.svg';
import lockIcon from '../../../assets/icons/lock.svg';
import peopleIcon from '../../../assets/icons/people.svg';

function SignUp({callback,errormessage}) {
    const [checkemail, setcheckEmail] = useState("");
    const [validEmail, setValidEmail] = useState(false);

    const onChangeEmailInput = e => {
      setcheckEmail(e.target.value);
      // check email format(account@mysite.com)
      const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/g;
      setValidEmail(re.test(e.target.value))
  }

    return (


    <div className="SignUp">
        <div style={{padding:'0 35%'}}>
    
        <Card bg='light' className='card card-authentication1 mx-auto my-4'>
            <Card.Body style={{height: '625px', backgroundColor:"#34d6ce", color: 'white'}}>
              <Form onSubmit={e => {
                  e.preventDefault();
                  callback(e.target.email.value, e.target.name.value, e.target.passwd.value);
                }}>

                <Col xs="Wauto" className="my-5">
                    <Card.Text className="card-title text-uppercase text-center py-3" style={{fontWeight:'bolder', fontSize:'30px'}}>
                      Sign Up
                    </Card.Text>
                    <Divider style={{backgroundColor: 'white', border: '1px solid white'}}/>

                    <Form.Group  className="form-group" style={{ width:'70%', margin:'40px auto 10px ',fontWeight:'bolder' }}>
                      <Form.Label htmlFor="inlineFormInputGroup">
                        Email address
                      </Form.Label>
                      <div className="position-relative has-icon-right">
                        <InputGroup className="mb-2" >
                          <Form.Control className='form-control input-shadow' id="email" type="email" value={checkemail}  placeholder="이메일을 입력해주세요" onChange={onChangeEmailInput} required />
                            { checkemail === '' ?
                                null :
                                validEmail?
                                <img src={checkIcon} style={{ marginLeft:5,marginRight:5 ,height:'35px'}}></img>:
                                <img src={closeIcon} style={{ marginLeft:5,marginRight:5 ,height:'35px'}}></img>
                                    //<FontAwesomeIcon icon={faCheckCircle} style={{marginLeft:5,marginRight:5 , fontSize:35, color:'blue'}}/>:
                                    //<FontAwesomeIcon icon={faTimesCircle} style={{marginLeft:5,marginRight:5, fontSize:35, color:'red'}}/>
                            }

                            <InputGroup.Text>
                              <img src={emailIcon}></img>
                            </InputGroup.Text>
                          </InputGroup>

                      </div>
                    </Form.Group>

                    <Form.Group className="mb-2" style={{ width:'70%', margin:'40px auto 10px ',fontWeight:'bolder' }}>
                        <Form.Label htmlFor="inlineFormInputGroup">
                            Name
                        </Form.Label>
                        <InputGroup className="mb-2">
                          <Form.Control className='form-control input-shadow' id="name" type="name"  placeholder="이름을 입력해주세요" required/>
                          <InputGroup.Text>
                            <img src={peopleIcon}></img>
                          </InputGroup.Text>
                        </InputGroup>  
                    </Form.Group>
                    
                    <Form.Group className="mb-2" style={{ width:'70%', margin:'40px auto 10px ',fontWeight:'bolder' }}>
                      <Form.Label htmlFor="inlineFormInputGroup" >
                        Password
                      </Form.Label>
                      <InputGroup className="mb-2">
                        <Form.Control type="password" id="passwd" className="form-control input-shadow"  placeholder="비밀번호를 입력해주세요" required/>
                        <InputGroup.Text>
                          <img src={lockIcon}></img>
                        </InputGroup.Text>
                      </InputGroup>
                    </Form.Group>

                    <div className='text-center'>
                      <Button className="btn btn-outline-dark" style={{margin:'50px 0px 30px 0px' , width:'70%', height: '40px',
                          color: 'white', backgroundColor: '#34d6ce', border: '2px solid white',fontWeight:'bolder'}}
                          size='sm' variant="outline-dark" type="submit">
                          회원가입
                      </Button>
                      <div className='text-center'>
                        {
                          errormessage===''?
                          <></>:
                          <p style={{color:'red', marginTop:'-15px'}}>
                            {errormessage}
                          </p>
                        }
                      </div>
                    </div>
                </Col>
            </Form>
          </Card.Body>
          <Divider style={{backgroundColor: 'white'}}/>
          <Card.Footer className="card-footer text-center py-3" style={{backgroundColor:"#34d6ce"}} >
            <Row className="align-items-center">
              <Col sm='6'>
                <Card.Text style={{color: 'white', fontWeight:'bolder'}}>이미 회원이신가요?</Card.Text>
              </Col>
              <Col sm='6'>
                <NavLink to={'/signin'}>
                  <Button style={{color: 'white', backgroundColor: '#34d6ce', border: '2px solid white', fontWeight:'bolder'}} >
                    로그인하기
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

export default SignUp;
