import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { successReseter } from "../../redux/globalActions/globalAction";

const SuccessMsg = ({ message }) => {
  const dispatch = useDispatch();
  Swal.fire({
    icon: "success",
    title: "Good job!",
    text: message,
  });
  dispatch(successReseter());
};

export default SuccessMsg;
