import update from 'react-addons-update';
/**
 * 액션 타입 만들기
 */
const SET_CREW = 'crew/SET_CREW';
const ADD_CREW = 'crew/ADD_CREW';
const DELETE_CREW = 'crew/DELETE_CREW';
const UPDATE_CREW = 'crew/UPDATE_CREW';
/**
 * @param {object} crews 채널에 속한 크루 목록
 */
export const setCrew = (crews) => ({ type: SET_CREW, crews});

export const updateCREW = (crew) => ({ type: UPDATE_CREW, crew});


/**
 * @param {object} crew 채널에 추가될 크루 
 */
export const addCrew = (crew) => ({ type: ADD_CREW, crew});

/**
 * @param {number} crewNo 삭제할 크루의 인덱스
 */
export const deleteCrew = (crewNo) => ({ type: DELETE_CREW, crewNo})

/**
 * 초기 상태 선언
 */
const initialState = [];

/**
 * 리듀서 선언
 */
const crew = (state = initialState, action) => {
    switch(action.type) {
        case SET_CREW:
            return update(state, {$set: action.crews});
        case ADD_CREW:
            return state.concat(action.crew);
        case UPDATE_CREW:
            return state.map((crew) => {
                if(crew.no === action.crew.no)
                     crew.name = action.crew.name;            
                return crew;
            })
        case DELETE_CREW:
            return update(state, {$splice: [[action.crewNo], 1]});
        default:
            return state;
    }
}

export default crew;
