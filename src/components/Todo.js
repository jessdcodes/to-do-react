import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask, updateTaskStatus } from "../actions/listActions";
import React, { useRef } from "react";
import TodoDisplayButtons from "../components/TodoDisplayButtons";
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Input from '@material-ui/core/Input';
import { withStyles } from "@material-ui/core/styles";

const styles = {
  paper: {
    padding: 30,
    margin: 'auto',
    maxWidth: 400
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
  }

  function handleRemove(id) {
    dispatch(removeTask(id));
  }

  function handleEdit(id) {
    const isDisabled = taskRef.current[id].disabled;

    if (isDisabled) taskRef.current[id].disabled = false;
    else {
      const newValue = taskRef.current[id].value;
      dispatch(updateTask(id, newValue));
      taskRef.current[id].disabled = true;
    }
  }

  function handleTickChange(id) {
    dispatch(updateTaskStatus(id, tickRef.current[id].checked));
  }

  return (
    <div>
      <Paper className={props.classes.paper}>
        <Grid container spacing={12}>
          <Grid item xs>
            <TodoDisplayButtons/>
            {/* <Input placeholder="Placeholder" /> */}
            <Input inputRef={inputRef} name="newTask" variant="filled" size="small"/>
            <button onClick={handleAdd}>Add</button>

            <ul>
              {
                tasks.filter(
                  (task) => displaySetting!=null ? task.isCompleted === displaySetting : task
                ).map((task) => {
                return (
                  <li key={task.id}>
                    <Input 
                      type="checkbox" 
                      inputRef={(el) => (tickRef.current[task.id] = el)} 
                      defaultChecked={task.isCompleted}
                      onChange={() => handleTickChange(task.id)}/>
                    <Input
                      inputRef={(el) => (taskRef.current[task.id] = el)}
                      disabled={true}
                      defaultValue={task.taskName}
                      style={{
                          textDecoration: task.isCompleted ? "line-through" : "none"
                        }}
                    />
                    <button onClick={() => handleEdit(task.id)}>Edit</button>
                    <button onClick={() => handleRemove(task.id)}>Remove</button>
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
