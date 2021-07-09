import "./App.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setApiData } from "./redux/reducer";
import Homepage from "./pages/Homepage";

function App() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();

  console.log(state);


  useEffect(() => {
  let url = "https://api.spacexdata.com/v3/launches";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setApiData(res));
      });
  }, []);

  return <div>
    <Homepage/>
  </div>;
}

export default App;
