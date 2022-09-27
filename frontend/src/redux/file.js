const INSERT_FILE ='file/INSERT_FILE'
const DIRECTORY_FILE_LIST ='file/DIRECTORY_FILE_LIST'
const FILE_LIST ='file/FILE_LIST'
const FILE_UPLOAD ='file/FILE_UPLOAD'

export const fileDirectoryData = (directorydata) =>(
    {type:DIRECTORY_FILE_LIST,directorydata});

export const fileFileData = (filedata) =>(
    {type:FILE_LIST,filedata});

export const fileFileUpload = (filedata) =>(
    {type:FILE_UPLOAD,filedata});

const initialState = {
    directorydata: null,
    filedata:[]
  };
  
export default function fileReducer(state=initialState, action){
    switch (action.type){
        case DIRECTORY_FILE_LIST:
            return{
                ...state,
                directorydata: action.directorydata,
            };
        case FILE_LIST:
            return{
                ...state,
                filedata: action.filedata,
            };
        case FILE_UPLOAD:
            return{
                ...state,
                filedata: state.filedata.concat(action.filedata[0]),
            };
        default:
            return state;
    }
}