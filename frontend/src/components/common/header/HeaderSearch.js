import Autocomplete from '@mui/material/Autocomplete';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import TextField from '@mui/material/TextField';
import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import SearchIcon from '../../../assets/icons/search.svg';
import { setProject } from "../../../redux/project";
import { getLocalStorageAuthUser } from '../../../apis/Fetch';
import { get } from '../../../apis/Axios';

function HeaderSearch() {
  const searchList = useSelector(state => (state.search), shallowEqual);
  
  const searchMessage = searchList.map((e)=> (e.message))
  const searchBox = searchMessage[0] !== undefined ? searchMessage.map((e)=>e.replaceAll('#$#','')):searchMessage
  const set = new Set(searchBox)
  const searchKeyword = [...set]
  const [search, setSearch] =useState('')
  const projectList = useSelector((state) => state.project, shallowEqual);
  const dispatch = useDispatch();
  const user = getLocalStorageAuthUser();
  const userNo = user.no;
  const channelNo = useSelector(state => (state.focus.channelNo), shallowEqual);

  const projectName = (projectList != null?projectList.map((project)=> project.projectName):[])
  const test = [...searchKeyword,...projectName]
  
  const handleChange=((e)=>{
    if(e.target.value == 0){
      setSearch(e.target.innerText)}
    else{
      setSearch(e.target.value)
    }
  })

  const handleKeyPress = async(e) => {
    const getProjects = await get(`/project/${channelNo}/${userNo}`);
    dispatch(setProject(getProjects));
    if(e.key === 'Enter') {
    }

  }

  return (
      <Grid item xs={7}>
        <div style={{display:'flex' , alignItems:"center"}}>
          <List>

          {searchKeyword.length > 1 ? 
          <Autocomplete
              freeSolo
              value={search || ''}
              id="free-solo-demo"
              options={test}
              onChange={handleChange}
              sx={{ width: '40em', backgroundColor: 'white' }}
              renderInput={(params) => 
              <TextField 
              value={search || ''}
              onChange={handleChange}
              fullWidth
              sx={{
                input: {
                    color: "black",
                    height: '100%',
                    width:'38em',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              {...params}
              label="검색" placeholder="검색어를 입력해주세요"/>}
            /> :
            <TextField 
              value={search || ''}
              onChange={handleChange}
              fullWidth
              label="검색" placeholder="검색어를 입력해주세요"
              sx={{
                input: {
                    color: "black",
                    height: '100%',
                    width:'38em',
                    border: '2px solid white', 
                    borderRadius: '7px', 
                    backgroundColor: 'white'
                }
              }}
              
              
            />}
              
              </List>
          <Link to={"/search"} state={{search:search}}  onKeyPress={handleKeyPress}>
          <Button className='searchbtn' variant="none" onClick={handleKeyPress} ><img src={SearchIcon} style={{height:'40px', border:'0px' }}/></Button> 
          </Link>
          
          </div>
          <Divider />
      </Grid>
  );
}

export default React.memo(HeaderSearch);