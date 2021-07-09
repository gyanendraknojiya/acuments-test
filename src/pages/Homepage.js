import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MissionCard from "../components/MissionCard";
import Header from "../components/Header";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";

const Homepage = () => {
  const data = useSelector((state) => state.data);

  const [previewData, setPreviewData] = useState([]);
  const [searchByName, setSearchByName] = useState(null);
  const [filterByLaunchDate, setFilterByLaunchDate] = useState(null);// 1: last week, 2: last month, 3: last year

  useEffect(() => {
    setPreviewData(data);
  }, [data]);

  useEffect(() => {
    if (searchByName) {
      setFilterByLaunchDate(null)
      let temp = data.filter((mission) =>
        mission.rocket.rocket_name.includes(searchByName)
      );
      console.log(temp);
      setPreviewData([...temp]);
    } else {
      setPreviewData(data);
    }
  }, [searchByName, data]);

  useEffect(() => {
    if (filterByLaunchDate) {
      setSearchByName(null)
      if(filterByLaunchDate === 1){
        let date = new Date()
        const newDate = new Date(date.setDate(date.getDate() -7));
        console.log(newDate.valueOf())
        let temp = data.filter((mission) =>{
          console.log(mission.launch_date_unix*1000)
       return mission.launch_date_unix*1000 >=newDate.valueOf() &&mission.launch_date_unix*1000 <=Date.now()
      });
      setPreviewData([...temp]);
      } else if (filterByLaunchDate === 2){
        let date = new Date()
        const newDate = new Date(date.setDate(date.getDate() -30));
        console.log(newDate.valueOf())
        let temp = data.filter((mission) =>{
          console.log(mission.launch_date_unix*1000)
       return mission.launch_date_unix*1000 >=newDate.valueOf() &&mission.launch_date_unix*1000 <=Date.now()
      });
      setPreviewData([...temp]);
      } else if (filterByLaunchDate === 3){
        let date = new Date()
        const newDate = new Date(date.setDate(date.getDate() -365));
        console.log(newDate.valueOf())
        let temp = data.filter((mission) =>{
          console.log(mission.launch_date_unix*1000)
       return mission.launch_date_unix*1000 >=newDate.valueOf() &&mission.launch_date_unix*1000 <=Date.now()
      });
      setPreviewData([...temp]);
      }
    } else {
      setPreviewData(data);
    }
  }, [filterByLaunchDate, data]);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row mb-2 p-2 bg-light">
          <div className="col-md-4">
            <TextField
              value={searchByName}
              label="Search by rocket name..."
              className="w-100"
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div className="col-md-4" >
          <FormControl className="w-100" >
          <InputLabel id="filterByLaunchDate">Filter By Launch Date</InputLabel>
          <Select
          id="filterByLaunchDate"
          value={filterByLaunchDate}
          onChange={(e)=> setFilterByLaunchDate(e.target.value)}
        >
          <MenuItem value={1}>Last Week</MenuItem>
          <MenuItem value={2}>Last Month</MenuItem>
          <MenuItem value={3}>Last Year</MenuItem>
        </Select>
        </FormControl>
          </div>
        </div>
        {searchByName && <h4 className="text-center py-3 text-white" >Search result for: {searchByName}</h4>}
        {data?.length ? (
          <div className="row">
            {previewData.length? previewData.map((mission, idx) => (
              <div className="col-md-4  my-2">
                <MissionCard key={idx} {...mission} />
              </div>
            )): <div className="col-12 text-center my-5 py-5" ><span className="rounded bg-light py-2 px-5 text-danger">No result found!</span> </div>}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Homepage;
