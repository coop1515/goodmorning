import update from 'react-addons-update';

const SET_SEARCH = 'search/SET_SEARCH';

export const setSearch = (searchs) => ({ type: SET_SEARCH, searchs});

const initialState = [{}]

const search = (state = initialState, action) => {
    switch(action.type) {
        case SET_SEARCH:
            return update(state, {$set: action.searchs});
        default:
            return state;
    }
}

export default search;