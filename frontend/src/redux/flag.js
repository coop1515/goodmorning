const TRUE_FLAG = 'focus/TRUE_FLAG';
const FALSE_FLAG = 'focus/FALSE_FLAG';


export const trueFlag = () => ({ type: TRUE_FLAG});
export const falseFlag = () => ({ type: FALSE_FLAG});

const initialState = null;

const flag = (state = initialState, action) => {
    switch(action.type) {
        case TRUE_FLAG:
            return true;
        case FALSE_FLAG:
            return false;
        default:
            return state;
    }
}

export default flag;