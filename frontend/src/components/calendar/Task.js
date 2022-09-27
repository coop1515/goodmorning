import React, { memo, useCallback, useEffect, useState } from "react";
import { Box, Card, Divider, Paper } from "@mui/material";
import { Col, NavDropdown, Row } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { get } from '../../apis/Axios';
import { addTask, setTask } from "../../redux/task";
import AddTask from "../modal/Calendar/AddTask";
import Checkbox from "./AssignCheckbox";
import TaskCalendar from "./TaskCalendar";
import TaskList from "./TaskList";
import "../../styles/css/Calendar.css";

function Calendar() {
  const location = useLocation();
	const pjName = location.state.projectName;
  let isInitial = true;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [clickedEventAssign, setClickedEventAssign] = useState("");
  const [channelName, setChannelName] = useState(pjName==null?'전체 프로젝트':pjName)
  const [filteredTask, setFilteredTask] = useState([]);
  const [state, setState] = useState({
    id: "",
    projectNo: "",
    userName: "",
    title: "",
    start: "",
    end: "",
    status: "",
    crewNo: "",
    projectName: "",
    color: "",
  });
  const taskList = useSelector((state) => state.task, shallowEqual);
  const crewNo = useSelector((state) => state.focus.crewNo, shallowEqual);
  const projectList = useSelector((state) => state.project, shallowEqual);
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
  const dispatch = useDispatch();
  
  const openModal = () => {
    setIsOpen(true);
  };

  function closeModal() {
    setIsOpen(false);
    setState((prevState) => ({ ...prevState, title: "", projectName: "" }));
  }

  useEffect(() => {
    if (!modalIsOpen && isInitial && taskList.length !== 0) {
      setFilteredTask(taskList);

      isInitial = false;
    }
  }, [taskList]);

  const onClickAddTask = (task) => {
    dispatch(addTask(task));
  };

  const eventClickHandler = (info) => {
    const { id, title, start, end, borderColor } = info.event;
    const { userName, userNo, status, projectNo,  projectName } =
      info.event.extendedProps;

    const clickedTask = {
      title: title,
      start: start,
      end: end,
      id: id,
      userName: userName,
      userNo: userNo,
      status: status,
      projectNo: projectNo,
      color: borderColor,
      projectName: projectName,
    };

    if (end == null) {
      const clickedOnedayTask = { ...clickedTask, end: start };
      setState(clickedOnedayTask);
    } else {
      setState(clickedTask);
    }

    openModal();
  };

  const dateClickHandler = (info) => {
    setState({ start: info.date, end: info.date, title: "" });
    openModal();
  };

  return (
    <div
      className="animated fadeIn p-4 demo-app"
    >
      <Box>
        <Paper>
          <Card sx={{ minWidth: 275 }}>
            <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
              <h3 style={{ padding: "30px 0px 0px 50px", width: "200px" }}>
                업무 달력
              </h3>
              <div style={{marginRight:'10px'}}>
              현재 프로젝트는 <strong>{channelName}</strong> 입니다. &nbsp;

            <NavDropdown
                    style={{
                      float: "right",
                      fontSize: "15px",
                      padding: "4px",
                    }}
                    title="프로젝트 선택"
                  >
                    <NavDropdown.Item
                    onClick={async() => {
                      setChannelName('전체 프로젝트')
                      const getTasks = await get(`/task/${channelNo}`);
                      dispatch(setTask(getTasks));

                    }}>전체 프로젝트</NavDropdown.Item>
                    <Divider />
                    {projectList.length !== 0
                      ? projectList.map((project, index) => (
                        
                          <NavDropdown.Item
                            onClick={async() => {
                              setChannelName(project.projectName)
                              const getTasks = await get(`/task/pNo/${project.id}`);
                              dispatch(setTask(getTasks));
                            }}
                            key={index}
                          >
                            {project.projectName}
                          </NavDropdown.Item>
                        ))
                      : ""}
                  </NavDropdown>
           
              </div>

            </div>
            <div style={{display:'flex',gap:"1rem"}}>
            
            <Row style={{ padding: "20px" }}>
              <div>
                <Col lg={9} sm={12} md={12}>
                  <TaskCalendar
                    taskList={filteredTask}
                    eventClickHandler={eventClickHandler}
                    dateClickHandler={dateClickHandler}
                  />
                </Col>
              </div>
            </Row>
            
            <div className="external-events">
              <TaskList taskList={filteredTask}/>
              
            </div>
            <div className="external-events">
            <strong>담당자</strong>
            <br/><br/>
            <Checkbox
                filteredTask={filteredTask}
                setFilteredTask={setFilteredTask}
              />
            </div>
            </div>
            <AddTask
              modalIsOpen={modalIsOpen}
              closeModal={closeModal}
              taskList={filteredTask}
              state={state}
              setState={setState}
              onClickAddTask={onClickAddTask}
              clickedEventAssign={clickedEventAssign}
              setClickedEventAssign={setClickedEventAssign}
              filteredTask={filteredTask}
              setFilteredTask={setFilteredTask}
              crewNo={crewNo}
            />
          </Card>
        </Paper>
      </Box>
    </div>
  );
}

export default memo(Calendar);
