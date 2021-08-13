import { Button, IconButton, TextField, Tooltip } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CancelRoundedIcon from "@material-ui/icons/CancelRounded";
import PaymentRoundedIcon from "@material-ui/icons/PaymentRounded";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  changeBudget,
  clearBudget,
  deleteBills,
  editPayablesList,
} from "../actions/BillActions";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(2),
      width: "25ch",
      alignItems: "center",
    },
  },
  button: {
    width: "15ch",
    padding: "0.5rem",
  },
}));

function BudgetComponent({
  changeBudget,
  editPayablesList,
  monthly_budget,
  Bills,
  clearBudget,
  payableBills,
  deleteBills,
}) {
  const classes = useStyles();
  const [budget, setBudget] = useState(monthly_budget);

  const handleSubmit = (e) => {
    e.preventDefault();
    changeBudget(parseInt(budget));
    setBudget(0);
  };

  const changeHandler = (e) => {
    setBudget(e.target.value);
  };

  function SortByAmount(first, second) {
    if (parseInt(second.amount) < parseInt(first.amount)) {
      return 1;
    }
    if (parseInt(second.amount) > parseInt(first.amount)) {
      return -1;
    }
    return 0;
  }

  useEffect(() => {
    const MaxPayableBills = () => {
      let bills = [...Bills];
      bills.sort(SortByAmount);
      let sum = 0;
      let payables = [];
      for (let i = 0; i < bills.length; i++) {
        if (sum + parseInt(bills[i].amount) <= monthly_budget) {
          sum = sum + parseInt(bills[i].amount);
          payables.push(bills[i].id);
        }
      }
      editPayablesList(payables);
    };
    MaxPayableBills();
  }, [monthly_budget, Bills, editPayablesList]);

  const payHandler = () => {
    let amountLeft = monthly_budget;
    let remainingBills = [];
    for (let i = 0; i < Bills.length; i++) {
      if (payableBills.includes(Bills[i].id))
        amountLeft -= parseInt(Bills[i].amount);
      else remainingBills.push({ ...Bills[i] });
    }
    deleteBills(remainingBills);
    changeBudget(amountLeft);
  };

  return (
    <div style={{ margin: "1rem", textAlign: "center" }}>
      <form className={classes.root} autoComplete>
        <TextField
          id="budget"
          required
          label="Monthly budget"
          value={budget !== 0 ? budget : ""}
          onChange={changeHandler}
          variant="outlined"
        />
        <Button
          variant="contained"
          type="submit"
          onClick={handleSubmit}
          className={classes.button}
        >
          Submit
        </Button>
      </form>
      <h3>
        {`Monthly Budget : ${monthly_budget}`}{" "}
        <span>
          <Tooltip title="Pay">
            <IconButton aria-label="pay" onClick={payHandler}>
              <PaymentRoundedIcon />
            </IconButton>
          </Tooltip>
        </span>{" "}
        <span>
          <Tooltip title="Cancel">
            <IconButton aria-label="cancel" onClick={() => clearBudget()}>
              <CancelRoundedIcon />
            </IconButton>
          </Tooltip>
        </span>
      </h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  monthly_budget: state.monthly_budget,
  Bills: state.bills,
  payableBills: state.payableBills,
});

export default connect(mapStateToProps, {
  changeBudget,
  editPayablesList,
  clearBudget,
  deleteBills,
})(BudgetComponent);
