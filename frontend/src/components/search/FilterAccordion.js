import React, {  } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "../../styles/css/Header.css";
import FilterCheckbox from "./FilterCheckbox";
import UserCheckbox from "./UserCheckbox";

export default function FilterAccordion(props) {
  return (
    <div style={{display:'flex', justifyContent:"space-between", alignItems:"center"}}>
      <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="사용자" id="basic-nav-dropdown">
              <UserCheckbox user={props.user} setUser={props.setUser} reRenderCallback={props.reRenderCallback}/>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
      <Navbar bg="light" expand="sm">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="me-auto">
            <NavDropdown title="메시지 타입" id="basic-nav-dropdown" >
              <FilterCheckbox checkMessage={props.checkMessage} checkGithub={props.checkGithub} checkJenkins={props.checkJenkins} messageChange={props.messageChange} githubChange={props.githubChange} jenkinsChange={props.jenkinsChange}/>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  

    </div>
  );
}
  