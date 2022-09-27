import { Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { projectDirectoryListdata, projectFileListdata } from '../../../apis/Fetch';
import { fileDirectoryData, fileFileData } from '../../../redux/file';
import '../../../styles/css/Board.css';
import FileShareDownload from '../../modal/File/FileShareDownload';
import Pagination from './Pagination';


function FileShareDirectory({userNo}) {
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [uploadModalIsOpen, setuploadModalIsOpen] = useState(false);
    const [isInitial, setInitial] = useState(false);

    const dispatch = useDispatch();
    const offset = (page - 1) * limit;
    
    useEffect(()=>{
        (async () => {
                const directoryListdata = await projectDirectoryListdata(userNo)
                dispatch(fileDirectoryData(directoryListdata));
                setInitial(true)
            })();
    }, []);

    const posts = useSelector(state => ({
        directorydata: state.file.directorydata,
    }));

    const filePosts = useSelector( state => {
        return ({
        filedata: state.file.filedata,
    })
});
    
    // modal click
    const onClickModal = async (e) => {
        setModalIsOpen(true)
        const FileListdata = await projectFileListdata(e.target.id);
        dispatch(fileFileData(FileListdata));
    }
    
    const FileDownloadModalIsOpen = (isOpenStatus) => {
        setModalIsOpen(isOpenStatus)
    }

    const onClickFileUploadModal = () => {
        setuploadModalIsOpen(true)
    }
    const FileUploadModalIsOpen = (isOpenStatus) => {
        setuploadModalIsOpen(isOpenStatus)
    }

    return (
        <div style={{width: '83%', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
        <Paper sx={{width: '90%', height: '90%'}}>
            <div style={{width:'85%', textAlign:'center', margin:'0 auto'}}>
                <Table className='tbl-ex'  style={{width: '100%'}}>
                    <thead>
                    <tr>
                        <th>
                            <select
                            type="number"
                            value={limit}
                            onChange={({ target: { value } }) => setLimit(Number(value))}>
                                <option value="10">10</option>
                                <option value="20">20</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                            </select> 
                        </th>
                        <th>프로젝트 명</th>
                        <th>채널 명</th>
                        <th>파일 목록</th>
                    </tr>
                    </thead>
                    <tbody>
                    
                    {
                       
                        isInitial ? 
                            posts.directorydata.slice(offset, offset + limit).map(({projectNo,projectName,crewName},index) => (
                                <tr key={index} style={{backgroundColor: '#fff'}}>
                                    <td>{posts.directorydata.length-offset-index}</td>
                                    <td>{projectName}</td>
                                    <td>{crewName}</td>
                                    <td> 
                                        <Button id={projectNo} variant="" component="label" onClick={onClickModal}>
                                                    보기 
                                        </Button> 
                                    </td>
                                </tr>
                            )) :
                            null
                    }
                    </tbody>
                </Table>
                {   
                    isInitial ?
                        <Pagination
                                    total={posts.directorydata.length}
                                    limit={limit}
                                    page={page}
                                    setPage={setPage}
                        /> : null
                        
                }    
            </div>
            {   
                (filePosts!==null&&filePosts!==undefined&&true)?
                <FileShareDownload
                    modalShow={modalIsOpen}
                    FileDownloadModalIsOpenCallback={FileDownloadModalIsOpen} 
                    onClickFileUploadModal={onClickFileUploadModal}
                    FileUploadModalIsOpen={FileUploadModalIsOpen}
                    uploadModalIsOpen={uploadModalIsOpen}
                    authUserNo={userNo}
                    posts={filePosts}
                /> :
                null
            }    

        </Paper>
        </div>
    );
}
export default FileShareDirectory;