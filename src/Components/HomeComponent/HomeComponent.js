import BillEntryComponent from "./BillEntryComponent";
import BillTableComponent from "./BillTableComponent/BillTableComponent";
import BudgetComponent from "./BudgetEntryComponent";

const HomeComponent = () => {
  return (
    <div>
      <BillEntryComponent />
      <BudgetComponent />
      <BillTableComponent />
    </div>
  );
};

export default HomeComponent;
