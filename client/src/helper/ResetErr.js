import {
  errorReseter,
  successReseter,
} from "../redux/globalActions/globalAction";

export const resetError = (dispatch) => {
  dispatch(errorReseter());
};

export const resetSuccess = (dispatch) => {
  dispatch(successReseter());
};
