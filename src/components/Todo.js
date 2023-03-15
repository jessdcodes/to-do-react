import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask, updateTaskStatus, updateInputDisabled } from "../actions/listActions";
import React, { useRef } from "react";
import TodoDisplayButtons from "../components/TodoDisplayButtons";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@mui/icons-material/Add";

const styles = {
  paper: {
    padding: 30,
    margin: 'auto',
    maxWidth: 400
  },
  row: {
    flexBasis: '100%'
  },
  taskInput: {
    color: "blue",
    marginRight: 8,
    "& .MuiInputBase-input.Mui-disabled": {
      color: "black" // (default alpha is 0.38)
    }
  }
};

function Todo(props) {
  const dispatch = useDispatch();

  const inputRef = useRef(null);
  const taskRef = useRef([]);
  const tickRef = useRef([]);
  const tasks = useSelector((state) => state.taskList.taskList);
  const displaySetting = useSelector((state) => state.taskList.completedTasksFilter);

  function handleAdd() {
    dispatch(addTask(inputRef.current.value));
    inputRef.current.value = "";
  }

  function handleRemove(id) {
    dispatch(removeTask(id));
  }

  function handleEdit(id) {
    const isDisabled = taskRef.current[id].disabled;

    if (isDisabled) dispatch(updateInputDisabled(id, false));
    else {
      const newValue = taskRef.current[id].value;
      dispatch(updateTask(id, newValue));
      dispatch(updateInputDisabled(id, true));
    }
  }

  function handleTickChange(id) {
    dispatch(updateTaskStatus(id, tickRef.current[id].checked));
  }

  return (
    <div>
      <Paper className={props.classes.paper}>
        <Grid container spacing={1} justifyContent="center">
          <Grid item xs md={12} className={props.classes.row}>
            <TodoDisplayButtons/>
          </Grid>
          <Grid item xs md={12} className={props.classes.row}>
            <Input inputRef={inputRef} name="newTask" variant="filled" size="small"/>
            <IconButton onClick={handleAdd} color="primary">
              <AddIcon />
            </IconButton>
          </Grid>
          <Grid item xs md={12}>
            <ul>
              {
                tasks.filter(
                  (task) => displaySetting!=null ? task.isCompleted === displaySetting : task
                ).map((task) => {
                return (
                  <li key={task.id} className={props.classes.taskContainer}>
                    <input 
                      type="checkbox" 
                      ref={(el) => (tickRef.current[task.id] = el)} 
                      defaultChecked={task.isCompleted}
                      onChange={() => handleTickChange(task.id)}/>
                    <Input
                      inputRef={(el) => (taskRef.current[task.id] = el)}
                      disabled={task.isDisabled}
                      className={props.classes.taskInput}
                      defaultValue={task.taskName}
                      style={{
                          textDecoration: task.isCompleted ? "line-through" : "none"
                        }}
                    />
                    <IconButton onClick={() => handleEdit(task.id)} variant="outlined">
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleRemove(task.id)} variant="outlined">
                      <DeleteIcon />
                    </IconButton>
                  </li>
                );
              })}
            </ul>
          </Grid>
        </Grid>
      </Paper>

      
      
    </div>
  );
}


export default withStyles(styles)(Todo);
