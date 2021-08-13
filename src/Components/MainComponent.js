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
        <BudgetComponent />
        <BillTableComponent />
      </Route>
      <Route path="/chart" exact>
        <ChartComponent />
      </Route>
    </div>
  );
};

export default MainComponent;
