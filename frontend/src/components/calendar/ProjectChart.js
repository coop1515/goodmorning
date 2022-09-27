import React from "react";

import { Chart } from "react-google-charts";
import "../../styles/css/gantt.css";

export default function MyWidget(props) {
  const [data, setData] = React.useState(props.data);

  React.useEffect(() => {
    setData(props.data);
  }, [props.data]);

  React.useEffect(() => {
    setData(props.data);
  }, [data]);
  
  return (
    <div>
      <h3 style={{ padding: "30px"}}>프로젝트 달력</h3>
      {data.length >= 2 ? (
        <div style={{ margin: "20px", height:"650px"}}>
          <Chart
            className="ganttchart"
            chartType="Gantt"
            data={data}
            width="100%"
            height={data.length*50}
            chartLanguage="ko"
            legendToggle
            options={options}
          />
        </div>
      ) : (
        <div style={{ height:'650px', textAlign:'center', padding:'20px'}}>채널을 선택하거나 프로젝트를 생성해주세요.</div>
      )}
    </div>
  );
}
export const options = {
  gantt:{
  labelMaxWidth:150,
  labelStyle: {
    fontSize: 11,
   },
   
}};