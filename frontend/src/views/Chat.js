import React from 'react';
import SiteLayout from '../components/layout/SiteLayout';
import Grid from '@mui/material/Grid';
import Chat from '../components/chat/Chat';
import styles from '../styles/css/Scroll.css';

function chat() {

    return (
        <SiteLayout styles={styles}>
            <Chat />
        </SiteLayout>
    );
}

export default chat;