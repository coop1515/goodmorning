import { Avatar } from "@mui/material";
import React, { memo, useEffect, useState } from "react";
import { shallowEqual, useSelector } from "react-redux";

function AssignCheckbox(props) {
  const taskList = useSelector((state) => state.task, shallowEqual);
  const crewUserList = useSelector((state) => state.crewUser, shallowEqual);
  // 체크된 아이템을 담을 배열
  const [checkItems, setCheckItems] = useState(crewUserList);


  useEffect(() => {
    setCheckItems(crewUserList)
  }, [crewUserList]);

  useEffect(() => {
    handleAllCheck(true)
  }, []);

  useEffect(() => {
    props.setFilteredTask(taskList)
  }, [taskList]);


  // 체크박스 단일 선택
  const handleSingleCheck = (checked, assign) => {
    const test = taskList
      .filter((task) => task.userNo == assign.userNo)
      .map((task) => {
        return task;
      });

    if (checked) {
      // 단일 선택 시 체크된 아이템을 배열에 추가
      setCheckItems((prev) => [...prev, assign]);
      props.setFilteredTask((prev) => [...prev, ...test]);
    } else {
      // 단일 선택 해제 시 체크된 아이템을 제외한 배열 (필터)
      setCheckItems(checkItems.filter((el) => el !== assign));
      props.setFilteredTask(props.filteredTask.filter((el) => el.userNo !== assign.userNo));
    }
  };

  // 체크박스 전체 선택
  const handleAllCheck = (checked) => {
    if (checked) {
      // 전체 선택 클릭 시 데이터의 모든 아이템(no)를 담은 배열로 checkItems 상태 업데이트
      const noArray = [];
      crewUserList.forEach((el) => noArray.push(el));
      setCheckItems(noArray);
      props.setFilteredTask(taskList);

    } else {
      // 전체 선택 해제 시 checkItems 를 빈 배열로 상태 업데이트
      setCheckItems([]);
      props.setFilteredTask([]);
    }
    
  };
  return (
    <>
      <div style={{fontSize:'15px', fontWeight:'bold'}}>
        <input
          type="checkbox"
          name="select-all"
          onChange={(e) => handleAllCheck(e.target.checked)}
          // 데이터 개수와 체크된 아이템의 개수가 다를 경우 선택 해제 (하나라도 해제 시 선택 해제)
          checked={checkItems.length === crewUserList.length ? true : false}
        />
        *팀원 전체
      </div>
      {crewUserList.map((assign, key) => (

        <div key={key}>

          <div style={{display:'flex', alignItems: 'center' , justifyContent: 'center'}}>
            <input
              type="checkbox"
              name={`select-${assign.userNo}`}
              onChange={(e) =>
                handleSingleCheck(e.target.checked, assign)
              }
              // 체크된 아이템 배열에 해당 아이템이 있을 경우 선택 활성화, 아닐 시 해제
              checked={checkItems.includes(assign) ? true : false}
            />
            <Avatar alt={"null"} src={assign.profileUrl} sx={{width: '20px', height: '20px'}} />
            {assign.userName}
          </div>
        </div>
      ))}
    </>
  );
}
export default memo(AssignCheckbox)