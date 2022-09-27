import React from 'react';
import SiteLayout from "../components/layout/SiteLayout";
import FileShareContainer from '../components/fileshare/FileShare'

function FileShare(props) {

    
    return (
        <SiteLayout>
            <FileShareContainer></FileShareContainer>
        </SiteLayout>
    );
}

export default FileShare;