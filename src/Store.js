import { applyMiddleware, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { Bills } from "./Data/Bills";

let uniqueCategories = [...new Set(Bills.map((bill) => bill.category))];
console.log(uniqueCategories);

const initialState = {
  bills: [...Bills],
  monthly_budget: 0,
  selected: [],
  billBeingEdited: {},
  isEdit: false,
  categories: [...uniqueCategories],
};

const middleWare = [thunk];

function BillReducer(state, action) {
  switch (action.type) {
    case "ADD_BILL":
      return {
        ...state,
        bills: [...state.bills, { ...action.payload }],
      };
    case "SELECT_BILL":
      return {
        ...state,
        selected: [...action.payload],
      };
    case "CLEAR_SELECTED":
      return {
        ...state,
        selected: [],
      };
    case "EDIT_BILL":
      return {
        ...state,
        billBeingEdited: { ...action.payload },
        isEdit: true,
      };
    case "DONE_EDITING":
      return {
        ...state,
        isEdit: false,
        bills: [...action.payload],
      };
    case "DELETE_BILLS":
      return {
        ...state,
        bills: [...action.payload],
      };
    case "BUDGET_CHANGED":
      return {
        ...state,
        monthly_budget: action.payload,
      };
    default:
      return state;
  }
}

const store = createStore(
  BillReducer,
  initialState,
  compose(
    applyMiddleware(...middleWare),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
      ? (a) => a
      : window.__REDUX_DEVTOOLS_EXTENSION__ &&
          window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
