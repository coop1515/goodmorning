import React from 'react';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import FileShareDirectory from './fileshareItem/FileShareDirectory';
function FileShareContainer() {
    const user = getLocalStorageAuthUser();
    const userNo = user.no;

    return (
        <FileShareDirectory userNo={userNo}></FileShareDirectory>
    );
}

export default FileShareContainer;