import { useDispatch, useSelector } from "react-redux";
import { updateDisplay } from "../actions/listActions";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";

const styles = {
  allBtn: {
    color: "blue"
  },
  activeBtn: {
    color: "red"
  }
};

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
      <ButtonGroup color="primary" size="small" variant="outlined" aria-label="outlined button group">
        <Button onClick={handleAllClick}>
          Show All
        </Button>
        <Button onClick={handleActiveClick}>
          Active Tasks
        </Button>
        <Button onClick={handleCompletedClick}>Completed Tasks</Button>
      </ButtonGroup>
      
    </div>
  );
}

export default withStyles(styles)(TodoDisplayButton);
