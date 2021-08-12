import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { addBill, editDone } from "../actions/BillActions";

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

function BillEnteryComponent({
  bills,
  billBeingEdited,
  addBill,
  isEdit,
  editDone,
}) {
  const classes = useStyles();
  const initialBill = {
    description: "",
    category: "",
    amount: "",
    date: "",
  };
  const [bill, setBill] = useState(isEdit ? billBeingEdited : initialBill);

  useEffect(() => {
    setBill(isEdit ? billBeingEdited : initialBill); //eslint-disable-next-line
  }, [billBeingEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let dateSplit = bill.date.split("-");
    let newDate;
    if (dateSplit[0].length === 4)
      newDate = dateSplit[1] + "-" + dateSplit[2] + "-" + dateSplit[0];
    else newDate = bill.date;
    let d = new Date();
    if (isEdit) {
      let newBills = bills.map((b) => {
        if (b.id === bill.id) return { ...bill, date: newDate };
        else return { ...b };
      });
      editDone(newBills);
    } else {
      let finalBill = {
        ...bill,
        date: newDate,
        id: d.getTime(),
      };
      addBill(finalBill);
    }
    setBill(initialBill);
  };

  const changeHandler = (e) => {
    setBill((prevBill) => ({ ...prevBill, [e.target.name]: e.target.value }));
  };

  return (
    <form className={classes.root} autoComplete>
      <TextField
        id="description"
        required
        label="Description"
        value={bill.description}
        name="description"
        onChange={changeHandler}
        variant="outlined"
      />
      <TextField
        id="category"
        value={bill.category}
        name="category"
        onChange={changeHandler}
        required
        label="Category"
        variant="outlined"
      />
      <TextField
        id="amount"
        required
        value={bill.amount}
        name="amount"
        onChange={changeHandler}
        type="number"
        label="Amount"
        variant="outlined"
      />
      <TextField
        id="date"
        value={bill.date}
        name="date"
        onChange={changeHandler}
        type="date"
        variant="outlined"
        required
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
  );
}

const mapStateToProps = (state) => ({
  bills: state.bills,
  billBeingEdited: state.billBeingEdited,
  isEdit: state.isEdit,
});

export default connect(mapStateToProps, { addBill, editDone })(
  BillEnteryComponent
);
