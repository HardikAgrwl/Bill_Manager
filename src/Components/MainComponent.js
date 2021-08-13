import { Route } from "react-router-dom";
import BillEnteryComponent from "./BillEntryComponent";
import BillTableComponent from "./BillTableComponent";
import BudgetComponent from "./BudgetEntryComponent";
import ChartComponent from "./ChartComponent";

const MainComponent = () => {
  return (
    <div>
      <Route path="/" exact>
        <BillEnteryComponent />
        <BillTableComponent />
      </Route>
      <Route path="/chart" exact>
        <ChartComponent />
        <BudgetComponent />
      </Route>
    </div>
  );
};

export default MainComponent;
