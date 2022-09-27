// 1단계: 문 가져오기
import {
  Checkbox
} from "@mui/material";
import React from "react";
import clickgithub from "../../assets/icons/clickGithub.svg";
import clickjenkins from "../../assets/icons/clickJenkins.svg";
import clickmessage from "../../assets/icons/clickMessage.png";
import unclickgithub from "../../assets/icons/unclickGithub.svg";
import unclickjenkins from "../../assets/icons/unclickJenkins.svg";
import unclickmessage from "../../assets/icons/unclickMessage.png";

import "../../styles/css/Header.css";


export default function FilterCheckbox(props) {

  return (
    <div style={{ display: 'flex', flexDirection: 'column', ml: 3, textAlign:'center' }}>
      <div>
      {props.checkMessage ? (
        <img src={clickmessage} style={{ height: "20px" }} />
      ) : (
        <img src={unclickmessage} style={{ height: "20px" }} />
      )}
      <Checkbox 
        checked={props.checkMessage}
        onChange={props.messageChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      /></div>
      <div>
      {props.checkGithub ? (
        <img src={clickgithub} style={{ height: "22px" }} />
      ) : (
        <img src={unclickgithub} style={{ height: "22px" }} />
      )}
      <Checkbox
        checked={props.checkGithub}
        onChange={props.githubChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      /></div>
      <div>
      {props.checkJenkins ? (
        <img src={clickjenkins} style={{ height: "20px" }} />
      ) : (
        <img src={unclickjenkins} style={{ height: "20px" }} />
      )}
      <Checkbox
        checked={props.checkJenkins}
        onChange={props.jenkinsChange}
        inputProps={{ "aria-label": "Checkbox demo" }}
        size="small"
      ></Checkbox>
  </div>
    </div>
  );
}