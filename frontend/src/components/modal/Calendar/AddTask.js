
import moment from 'moment';
import React, { memo, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { post, put, remove } from '../../../apis/Axios';
import { addTask, deleteTask, updateTask } from '../../../redux/task';
import { getLocalStorageAuthUser } from '../../../apis/Fetch';
import "../../../styles/css/Calendar.css";
import AssignSelect from '../../calendar/AssignSelect';
import ColorPicker from '../../calendar/ColorPicker';
import EndDatePicker from "../../calendar/EndDatePicker";
import ProjectSelect from '../../calendar/ProjectSelect';
import StartDatePicker from "../../calendar/StartDatePicker";
import Status from "../../calendar/Status";

function AddTask(props) {
  const { title, start, end, id, userName, userNo, projectName, projectNo, color, status } = props.state
  const [clickedEventTitle, setClickedEventTitle] = useState()
  const [clickedStart, setClickedStart] = useState()
  const [clickedEnd, setClickedEnd] = useState()
  const [clickedUserNo,setClickedUserNo] = useState()
  const [clickedUserName,setClickedUserName] = useState()

  const [clickedProject, setClickedProject] = useState();
  const [clickedProjectNo, setClickedProjectNo] = useState();
  const [clickedColor, setClickedColor] = useState();
  const [clickedStatus, setClickedStatus] = useState("Todo");

  const [addedAssigns, setAddedAssigns]= useState([]);
  const [includesCheck, setIncludeCheck] = useState(true);
  const user = getLocalStorageAuthUser();
  const authUserNo = user.no;

  
  useEffect(()=>{
    setClickedEventTitle(title)
    setClickedStart(start)
    setClickedEnd(end)
    setClickedUserNo(userNo)
    setClickedUserName(userName)
    setClickedProject(projectName)
    setClickedProjectNo(projectNo)
    setClickedColor(color)
    setClickedStatus(status)
  },[props])

  const dispatch = useDispatch();
  const taskList = useSelector(state => state.task, shallowEqual);
  let newCalendarEvents = [...taskList];

  
    const onSubmit = async(e) => {
        e.preventDefault(); // Submit 이벤트 발생했을 때 새로고침 방지

        const clickedEventId = props.state.id
        const updatedTask={
          title: clickedEventTitle,
          start:moment(clickedStart).format('YYYY-MM-DD'),
          end: moment(clickedEnd).format('YYYY-MM-DD'),
          projectName:clickedProject,
          projectNo: clickedProjectNo,
          crewNo: props.crewNo,
          color: clickedColor,
          status: clickedStatus,
          id: clickedEventId}
        
        if(clickedEventId){
            const clickedEventIdx = newCalendarEvents.findIndex(
            (event) => event.id == clickedEventId);
            if(addedAssigns){ // 추가된 사람이 있다.
                addedAssigns.map(async (assign)=>{
                    const ids = []
                    newCalendarEvents.map((event) => {ids.push(event.id)})
                    const maxId = Math.max(...ids);
                    const _addTask={...updatedTask, id: maxId + 1, userNo: assign.userNo, userName:assign.userName}
                    
                    await post(`/task`, _addTask)
                    dispatch(addTask([_addTask]));
                    props.setFilteredTask([...props.filteredTask,_addTask])
                    props.closeModal();
                    setClickedEventTitle("");
                })
            }

            if(includesCheck){ //기존 사람의 변경 및 삭제 여부.
                const filterTaskIdx = props.filteredTask.findIndex(event => event.id == id)
                await put(`/task/${clickedEventId}`, {...updatedTask,userNo:userNo,userName:userName})
                dispatch(updateTask(clickedEventIdx, {...updatedTask,userNo:userNo,userName:userName}));

                props.closeModal();
                setClickedEventTitle("");

                if (filterTaskIdx > -1) {
                    props.filteredTask[filterTaskIdx] = {...updatedTask,userNo:userNo,userName:userName}
                    props.setFilteredTask([...props.filteredTask])
                }

            }else{
                deleteEventHandler()
                props.closeModal();
                setClickedEventTitle("");
            }
        } else {
              addedAssigns.map(async (assign)=>{
                  const ids = []
                  newCalendarEvents.map((event) => {ids.push(event.id)})
                  const maxId = Math.max(...ids);
                  const _addTask={...updatedTask,
                    id: maxId + 1,
                    userNo: assign.userNo,
                    userName: assign.userName
                  }
                  const result = await post(`/task`, _addTask);
                  dispatch(addTask([_addTask]));
                  props.setFilteredTask([...props.filteredTask,_addTask])
                  props.closeModal();
                  setClickedEventTitle("");
            })
        }
    };

  const deleteEventHandler = async () => {
    const clickedEventIdx = taskList.findIndex(event => event.id == id)
    const filterTaskIdx = props.filteredTask.findIndex(event => event.id == id)
    
    if (filterTaskIdx > -1) {
      await remove(`/task/${id}`, id)
      dispatch(deleteTask(clickedEventIdx));
      props.filteredTask.splice(filterTaskIdx, 1)
      props.setFilteredTask([...props.filteredTask,props.filteredTask])
    }
    props.closeModal();
  }

  const titleChangeHandler = (e) => {
    setClickedEventTitle(e.target.value)
  }

  const closeEventHandler = () => {
    props.closeModal();
    props.setState('')
  }
  return (
    <Modal show={props.modalIsOpen} onHide={closeEventHandler} >
      <Modal.Header closeButton>
          <Modal.Title>업무 추가</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>업무명</Form.Label>
              <Form.Control
                type="text"
                placeholder="업무 이름을 입력해주세요."
                autoFocus
                value={clickedEventTitle || ''} onChange={titleChangeHandler}
              />
            </Form.Group>
      
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>시작일시</Form.Label>
              <br />
              <StartDatePicker clickedStart={clickedStart} setClickedStart={setClickedStart} disableClock={true} locale="ko-KO" />
              <br />
              
              <Form.Label>종료일시</Form.Label>
              <br />
              <EndDatePicker clickedEnd={clickedEnd} setClickedEnd={setClickedEnd} disableClock={true} locale="ko-KO" />
              <br />
      
        <h6>프로젝트명</h6>
        <ProjectSelect state={props.state || null} setState={props.setState} clickedProject={clickedProject} setClickedProject={setClickedProject} setClickedProjectNo={setClickedProjectNo} />
    
        <br/>
        <Row>
        <Col><div><h6>진행 상황</h6>
        <Status state={props.state} clickedStatus={clickedStatus} setClickedStatus={setClickedStatus}/></div></Col>
        
        <Col><h6>색상 설정</h6><div><ColorPicker clickedColor={clickedColor} setClickedColor={setClickedColor} /></div>
        </Col>
        </Row>
       
        <h6>책임자</h6>
        <AssignSelect defaultValue={props.state || null} addedAssigns={addedAssigns} setAddedAssigns={setAddedAssigns} includesCheck={includesCheck} setIncludeCheck={setIncludeCheck}/>
        
        <Button style={{marginTop: '10px', float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="button" onClick={closeEventHandler}>닫기</Button>
        {userNo&&userNo == authUserNo? <Button style={{marginTop: '10px',marginRight: '5px',float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="button" onClick={deleteEventHandler}>삭제</Button> :''}
        {props.state.id ==null || userNo == authUserNo? <Button style={{marginTop: '10px',marginRight: '5px',float:'right', borderColor:'#34d6ce',backgroundColor:'white'}} variant="outlined" type="submit" onClick={onSubmit}>등록</Button>:''}
        </Form.Group>
        </Form>
        </Modal.Body>
     
    </Modal>
  )
}
export default memo(AddTask);
