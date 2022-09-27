import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { checkResponse, fetchResponse } from '../../apis/Fetch';
import { signup } from '../../redux/sign';
import SignUp from './signItem/SignUp';

function SignContainer() {

    const [errormessage, seterrormessage] = useState("");
    const { email, name, passwd } = useSelector(state => ({
        email: state.sign.email,
        name: state.sign.name,
        passwd: state.sign.passwd
      }));

    const dispatch = useDispatch();
    const onSignUp = (email,name,passwd) => {
        insertSignUp(email,name,passwd);
        return dispatch(signup(email,name,passwd));
    };


    const insertSignUp = async function(email,name,passwd) {
    try {
              const data ={
                  email: email,
                  name: name,
                  passwd: passwd
              }
              
            const response = await fetchResponse('/api/user/signUp','post','jsonjsonHeader',JSON.stringify(data));
            const json = await checkResponse(response);

            Swal.fire({
              title:'회원가입 성공!',
              text: "해당 이메일로 확인 메일이 전송되었습니다.",
              icon: 'success',
              confirmButtonText: '확인'
            }).then((reuslt)=>{
                if (reuslt.isConfirmed) {
                  location.href="/signin";
                }
              })
            seterrormessage('');
        } catch(err) {
          seterrormessage(err.toString());
        }
      }

    return (
      <Fragment>
        <SignUp
            email={email}
            name={name}
            passwd={passwd}
            callback={onSignUp}
            errormessage={errormessage}/>
      </Fragment>     
    );
}

export default SignContainer;