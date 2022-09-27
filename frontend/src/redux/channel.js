import update from 'react-addons-update';

const SET_CHANNEL = 'channel/SET_CHANNEL';
const ADD_CHANNEL = 'channel/ADD_CHANNEL';
const DELETE_CHANNEL = 'channel/DELETE_CHANNEL';

export const setChannel = (channels) => ({ type: SET_CHANNEL, channels});
export const addChannel = (channel) => ({ type: ADD_CHANNEL, channel});
export const deleteChannel = (channelNo) => ({ type: DELETE_CHANNEL, channelNo});

const initialState = []

const channel = (state = initialState, action) => {
  switch(action.type) {
      case SET_CHANNEL:
          return update(state, {$set: action.channels});
      case ADD_CHANNEL:
          return state.concat(action.channel);
      case DELETE_CHANNEL:
          return update(state, {$splice: [[action.channelNo], 1]});
      default:
          return state;
  }
}

export default channel;