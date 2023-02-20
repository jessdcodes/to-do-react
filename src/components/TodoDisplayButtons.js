import { useDispatch, useSelector } from "react-redux";
import { updateDisplay } from "../actions/listActions";
//import { withStyles } from "@material-ui/core/styles";

// const styles = {
//   allBtn: {
//     color: "blue"
//   },
//   activeBtn: {
//     color: "red"
//   }
// };

function TodoDisplayButton(props) {
  const dispatch = useDispatch();

  function handleAllClick() {
    dispatch(updateDisplay(null));
  }

  function handleActiveClick() {
    dispatch(updateDisplay(false));
  }

  function handleCompletedClick() {
    dispatch(updateDisplay(true));
  }
  return (
    <div>
      <button onClick={handleAllClick}>
        Show All
      </button>
      <button onClick={handleActiveClick}>
        Active Tasks
      </button>
      <button onClick={handleCompletedClick}>Completed Tasks</button>
    </div>
  );
}

// export default withStyles(styles)(TodoDisplayButton);
export default TodoDisplayButton;