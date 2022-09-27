import update from 'react-addons-update';

const SET_CHAT = 'chat/SET_CHAT';
const ADD_CHAT = 'chat/ADD_CHAT';
const DELETE_CHAT = 'chat/DELETE_CHAT';

export const setChat = (chats) => ({ type: SET_CHAT, chats});
export const addChat = (chat) => ({ type: ADD_CHAT, chat});
export const deleteChat = (chatNo) => ({ type: DELETE_CHAT, chatNo});

const initialState = [{}]

const chat = (state = initialState, action) => {
    switch(action.type) {
        case SET_CHAT:
            return update(state, {$set: action.chats});
        case ADD_CHAT:
            return state.concat(action.chat);
        case DELETE_CHAT:
            return update(state, {$splice: [[action.chatNo], 1]});
        default:
            return state;
    }
}

export default chat;