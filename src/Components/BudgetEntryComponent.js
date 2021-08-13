import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useState } from "react";
import { connect } from "react-redux";
import { changeBudget } from "../actions/BillActions";

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

function BudgetComponent({ changeBudget, monthly_budget }) {
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
      <h3>{`Monthly Budget : ${monthly_budget}`}</h3>
    </div>
  );
}

const mapStateToProps = (state) => ({
  monthly_budget: state.monthly_budget,
});

export default connect(mapStateToProps, { changeBudget })(BudgetComponent);
