import { Button } from '@mui/material';
import React, { Fragment } from 'react';
import styles from '../styles/css/NotFound.css';

export default function NotFound() {
    return (
        <Fragment styles={styles}>
            <div id="notfound">
                <div class="notfound">
                  <div class="notfound-404">
                      <h1>4<span>0</span>4</h1>
                  </div>
                    <div style={{marginTop:'100px'}}>
                    <br/>
                    죄송합니다. 요청하신 페이지를 찾을 수 없습니다.<br/>
                    입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
                    </div>
                    <br/>
                        <Button variant="outlined" sx={{fontFamily: "SUIT-Medium", float: 'right', margin: '10px',color:'black', borderColor:'white'}} onClick={()=> history.back()}>이전 페이지로 돌아가기</Button>                 
                </div>
          </div>
      </Fragment>
    );
}