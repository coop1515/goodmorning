import { Box, Button, Card, Divider, Grid, Paper } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { memo, useEffect, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { get, remove } from "../../apis/Axios";
import { setCREWFOCUS } from "../../redux/focus";
import { deleteProject, setProject } from "../../redux/project";
import { setTask } from "../../redux/task";
import AddProject from "../modal/Calendar/AddProject";
import ProjectChart from "./ProjectChart";
import CollapsibleTable from "./ProjectTable";
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { getLocalStorageAuthUser } from '../../apis/Fetch';
import { NavLink, useLocation } from "react-router-dom";

function Project({publishLinkPreview}) {
  const location = useLocation();
  const { state } = location;
  const crewName = state.crewName;
  const crewNo = useSelector((state) => state.focus.crewNo, shallowEqual);
  const [channelName, setChannelName] = useState(crewName==null?" 전체 채널":crewName)
  const [show, setShow] = React.useState(false);
  const [changeCrew, setChangeCrew] = useState();
  const [selectionModel, setSelectionModel] = React.useState([]);
  const [date, setDate] = useState(new Date());
  const dispatch = useDispatch();
  const crewList = useSelector((state) => state.crew, shallowEqual);
  const projectList = useSelector((state) => state.project, shallowEqual);
  const handleShow = () => setShow(true);
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const projectName=(no)=> projectList.filter((project)=>{ 
    return no == project.id
  })
  


  useEffect(() => {
    setChangeCrew(crewNo);
  }, [crewNo]);


  const handleDelete = () => {
      selectionModel.map(async (id) => {
      const result = await remove(`/project/${id}`, id);
      const projectIdx = projectList.findIndex(event => event.id == id)
      dispatch(deleteProject(projectIdx));
    });
  };

  const columns = [
    { type: "string", label: "Task ID" },
    { type: "string", label: "Task Name" },
    { type: "string", label: "Resource" },
    { type: "date", label: "Start Date" },
    { type: "date", label: "End Date" },
    { type: "number", label: "기간" },
    { type: "number", label: "작업진행률" },
    { type: "string", label: "Dependencies" },
  ];
  const projects = projectList.map((i, index) => [
    i.id,
    i.projectName,
    i.status > 0 ? i.status > 50 ?'write': 'complate' : null, 
    new Date(i.start),
    new Date(i.end),
    null,
    i.status,
    // index > 1? projectList[index-1].projectName : null
    null
  ]);
  const data = [columns, ...projects];



  return (
    <div
      className="animated fadeIn p-4 demo-app"
      style={{ fontFamily: "SUIT-Medium" }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Box>
          <Paper>
            <Card sx={{ minWidth: 275 }}>
              <Grid item xs={10} md={12}>
                <div
                  style={{
                    float: "right",
                    border: "3px solid #f0f8ff69",
                    fontSize: "15px",
                    padding: "4px",
                    display:'flex', justifyContent:"space-between", alignItems:"center"

                  }}
                >
                    현재 채널은 &nbsp; <strong>  {channelName} </strong> &nbsp; 입니다.

                    <Button
                    variant="primary"
                    onClick={handleShow}
                    style={{ fontFamily: "SUIT-Medium" }}
                  >
                    프로젝트 추가
                  </Button>
                  <NavDropdown
                    style={{
                      float: "right",
                      fontSize: "15px",
                      padding: "4px",
                    }}
                    title="채널 선택"
                  >
                    <NavDropdown.Item
                    onClick={async() => {
                      setChannelName('전체 채널')
                      const getProjects = await get(`/project/${channelNo}/${userNo}`);
                      dispatch(setProject(getProjects));

                    }}>전체 채널</NavDropdown.Item>
                    <Divider />
                    {crewList.length !== 0
                      ? crewList.map((crew, index) => (
                        
                          <NavDropdown.Item
                            onClick={async() => {
                              setChangeCrew((prevState) => ({
                                ...prevState,
                                no: crew.no,
                                name: crew.name,
                              }));
                              setChannelName(crew.name)
                              const getProjects = await get(`/project/cNo/${crew.no}`);
                              dispatch(setProject(getProjects));
                            }}
                            key={index}
                          >
                            {crew.name}
                          </NavDropdown.Item>
                        ))
                      : ""}
                  </NavDropdown>
         
                  
                  <AddProject 
                      show={show} 
                      setShow={setShow}
                      publishLinkPreview={publishLinkPreview}
                      />
                  
               <div>   
        <Navbar key={false} expand={false}  >
          <Container fluid>
           
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-false`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-false`}
              aria-labelledby={`offcanvasNavbarLabel-expand-false`}
              placement="end"
              style={{width:'1000px'}}
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-false`}>
                  프로젝트 수정
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
              <CollapsibleTable
                date={date}
                projectList={projectList}
                selectionModel={selectionModel}
                setSelectionModel={setSelectionModel}
                changeCrew={changeCrew}
                data={data}   
              />
              <Button
                    variant="primary"
                    onClick={handleDelete}
                    style={{ fontFamily: "SUIT-Medium" }}
                >
                  프로젝트 삭제
                </Button>
                {console.log(selectionModel[0])}
                <NavLink to={'/task'} state={{projectName :selectionModel[0] !== undefined? projectName(selectionModel[0])[0].projectName: null}} style={{textDecoration:'none', color: 'black'}}>
                <Button
                    variant="primary"
                    onClick={async()=>{
                      const getTasks = await get(`/task/pNo/${selectionModel[0]}`);
                    dispatch(setTask(getTasks));
     
                  }
                  }
                    style={{ fontFamily: "SUIT-Medium" }
                  }
                >
                  관련 업무 조회
                </Button>
                </NavLink>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
             </div>
                </div>
              </Grid>
              <ProjectChart
                changeCrew={changeCrew}
                projectList={projectList}
                data={data}
              />
            
            </Card>
          </Paper>
        </Box>
      </LocalizationProvider>
    </div>
  );
}

export default memo(Project); 