const ADD_TASK = "ADD_TASK";
const REMOVE_TASK = "REMOVE_TASK";
const UPDATE_TASK = "UPDATE_TASK";
const UPDATE_TASK_STATUS = "UPDATE_TASK_STATUS";

export const addTask = (taskName) => {
  return {
    type: ADD_TASK,
    payload: taskName
  };
};

export const removeTask = (id) => {
  return {
    type: REMOVE_TASK,
    payload: id
  };
};

export const updateTask = (id, name) => {
  return {
    type: UPDATE_TASK,
    payload: {
      id,
      name
      }
  };
};

export const updateTaskStatus = (id, isCompleted) => {
  return {
    type: UPDATE_TASK_STATUS,
    payload: {
      id,
      isCompleted
      }
  };
};

export const updateDisplay = (setting) => {
  return {
    type: "UPDATE_DISPLAY_SETTING",
    payload: setting
  };
}