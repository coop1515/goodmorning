import React, { useState } from 'react';
//import Modal from 'react-modal'
import { Button, Form, Modal, Table } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addFileAndFindFileList, deleteFile, fileDownload, projectFileListdata } from '../../../apis/Fetch';
import deleteIcon from '../../../assets/icons/delete.svg';
import downloadIcon from '../../../assets/icons/download.svg';
import { fileFileData } from '../../../redux/file';
import '../../../styles/css/Board.css';
import '../../../styles/css/modal-90w.css';
import Pagination from '../../fileshare/fileshareItem/Pagination';
import FileUpload from '../../modal/File/FileUpload';

function FileShareDownload({modalShow,FileDownloadModalIsOpenCallback,onClickFileUploadModal,FileUploadModalIsOpen,uploadModalIsOpen,authUserNo, posts}) {
    const [limit, setLimit] = useState(5);
    const [page, setPage] = useState(1);
    const offset = (page - 1) * limit;
    const dispatch = useDispatch();
    
    const uploadcheck = async (comment, file, projectNo,userNo)=> {
        const FileListdata = await addFileAndFindFileList(comment, file, projectNo,userNo);
        dispatch(fileFileData(FileListdata));
    }

    return (
        <div>
        <img src={downloadIcon} style={{height:'33px', display:'none'}} />
        <img src={deleteIcon} style={{height:'33px', display:'none'}} />
        <Modal  
                show={modalShow}
                className={'Modal'}
                dialogClassName="modal-90w"
                style={{textAlign:'center'}}
                onHide={() => FileDownloadModalIsOpenCallback(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>파일 다운로드 </Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <Form> 
                                <Table className='tbl-ex'>
                                    <thead>
                                    <tr>
                                        <th>
                                            <select
                                                type="number"
                                                value={limit}
                                                onChange={({ target: { value } }) => setLimit(Number(value))}>
                                                    <option value="5">5</option>
                                                    <option value="10">10</option>
                                                    <option value="20">20</option>
                                                    <option value="50">50</option>
                                                    <option value="100">100</option>
                                            </select> 
                                        </th>
                                        <th>파일명</th>
                                        <th>코멘트</th>
                                        <th>업로드일</th>
                                        <th>다운로드</th>
                                        <th>삭제</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        {
                                                posts.filedata!==null?
                                                    posts.filedata.slice(offset, offset + limit).map(({userNo,url,comment,originFileName,sendDate,projectNo},index) => (
                                                        <tr key={index}>
                                                            <td>{posts.filedata.length-offset-index}</td>
                                                            <td>{originFileName}</td>
                                                            <td title={comment} style={{whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis',width:'auto', maxWidth:'250px'}}>{comment}</td>
                                                            <td>{sendDate}</td>
                                                            <td>
                                                                <Button variant="" component="label" onClick={() => {
                                                                    { 
                                                                        let spliturl = url;
                                                                        spliturl=spliturl.split('/')
                                                                        return fileDownload(spliturl[2])
                                                                    }
                                                                    }}>
                                                                        <img src={downloadIcon} style={{height:'33px'}} />
                                                                </Button> 
                                                            </td>
                                                            <td>
                                                                {authUserNo==userNo?
                                                                    <Button variant="" component="label" style={{color:'red'}} onClick={async ()=>{
                                                                            // {deleteFile(url,userNo,projectNo,setPosts)}}
                                                                            const filelistdata= await deleteFile(url,userNo);
                                                                            const FileListdata = await projectFileListdata(projectNo);
                                                                            dispatch(fileFileData(FileListdata));
                                                                        }}>
                                                                        <img src={deleteIcon} style={{height:'33px'}} />
                                                                    </Button>:null
                                                                }
                                                            </td>
                                                        </tr>
                                                        
                                                    )):null

                                        }

                                    </tbody>
                                </Table>
                                {
                                    posts.filedata!==null?
                                        <Pagination
                                            total={posts.filedata.length}
                                            limit={limit}
                                            page={page}
                                            setPage={setPage}
                                        />:null
                                }
                            </Form>
                    </Modal.Body>
                <Modal.Footer>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileDownloadModalIsOpenCallback(false)}> 닫기
                            </Button>
                            <Button component="label" variant="outline-dark" onClick={onClickFileUploadModal} //책갈피 여기도 수정해줘야함
                            > 
                                Upload  
                            </Button>
                </Modal.Footer>
        </Modal>
        <FileUpload modalShow={uploadModalIsOpen} FileUploadModalIsOpenCallback={FileUploadModalIsOpen} uploadcheck={uploadcheck} type='download'></FileUpload>
        </div>
    );
}

export default FileShareDownload;