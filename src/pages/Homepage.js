import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MissionCard from "../components/MissionCard";
import Header from "../components/Header";
import { TextField } from "@material-ui/core";

const Homepage = () => {
  const data = useSelector((state) => state.data);

  const [previewData, setPreviewData] = useState([]);

  const [searchByName, setSearchByName] = useState(null);

  useEffect(() => {
    setPreviewData(data);
  }, [data]);

  useEffect(() => {
    if (searchByName) {
      let temp = data.filter((mission) =>
        mission.rocket.rocket_name.includes(searchByName)
      );
      console.log(temp);
      setPreviewData([...temp]);
    } else {
      setPreviewData(data);
    }
  }, [searchByName, data]);

  return (
    <>
      <Header />

      <div className="container-fluid">
        <div className="row mb-2 p-2 bg-light">
          <div className="col-md-4">
            <TextField
              placeholder="Search by rocket name..."
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
        </div>
        {previewData?.length ? (
          <div className="row">
            {previewData.map((mission, idx) => (
              <div className="col-md-4  my-2">
                <MissionCard key={idx} {...mission} />
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Homepage;
