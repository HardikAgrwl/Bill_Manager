export const addBill = (bill) => (dispatch) => {
  dispatch({
    type: "ADD_BILL",
    payload: bill,
  });
};

export const deleteBills = (bills) => (dispatch) => {
  dispatch({
    type: "DELETE_BILLS",
    payload: bills,
  });
};

export const selectBill = (bills) => (dispatch) => {
  dispatch({
    type: "SELECT_BILL",
    payload: bills,
  });
};

export const clearSelection = () => (dispatch) => {
  dispatch({
    type: "CLEAR_SELECTED",
  });
};

export const editBill = (bill) => (dispatch) => {
  dispatch({
    type: "EDIT_BILL",
    payload: bill,
  });
};

export const editDone = (bills) => (dispatch) => {
  dispatch({
    type: "DONE_EDITING",
    payload: bills,
  });
};

export const changeBudget = (budget) => (dispatch) => {
  dispatch({
    type: "BUDGET_CHANGED",
    payload: budget,
  });
};

export const selectCategory = (category) => (dispatch) => {
  dispatch({
    type: "CATEGORY_SELECT",
    payload: category,
  });
};
