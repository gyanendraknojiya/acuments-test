import "./App.css";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setApiData } from "./redux/reducer";
import Homepage from "./pages/Homepage";
import Loader from "./components/Loader";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let url = "https://api.spacexdata.com/v3/launches";

    fetch(url)
      .then((res) => res.json())
      .then((res) => {
        dispatch(setApiData(res));
        setLoading(false);
      });
  }, []);

  return loading ? <Loader/> : <Homepage />;
}

export default App;
