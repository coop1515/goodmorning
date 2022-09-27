import update from 'react-addons-update';

const SET_CHANNEL_CREW_FOCUS = 'focus/SET_CHANNEL_CREW_FOCUS';
const SET_CHANNEL_FOCUS = 'focus/SET_CHANNEL_FOCUS';
const SET_CREW_FOCUS = 'focus/SET_CREW_FOCUS';
const UPDATE_CREW_FOCUS = 'focus/UPDATE_CREW_FOCUS';

export const setCHANNELCREWFOCUS = (channelCrew) => ({ type: SET_CHANNEL_CREW_FOCUS, channelCrew});
export const setCHANNELFOCUS = (channel) => ({ type: SET_CHANNEL_FOCUS, channel});
export const setCREWFOCUS = (crew) => ({ type: SET_CREW_FOCUS, crew});
export const updateCREW = (crew) => ({ type: UPDATE_CREW_FOCUS, crew});

const initialState = {
    channelName: '',
    channelNo: null,
    crewName: '',
    crewNo:null
};

const focus = (state = initialState, action) => {
    switch(action.type) {
        case SET_CHANNEL_CREW_FOCUS:
            return {...state, 
                channelName: action.channelCrew.channelName, 
                channelNo: action.channelCrew.channelNo, 
                crewName: action.channelCrew.crewName, 
                crewNo: action.channelCrew.crewNo};
        case SET_CHANNEL_FOCUS:
            return {...state, channelName: action.channel.name, channelNo: action.channel.no};
        case SET_CREW_FOCUS:
            return {...state, crewName: action.crew.name, crewNo: action.crew.no};
        case UPDATE_CREW_FOCUS:
            return ({...state, crewName: action.crew.crewName, crewNo: action.crew.crewNo});
        default:
            return state;
    }
}

export default focus;