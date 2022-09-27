import update from 'react-addons-update';

const SET_CHAT_ALARM = 'chatalarm/SET_CHAT_ALARM';
const ADD_CHAT_ALARM = 'chatalarm/ADD_CHAT_ALARM';
const UPDATE_CHAT_ALARM = 'chatalarm/UPDATE_CHAT_ALARM';
const RESET_CHAT_ALARM = 'chatalarm/RESET_CHAT_ALARM';

export const setCHATALARM = (chatalarm) => ({ type: SET_CHAT_ALARM, chatalarm});
export const addCHATALARM = (chatalarm) => ({ type: ADD_CHAT_ALARM, chatalarm});
export const updateCHATALARM = (chatalarm) => ({ type: UPDATE_CHAT_ALARM, chatalarm});
export const resetCHATALARM = () => ({ type: RESET_CHAT_ALARM});

const initialState = [];

const chatAlarm = (state = initialState, action) => {
    switch(action.type) {
        case SET_CHAT_ALARM:
            return state.map((chatalarm) => {
                if(chatalarm.crewNo === action.chatalarm.crewNo)
                    chatalarm.count = 0;            
                return chatalarm;
            })
        case RESET_CHAT_ALARM:
            return [];
        case ADD_CHAT_ALARM:
            return state.concat(action.chatalarm);
        case UPDATE_CHAT_ALARM:
            return state.map((chatalarm) => {
                if(chatalarm.crewNo === action.chatalarm.crewNo)
                    chatalarm.count ++;            
                return chatalarm;
            })
        
        default:
            return state;
    }
}

export default chatAlarm;