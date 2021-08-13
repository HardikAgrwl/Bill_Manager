import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
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
  select: {
    width: "20ch",
  },
}));

function BillEnteryComponent({
  bills,
  billBeingEdited,
  addBill,
  isEdit,
  editDone,
  categories,
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

  const submitHandler = (e) => {
    e.preventDefault();
    let d = new Date();
    if (isEdit) {
      let newBills = bills.map((b) => {
        if (b.id === bill.id) return { ...bill };
        else return { ...b };
      });
      editDone(newBills);
    } else {
      let finalBill = {
        ...bill,
        id: d.getTime(),
      };
      addBill(finalBill);
    }
    setBill(initialBill);
  };

  const changeHandler = (e) => {
    setBill((prevBill) => ({ ...prevBill, [e.target.name]: e.target.value }));
    console.log(e.target.value, e.target.name);
  };

  return (
    <form className={classes.root} autoComplete onSubmit={submitHandler}>
      <TextField
        id="description"
        required
        label="Description"
        value={bill.description}
        name="description"
        onChange={changeHandler}
        variant="outlined"
      />
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          {" "}
          Category *
        </InputLabel>
        <Select
          className={classes.select}
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={bill.category}
          required
          name="category"
          onChange={changeHandler}
          label="category"
        >
          {categories.map((category) => {
            return <MenuItem value={category}>{category}</MenuItem>;
          })}
        </Select>
      </FormControl>
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
      <Button variant="contained" type="submit" className={classes.button}>
        Submit
      </Button>
    </form>
  );
}

const mapStateToProps = (state) => ({
  bills: state.bills,
  billBeingEdited: state.billBeingEdited,
  isEdit: state.isEdit,
  categories: state.categories,
});

export default connect(mapStateToProps, { addBill, editDone })(
  BillEnteryComponent
);
