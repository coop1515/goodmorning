const INSERT_SINGUP ='sign/INSERT_SINGUP'

export const signup = (email,name,passwd) =>({type:INSERT_SINGUP,email,name,passwd});
export const signin = (email,passwd) =>({type:INSERT_SINGUP,email,passwd});
export const resetPw = (email) =>({type:INSERT_SINGUP, email});


const initialState = {
    email: '',
    name: '',
    passwd: ''
  };
  
export default function signReducer(state=initialState, action){
    switch (action.type){
        case INSERT_SINGUP:
            return{
                ...state,
                email: action.email,
                name: action.name,
                passwd: action.passwd
            };
        default:
            return state;
    }
}

