import update from 'react-addons-update';
/**
 * 액션 타입 만들기
 */

const SET_CREWUSER = 'crew/SET_CREWUSER'; // 크루에 속한 유저 목록

/**
 * @param {object} crewUser 크루에 속한 유저 목록
 */
export const setCrewUser = (crewUser) => ({ type: SET_CREWUSER, crewUser})


/**
 * 초기 상태 선언
 */
const initialState = [
    {}
];

/**
 * 리듀서 선언
 */
const crew = (state = initialState, action) => {
    switch(action.type) {
        case SET_CREWUSER:
            return update(state, {$set: action.crewUser});    
        default:
            return state;
    }
}

export default crew;
