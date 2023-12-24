import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { confirmAlert } from "react-confirm-alert";

const Modal = (props) => {
  confirmAlert(props.options);
};

export default Modal;
