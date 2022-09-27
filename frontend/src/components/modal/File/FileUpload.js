import React, { useEffect, useRef, useState } from 'react';
import { Button, Form, FormSelect, InputGroup, Modal } from 'react-bootstrap';
import { getLocalStorageAuthUser, projectDirectoryListdata } from '../../../apis/Fetch';

function FileUpload({modalShow, FileUploadModalIsOpenCallback, uploadcheck, publishFileUpload, type}) {
    const user = getLocalStorageAuthUser();
    const userNo = user.no;
    const [posts, setPosts] = useState([]);
    const refForm = useRef(null);

    const handleSubmit = async function (e) {
        e.preventDefault();

        // Validation
        if (e.target['comment'].value === '') {
            console.error(`validation ${e.target['comment'].placeholder} is empty ''`);
            return;
        }

        if (e.target['uploadFile'].files.length === 0) {
            console.error(`validation ${e.target['uploadFile'].placeholder} is empty`);
            return;
        }

        const comment = e.target['comment'].value;
        const file = e.target['uploadFile'].files[0];
        const projectNo = e.target['selectProject'].value;
        
        //addFile(comment, file, projectNo,userNo);
        let fileurl = null;
        if(type == 'chat') {
            fileurl = await uploadcheck(comment, file, projectNo, userNo);
            publishFileUpload(file.name + "#$#" + file.size/1024 + "#$#" + file.type + "#$#" + fileurl);
        } else {
            uploadcheck(comment, file, projectNo, userNo);
        }
        
        FileUploadModalIsOpenCallback(false);
    }

    useEffect(()=>{
        (async() => {
            const projectdatalist = await projectDirectoryListdata(userNo);
            setPosts(projectdatalist);
            })();
        }, []);


    return (
        <Modal  
                show={modalShow}
                className={'Modal'}
                onHide={() =>  FileUploadModalIsOpenCallback(false)}
                >
                <Modal.Header closeButton>
                    <Modal.Title>파일 업로드</Modal.Title>
                </Modal.Header>
                    <Modal.Body>
                            <Form 
                                onSubmit={handleSubmit}
                                ref={refForm}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Text id="basic-addon1">파일 설명</InputGroup.Text>
                                        <Form.Control
                                            placeholder={'설명(코멘트)'}
                                            type={'text'}
                                            name={'comment'}
                                            aria-label="Username"
                                            aria-describedby="basic-addon1"
                                            required
                                        />
                                    </InputGroup>
                                <br/>
                                <Form.Group controlId="formFile" className="mb-3" style={{marginLeft:'-7px', marginTop:'-20px', width:'99.3%'}}>
                                    <Form.Control 
                                        type={'file'}
                                        name={'uploadFile'}
                                        placeholder={'파일'}
                                        required
                                    />
                                </Form.Group>
                                <FormSelect name={'selectProject'}  style={{width:'99.3%'}}>
                                    {posts.map(({projectNo,projectName},index) => (
                                        <option key={index} value={projectNo}>{projectName}</option>
                                    ))}
                                </FormSelect>
                            </Form>
                    </Modal.Body>
                <Modal.Footer>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark"  
                                onClick={() => FileUploadModalIsOpenCallback(false)}>취소
                            </Button>
                            <Button
                                className='form-group text-right' 
                                variant="outline-dark" 
                                onClick={() => {
                                refForm.current.dispatchEvent(new Event("submit", {cancelable: true, bubbles: true}));
                            }}>
                                확인
                            </Button>
                </Modal.Footer>
        </Modal>
    );
}

export default FileUpload;