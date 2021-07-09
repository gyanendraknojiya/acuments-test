import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MissionCard from "../components/MissionCard";
import Header from "../components/Header";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";

const Homepage = () => {
  const data = useSelector((state) => state.data);

  const [previewData, setPreviewData] = useState([]);
  const [searchByName, setSearchByName] = useState("");
  const [filterByLaunchDate, setFilterByLaunchDate] = useState(""); // 1: last week, 2: last month, 3: last year
  const [filterByLaunchStatus, setFilterByLaunchStatus] = useState(""); // 1: success, 2: failure
  const [upcoming, setUpcoming] = useState(""); //1: true, 2: false

  useEffect(() => {
    setPreviewData(data);
  }, [data]);

  // ----------------------------- search by name ----------------------------

  useEffect(() => {
    if (searchByName) {
      setFilterByLaunchDate("");
      setFilterByLaunchStatus("");
      setUpcoming("");
      let temp = data.filter((mission) =>
        mission.rocket.rocket_name.includes(searchByName)
      );
      setPreviewData([...temp]);
    } else {
      setPreviewData(data);
    }
  }, [searchByName, data]);

  // ----------------------------- Filter by launch date --------------------------------

  useEffect(() => {
    if (filterByLaunchDate) {
      setSearchByName("");
      setFilterByLaunchStatus("");
      setUpcoming("");
      if (filterByLaunchDate === 1) {
        let date = new Date();
        const newDate = new Date(date.setDate(date.getDate() - 7));
        let temp = data.filter((mission) => {
          return (
            mission.launch_date_unix * 1000 >= newDate.valueOf() &&
            mission.launch_date_unix * 1000 <= Date.now()
          );
        });
        setPreviewData([...temp]);
      } else if (filterByLaunchDate === 2) {
        let date = new Date();
        const newDate = new Date(date.setDate(date.getDate() - 30));
        let temp = data.filter((mission) => {
          return (
            mission.launch_date_unix * 1000 >= newDate.valueOf() &&
            mission.launch_date_unix * 1000 <= Date.now()
          );
        });
        setPreviewData([...temp]);
      } else if (filterByLaunchDate === 3) {
        let date = new Date();
        const newDate = new Date(date.setDate(date.getDate() - 365));
        let temp = data.filter((mission) => {
          return (
            mission.launch_date_unix * 1000 >= newDate.valueOf() &&
            mission.launch_date_unix * 1000 <= Date.now()
          );
        });
        setPreviewData([...temp]);
      }
    } else {
      setPreviewData(data);
    }
  }, [filterByLaunchDate, data]);

  // ---------------------------- Filter by launch status -----------------------------------

  useEffect(() => {
    if (filterByLaunchStatus) {
      setSearchByName("");
      setFilterByLaunchDate("");
      setUpcoming("");
      if (filterByLaunchStatus === 1) {
        let temp = data.filter((mission) => mission.launch_success);
        setPreviewData([...temp]);
      }
      if (filterByLaunchStatus === 2) {
        let temp = data.filter((mission) => !mission.launch_success);
        setPreviewData([...temp]);
      }
    } else {
      setPreviewData(data);
    }
  }, [filterByLaunchStatus, data]);

  // ---------------------- Filter for upcoming missions --------------------------------

  useEffect(() => {
    if (upcoming) {
      setSearchByName("");
      setFilterByLaunchDate("");
      setFilterByLaunchStatus("");
      if (upcoming === 1) {
        let temp = data.filter((mission) => mission.upcoming);
        setPreviewData([...temp]);
      }
      if (upcoming === 2) {
        let temp = data.filter((mission) => !mission.upcoming);
        setPreviewData([...temp]);
      }
    } else {
      setPreviewData(data);
    }
  }, [upcoming, data]);
  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row mb-2 p-2 bg-light">
          <div className="col-md-3">
            <TextField
              value={searchByName}
              label="Search by rocket name..."
              className="w-100"
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <FormControl className="w-100">
              <InputLabel id="filterByLaunchDate">
                Filter By Launch Date
              </InputLabel>
              <Select
                id="filterByLaunchDate"
                value={filterByLaunchDate}
                onChange={(e) => setFilterByLaunchDate(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={1}>Last Week</MenuItem>
                <MenuItem value={2}>Last Month</MenuItem>
                <MenuItem value={3}>Last Year</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <FormControl className="w-100">
              <InputLabel id="filterByLaunchStatus">
                Filter By Launch Status
              </InputLabel>
              <Select
                id="filterByLaunchStatus"
                value={filterByLaunchStatus}
                onChange={(e) => setFilterByLaunchStatus(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={1}>Success</MenuItem>
                <MenuItem value={2}>Failure</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="col-md-3">
            <FormControl className="w-100">
              <InputLabel id="upcoming">Upcoming</InputLabel>
              <Select
                id="upcoming"
                value={upcoming}
                onChange={(e) => setUpcoming(e.target.value)}
              >
                <MenuItem value={""}>None</MenuItem>
                <MenuItem value={1}>True</MenuItem>
                <MenuItem value={2}>False</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        {searchByName && (
          <h4 className="text-center py-3 text-white">
            Search result for: {searchByName}
          </h4>
        )}
        {data?.length ? (
          <div className="row">
            {previewData.length ? (
              previewData.map((mission, idx) => (
                <div className="col-md-4  my-2" key={idx} >
                  <MissionCard  {...mission} />
                </div>
              ))
            ) : (
              <div className="col-12 text-center my-5 py-5">
                <span className="rounded bg-light py-2 px-5 text-danger">
                  No result found!
                </span>{" "}
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Homepage;
