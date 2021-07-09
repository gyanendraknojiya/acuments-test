import React from 'react'
import RocketLoader from "../assets/rocketLoader.gif"

const Loader = () => {
  return (
    <div className="vh-100 vw-100 d-flex align-items-center bg-white justify-content-center" >
      <img src={RocketLoader} alt="RocketLoader" width="250px" />
    </div>
  )
}

export default Loader
