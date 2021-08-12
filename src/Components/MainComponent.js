import { Route } from "react-router-dom";
import BillEnteryComponent from "./BillEntryComponent";
import BillTableComponent from "./BillTableComponent";

const MainComponent = () => {
  return (
    <div>
      <Route path="/">
        <BillEnteryComponent />
        <BillTableComponent />
      </Route>
    </div>
  );
};

export default MainComponent;
