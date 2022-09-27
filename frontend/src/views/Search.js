import { Grid } from "@mui/material";
import React from "react";
import SiteLayout from "../components/layout/SiteLayout";
import SearchList from "../components/search/SearchList";
import { useLocation } from "react-router-dom";
import { Paper } from "@mui/material";

function Search() {
  const location = useLocation();
  const { state } = location;
  const searchText = state.search;
  return (
    <>
      <SiteLayout>
        <Grid item xs={9} style={{padding :'20px'}}>
          <Paper>
          <h3 style={{ padding: "30px 0px 0px 30px" }}>검색 결과</h3>

        <div
          className="animated fadeIn p-4 demo-app"
          style={{ fontFamily: "SUIT-Medium"}}
        >

          <SearchList searchText={searchText}/>
        </div>
        </Paper>
        </Grid>
      </SiteLayout>
    </>
  );
}

export default Search;
