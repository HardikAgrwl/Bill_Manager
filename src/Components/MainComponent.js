import { Route } from "react-router-dom";
import ChartComponent from "./ChartComponent";
import HomeComponent from "./HomeComponent/HomeComponent";

const MainComponent = () => {
  return (
    <div>
      <Route path="/" exact>
        <HomeComponent />
      </Route>
      <Route path="/chart" exact>
        <ChartComponent />
      </Route>
    </div>
  );
};

export default MainComponent;
