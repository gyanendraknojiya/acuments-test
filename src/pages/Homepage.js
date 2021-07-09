import React from "react";
import { useSelector } from "react-redux";
import MissionCard from "../components/MissionCard";
import Header from "../components/Header";

const Homepage = () => {
  const data = useSelector((state) => state.data);

  return (
    <>
      <Header />
      <div className="container-fluid">
        {data?.length ? (
          <div className="row">
            {data.map((mission, idx) => (
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
