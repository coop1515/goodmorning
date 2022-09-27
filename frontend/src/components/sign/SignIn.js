import jwt_decode from "jwt-decode";
import React, { Fragment, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { postSignIn } from '../../apis/Axios';
import { signin } from '../../redux/sign';
import SignIn from './signItem/SignIn';
function SignContainer() {


    const [errormessage, seterrormessage] = useState("");

    const onChangeSaveEmailcheck = (status) =>{
      setSaveEmailcheck(status);
    }

    const { email, passwd } = useSelector(state => ({
        email: state.sign.email,
        passwd: state.sign.passwd
    }));
    

    const dispatch = useDispatch();
    const onSignIn=(email,passwd) =>{
        getSignIn(email,passwd);
        return  dispatch(signin(email,passwd));
    }

      const getSignIn = async function(getEmail,passwd) {
        try {
            const data ={
                email: getEmail,
                passwd: passwd
            }

            const response = await postSignIn('/user/signIn',data);
            const decoded = jwt_decode(response.headers.authorization);
          
            const {no, name, email, job, phoneNumber, profileUrl, signUpDate } = decoded;
            const userInfo = {no, name, email, job, phoneNumber, profileUrl, signUpDate };

            localStorage.setItem('authorization', response.headers.authorization );
            localStorage.setItem('authUser',JSON.stringify(userInfo));
            location.href="/";
            seterrormessage('');
            
        } catch(err) {
          seterrormessage("아이디 또는 비밀번호가 틀립니다.");
        }
      }

    return (
      <Fragment>
        <SignIn
            email={email}
            passwd={passwd}
            callback={onSignIn}
            callbackCheckSaveEmailStatus={onChangeSaveEmailcheck}
            errormessage={errormessage}/>
      </Fragment>     
    );
}

export default SignContainer;