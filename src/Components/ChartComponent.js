import LineChart from "react-linechart";
import { connect } from "react-redux";
import "../../node_modules/react-linechart/dist/styles.css";

const ChartComponent = ({ bills }) => {
  let maxAmount = 0;

  function SortByDate(first, second) {
    if (second.x < first.x) {
      return 1;
    }
    if (second.x > first.x) {
      return -1;
    }
    return 0;
  }
  const dataArray = bills
    .map((bill) => {
      if (maxAmount < parseInt(bill.amount)) maxAmount = parseInt(bill.amount);
      return { x: bill.date, y: bill.amount };
    })
    .sort(SortByDate);

  const data = [
    {
      color: "steelblue",
      points: dataArray,
    },
  ];

  const pointHoverHandler = (e) => {
    return `Amount : ${e.y} \n Date : ${e.x}`;
  };
  return (
    <div>
      <div className="App">
        <h1>Bill Chart</h1>
        <LineChart
          width={800}
          height={400}
          margins={{ top: 50, right: 20, bottom: 50, left: 75 }}
          data={data}
          isDate="true"
          yMin={0}
          yMax={maxAmount * 1.1}
          xLabel="Date(YYYY-MM-DD)"
          yLabel="Bill Amount"
          onPointHover={pointHoverHandler}
        />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  bills: state.bills,
});

export default connect(mapStateToProps, null)(ChartComponent);
