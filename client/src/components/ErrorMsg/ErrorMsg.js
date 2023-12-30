// import Swal from "sweetalert2";
import React from "react";
import { useDispatch } from "react-redux";
import { errorReseter } from "../../redux/globalActions/globalAction";

const ErrorMsg = ({ message }) => {
  return <p className="text-red-600">{message}</p>;
};

export default ErrorMsg;
