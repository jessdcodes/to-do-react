import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateTask, updateTaskStatus } from "../actions/listActions";
import React, { useRef } from "react";
import TodoDisplayButtons from "../components/TodoDisplayButtons";

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
    (tickRef.current[id].checked) ? 
      taskRef.current[id].style.textDecoration = "line-through" :
      taskRef.current[id].style.textDecoration = "none";

    dispatch(updateTaskStatus(id, tickRef.current[id].checked));
  }

  return (
    <div>
      <input ref={inputRef} name="newTask"></input>
      <button onClick={handleAdd}>Add</button>

      <TodoDisplayButtons/>
     
      <p>Tasks</p>
      <ul>
        {
          tasks.filter(
            (task) => displaySetting!=null ? task.isCompleted === displaySetting : task
          ).map((task) => {
          return (
            <li key={task.id}>
              <input 
                type="checkbox" 
                ref={(el) => (tickRef.current[task.id] = el)} 
                defaultChecked={task.isDone}
                onChange={() => handleTickChange(task.id)}/>
              <input
                ref={(el) => (taskRef.current[task.id] = el)}
                disabled={true}
                defaultValue={task.taskName}
              ></input>
              <button onClick={() => handleEdit(task.id)}>Edit</button>
              <button onClick={() => handleRemove(task.id)}>Remove</button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// const mapStateToProps = (state) => {
//   return {
//     list: state.taskList
//   };
// };

export default Todo;
