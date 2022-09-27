import React from 'react';
import loadingIcons from '../../assets/icons/loading.gif';

function Loading() {
  return (
    <div style={{ backgroundColor:'#f7f7fa', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '650px'}}>
        <img src={loadingIcons} alt="로딩중" style={{margin: '0 140px 0 0'}} width={130} height={130} />
    </div>
  );
}

export default Loading;