import update from 'react-addons-update';

const SET_PROJECT = 'project/SET_PROJECT';
const ADD_PROJECT = 'project/ADD_PROJECT';
const DELETE_PROJECT = 'project/DELETE_PROJECT';
const UPDATE_PROJECT = 'project/UPDATE_PROJECT';

export const setProject = (projects) => ({ type: SET_PROJECT, projects });
export const addProject = (project) => ({ type: ADD_PROJECT, project });
export const deleteProject = (id) => ({ type: DELETE_PROJECT, id });
export const updateProject = (id, project) => ({ type: UPDATE_PROJECT, id, project})

const initialState = []

const project = (state = initialState, action) => {

    switch (action.type) {
        case SET_PROJECT:
            return update(state, { $set: action.projects });    
        case ADD_PROJECT:
            return update(state, { $push: action.project });
        case DELETE_PROJECT:  
            return update(state, { $splice: [[action.id, 1]] });
        case UPDATE_PROJECT:
            return state.map((m, i) => {
                if(i === action.id) {
                    m = action.project;
                }
                return m;
            })
        default:
            return state;
    }
}

export default project;