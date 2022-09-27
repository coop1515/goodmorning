import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { checkResponse, fetchResponse } from '../../apis/Fetch';
import { resetPw } from '../../redux/sign';
import ResetPw from './signItem/ResetPw';

function ResetPwContainer() {

    const { email } = useSelector(state => ({
        email: state.sign.email
      }));

    const dispatch = useDispatch();
    const [errormessage, seterrormessage] = useState("");
    

    const onResetPw=(email) =>{
        updatePw(email);
        return  dispatch(resetPw(email));
    }

    const updatePw = async function(email) {
        try {
            const data ={
                email: email
            }
        
          const response = await fetchResponse('/api/user/resetPw','put','jsonjsonHeader',JSON.stringify(data));
          const json = await checkResponse(response);

            Swal.fire({
              title:'패스워드가 변경되었습니다!',
              text: "해당 이메일로 임시 패스워드가 전송되었습니다.",
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
        <ResetPw
            email={email}
            callback={onResetPw}
            errormessage={errormessage}
        />
    );
}

export default ResetPwContainer;