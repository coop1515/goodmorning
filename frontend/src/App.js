import React from 'react';
import { useRoutes } from 'react-router';
import Channel from "./components/modal/Channel/AddChannel";
import Chat from "./views/Chat";
import FileShare from './views/FileShare';
import NotFound from './views/NotFound';
import Project from './views/Project';
import ResetPw from './views/ResetPw';
import Search from './views/Search';
import SearchChat from './views/SearchChat';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import Task from './views/Task';

export default function App() {
  
    return useRoutes([
        {path:'/', element: <Chat/> },
        {path:'/chat/room', element: <Chat /> },
        {path:'/modal/channel', element: <Channel />},
        {path:'/fileshare',element:<FileShare/>},
        {path:'/project', element: <Project />},
        {path:'/task', element: <Task />},
        {path:'/signin',element:<SignIn/>},
        {path:'/signup',element:<SignUp/>},
        {path:'/resetpw',element:<ResetPw/>},
        {path:'/search', element: <Search />},
        {path:'/searchresult', element: <SearchChat />},
        {path:'*', element: <NotFound />},
    ]);
    
}