import { combineReducers } from 'redux';
import channel from './channel';
import crew from './crew';
import task from './task';
import sign from './sign';
import focus from './focus';
import chat from './chat';
import crewUser from './crewUser';
import project from './project';
import chatAlarm from './chatAlarm';
import file from './file';
import search from './search';
import flag from './flag';

const rootReducer = combineReducers({
    channel,
    crew,
    task,
    sign,
    focus,
    chat,
    crewUser,
    project,
    chatAlarm,
    file,
    search,
    flag
});

export default rootReducer;