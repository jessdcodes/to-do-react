const initialState = 
  {
    taskList: [],
    completedTasksFilter: null
  }
;

const listReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        taskList: [
          ...state.taskList,
          {
            id: Math.random(),
            taskName: action.payload,
            isCompleted: false
          }
        ]
      };
    case "REMOVE_TASK":
      return {
        ...state,
        taskList: state.taskList.filter((task) => task.id !== action.payload)
      }
    case "UPDATE_TASK":
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          return (task.id===action.payload.id) ?
          {
              ...task,
              taskName: action.payload.name
          } : task;
        })
      }
    case "UPDATE_TASK_STATUS":
    console.log(action.payload);
      return {
        ...state,
        taskList: state.taskList.map((task) => {
          return (task.id===action.payload.id) ?
          {
                ...task,
                isCompleted: action.payload.isCompleted
            } : task;
          })
      }

    case "UPDATE_DISPLAY_SETTING":
      
      return {
        ...state,
        completedTasksFilter: action.payload
      }
    default:
      return state;
  }
};

export default listReducer;
